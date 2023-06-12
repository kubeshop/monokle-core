import Ajv from 'ajv';
import {expect, it} from 'vitest';
import {MonokleValidator} from '../MonokleValidator.js';
import {processRefs} from '../references/process.js';

// Usage note: This library relies on fetch being on global scope!
import 'isomorphic-fetch';
import {RESOURCES} from './badResources.js';
import {extractK8sResources, readDirectory} from './testUtils.js';
import {ResourceRefType} from '../common/types.js';
import {ResourceParser} from '../common/resourceParser.js';
import {createDefaultMonokleValidator} from '../createDefaultMonokleValidator.node.js';
import {SimpleCustomValidator} from '../node.js';
import {defineRule} from '../custom.js';
import {isDeployment} from '../validators/custom/schemas/deployment.apps.v1.js';

it('should be simple to configure', async () => {
  const parser = new ResourceParser();

  const validator = createDefaultMonokleValidator(parser);

  processRefs(RESOURCES, parser);
  const response = await validator.validate({resources: RESOURCES});

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);
  expect(hasErrors).toMatchInlineSnapshot('13');
});

it('should fail if optional refs are not allowed', async () => {
  const parser = new ResourceParser();

  const validator = createDefaultMonokleValidator(parser);

  processRefs(RESOURCES, parser);
  await configureOptionalResourceLinksValidator(validator);
  const response = await validator.validate({resources: RESOURCES});

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);
  expect(hasErrors).toMatchInlineSnapshot('2');
});

async function processResourcesInFolder(path: string) {
  const files = await readDirectory(path);
  const resources = extractK8sResources(files);

  const parser = new ResourceParser();
  const validator = createDefaultMonokleValidator(parser);

  processRefs(
    resources,
    parser,
    undefined,
    files.map(f => f.path)
  );
  const response = await validator.validate({resources});
  return {response, resources};
}

it('should allow external patch refs and find relative patches that are not resources', async () => {
  const {response} = await processResourcesInFolder('src/__tests__/resources/kustomize-with-relative-patch');

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);
  expect(hasErrors).toBe(0);
});

it('should support relative folder paths in kustomizations', async () => {
  const {response} = await processResourcesInFolder('src/__tests__/resources/kustomize-with-relative-path-resources');

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);
  expect(hasErrors).toBe(16);
});

it('should support patches and additionalValuesFiles', async () => {
  const {response} = await processResourcesInFolder('src/__tests__/resources/kustomize-5.0.0-patches-and-values-files');

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);
  expect(hasErrors).toBe(2);
});

it('should support ownerRefs', async () => {
  const {resources, response} = await processResourcesInFolder('src/__tests__/resources/owner-references');

  expect(resources.length).toBe(2);
  expect(resources[0].name).toBe('petstore-778587f7d5-nflbg');
  expect(resources[0].refs?.filter(ref => ref.type === ResourceRefType.OutgoingOwner).length).toBe(1);

  expect(resources[1].name).toBe('petstore-778587f7d5');
  expect(resources[1].refs?.filter(ref => ref.type === ResourceRefType.IncomingOwner).length).toBe(1);
  expect(resources[1].refs?.filter(ref => ref.type === ResourceRefType.UnsatisfiedOwner).length).toBe(1);

  const lnkResults = response.runs[0].results.filter(r => r.rule.toolComponent.name === 'resource-links');
  expect(lnkResults.length).toBe(1);
  expect(lnkResults.at(0)?.ruleId).toBe('LNK003');
});

it('should be flexible to configure', async () => {
  const parser = new ResourceParser();

  const validator = createDefaultMonokleValidator(parser);
  processRefs(RESOURCES, parser);
  await configureValidator(validator);

  const response = await validator.validate({resources: RESOURCES});

  // uncomment to debug
  // response.runs.forEach((r) =>
  //   r.results.forEach((result) => {
  //     console.error(result.ruleId, result.message.text);
  //   })
  // );

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);
  expect(hasErrors).toMatchInlineSnapshot('13');
});

it('should allow rules to be configurable', async () => {
  const parser = new ResourceParser();

  const validator = new MonokleValidator(async () => {
    return new SimpleCustomValidator(
      {
        id: 'KBP',
        name: 'practices',
        description: 'debug-validator',
        rules: {
          highAvailable: defineRule({
            id: 6,
            description: 'Require at least two replicas',
            fullDescription: 'High availability avoids downtimes when a pod crashes.',
            help: "Set your deployment's replicas to two or higher.",
            advanced: {
              enabled: false,
              severity: 3,
            },
            validate({resources, params}, {report}) {
              resources.filter(isDeployment).forEach(deployment => {
                const replicaCount = deployment.spec?.replicas ?? 1;
                const replicaThreshold = params ?? 1;
                const valid = replicaCount > replicaThreshold;
                if (valid) return;
                report(deployment, {path: 'spec.replicas'});
              });
            },
          }),
        },
      },
      parser
    );
  });

  processRefs(RESOURCES, parser);

  validator.preload({
    plugins: {
      practices: true,
    },
    rules: {
      'practices/high-available': 'err',
    },
    settings: {
      debug: true,
    },
  });
  const noConfigResponse = await validator.validate({resources: RESOURCES});
  const noConfigHasErrors = noConfigResponse.runs.at(0)?.results.some(r => r.ruleId === 'KBP006') ?? false;
  expect(noConfigHasErrors).toBe(false);

  validator.preload({
    plugins: {
      practices: true,
    },
    rules: {
      'practices/high-available': ['err', 5],
    },
    settings: {
      debug: true,
    },
  });
  const shorthandConfigResponse = await validator.validate({resources: RESOURCES});
  const shorthandConfigHasErrors = shorthandConfigResponse.runs.at(0)?.results.some(r => r.ruleId === 'KBP006');
  expect(shorthandConfigHasErrors).toBe(true);

  validator.preload({
    plugins: {
      practices: true,
    },
    rules: {
      'practices/high-available': {
        severity: 'err',
        config: 5,
      },
    },
    settings: {
      debug: true,
    },
  });
  const configResponse = await validator.validate({resources: RESOURCES});
  const configHasErrors = configResponse.runs.at(0)?.results.some(r => r.ruleId === 'KBP006');
  expect(configHasErrors).toBe(true);
});

it('should be valid SARIF', async () => {
  const parser = new ResourceParser();
  const resources = RESOURCES;

  const validator = createDefaultMonokleValidator(parser);
  processRefs(resources, parser);
  await configureValidator(validator);
  const response = await validator.validate({resources});

  const ajv = new Ajv({
    jsonPointers: true,
    verbose: true,
    allErrors: true,
  });

  const res = await fetch('https://json.schemastore.org/sarif-2.1.0.json');
  if (!res.ok) throw new Error('schema_download_failed');
  const schema = await res.json();

  const validateSarif = ajv.compile(schema);
  validateSarif(response);

  // uncomment to debug
  validateSarif.errors?.map(e => {
    console.error(e.message, e.data, e.dataPath);
  });

  expect(validateSarif.errors?.length ?? 0).toBe(0);
});

function configureValidator(validator: MonokleValidator) {
  return validator.preload({
    plugins: {
      'yaml-syntax': true,
      'resource-links': true,
      'kubernetes-schema': true,
      'open-policy-agent': true,
    },
    settings: {
      'kubernetes-schema': {
        schemaVersion: '1.24.2',
      },
      debug: true,
    },
  });
}

function configureOptionalResourceLinksValidator(validator: MonokleValidator) {
  return validator.preload({
    plugins: {
      'resource-links': true,
    },
    rules: {
      'resource-links/no-missing-optional-links': 'warn',
    },
  });
}
