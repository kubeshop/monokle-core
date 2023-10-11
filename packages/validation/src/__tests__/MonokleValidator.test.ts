import Ajv from 'ajv';
import {expect, it} from 'vitest';
import {MonokleValidator} from '../MonokleValidator.js';
import {processRefs} from '../references/index.js';

// Usage note: This library relies on fetch being on global scope!
import 'isomorphic-fetch';
import {extractK8sResources} from '@monokle/parser';
import {ValidationConfig} from '@monokle/types';
import {RESOURCES} from './badResources.js';
import {readDirectory} from './testUtils.js';
import {ResourceRefType} from '../common/types.js';
import {ResourceParser} from '../common/resourceParser.js';
import {DisabledFixer, readConfig, RuleConfigMetadataType, SchemaLoader, SimpleCustomValidator} from '../node.js';
import {defineRule} from '../custom.js';
import {isDeployment} from '../validators/custom/schemas/deployment.apps.v1.js';
import {DefaultPluginLoader} from '../pluginLoaders/PluginLoader.js';
import {readFile} from 'fs/promises';

it('should be simple to configure', async () => {
  const parser = new ResourceParser();

  const validator = createTestValidator(parser, {
    plugins: {
      'kubernetes-schema': true,
      'yaml-syntax': true,
      'pod-security-standards': true,
      'resource-links': true,
    },
  });

  processRefs(RESOURCES, parser);
  const response = await validator.validate({resources: RESOURCES});

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);
  expect(hasErrors).toMatchInlineSnapshot('2');
});

it('should fail if optional refs are not allowed', async () => {
  const parser = new ResourceParser();

  const validator = createOptionalResourceLinksValidator(parser);

  processRefs(RESOURCES, parser);
  const response = await validator.validate({resources: RESOURCES});

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);
  expect(hasErrors).toMatchInlineSnapshot('2');
});

async function processResourcesInFolder(path: string) {
  const files = await readDirectory(path);
  const resources = extractK8sResources(files);

  const parser = new ResourceParser();
  const validator = createTestValidator(parser);

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

it('should support Kustomize Components', async () => {
  const {resources} = await processResourcesInFolder('src/__tests__/resources/kustomize-components');
  expect(resources.length).toBe(3);
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

  const validator = createTestValidator(parser);
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
  const pluginLoader = new DefaultPluginLoader();

  pluginLoader.register('practices', ({parser, fixer}) => {
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
              configMetadata: {
                type: RuleConfigMetadataType.Number,
                name: 'Required replicas',
                defaultValue: 1,
              },
            },
            validate({resources, params}, {report}) {
              resources.filter(isDeployment).forEach(deployment => {
                const replicaCount = deployment.spec?.replicas ?? 1;
                const valid = replicaCount > params;
                if (valid) return;
                report(deployment, {path: 'spec.replicas'});
              });
            },
          }),
        },
      },
      parser,
      fixer
    );
  });

  const validator = new MonokleValidator({
    loader: pluginLoader,
    parser,
    schemaLoader: new SchemaLoader(),
    suppressors: [],
    fixer: new DisabledFixer(),
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

  const validator = createTestValidator(parser);
  processRefs(resources, parser);
  await configureValidator(validator, {metadata: true});
  const response = await validator.validate({resources});

  const ajv = new Ajv({
    jsonPointers: true,
    verbose: true,
    allErrors: true,
  });

  const res = await readFile('src/__tests__/resources/sarif-schema.json', 'utf-8');
  const schema = JSON.parse(res);

  const validateSarif = ajv.compile(schema);
  validateSarif(response);

  // uncomment to debug
  validateSarif.errors?.map(e => {
    console.error(e.message, e.data, e.dataPath);
  });

  expect(validateSarif.errors?.length ?? 0).toBe(0);
});

it('should correctly read config file #1', async () => {
  const config = await readConfig('src/__tests__/resources/config1.yaml');

  expect(config).toHaveProperty('plugins');
  expect(config).toHaveProperty('settings');

  const ks = (config?.settings ?? {})['kubernetes-schema'];
  expect(ks?.schemaVersion).toBe('v1.27.1');
});

it('should correctly read config file #2', async () => {
  const config = await readConfig('src/__tests__/resources/config2.yaml');

  expect(config).toHaveProperty('plugins');
  expect(config).toHaveProperty('rules');

  const rule1 = (config?.rules ?? {})['open-policy-agent/no-elevated-process'];
  expect(rule1).toBe(false);

  const rule2 = (config?.rules ?? {})['open-policy-agent/no-sys-admin'];
  expect(rule2).toBe(true);
});

function configureValidator(validator: MonokleValidator, additionalPlugins: {[key: string]: boolean} = {}) {
  return validator.preload({
    plugins: {
      'yaml-syntax': true,
      'resource-links': true,
      'kubernetes-schema': true,
      'open-policy-agent': true,
      ...additionalPlugins,
    },
    settings: {
      'kubernetes-schema': {
        schemaVersion: '1.24.2',
      },
      debug: true,
    },
  });
}

function createTestValidator(parser: ResourceParser, config?: ValidationConfig) {
  return new MonokleValidator(
    {
      loader: new DefaultPluginLoader(),
      parser,
      schemaLoader: new SchemaLoader(),
      suppressors: [],
      fixer: new DisabledFixer(),
    },
    config ?? {
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
    }
  );
}

function createOptionalResourceLinksValidator(parser: ResourceParser) {
  return new MonokleValidator(
    {
      loader: new DefaultPluginLoader(),
      parser,
      schemaLoader: new SchemaLoader(),
      suppressors: [],
      fixer: new DisabledFixer(),
    },
    {
      plugins: {
        'resource-links': true,
      },
      rules: {
        'resource-links/no-missing-optional-links': 'warn',
      },
    }
  );
}
