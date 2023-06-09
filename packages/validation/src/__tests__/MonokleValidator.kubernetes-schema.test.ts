import {expect, it} from 'vitest';
import {MonokleValidator} from '../MonokleValidator.js';
import {processRefs} from '../references/process.js';

// Usage note: This library relies on fetch being on global scope!
import 'isomorphic-fetch';
import {expectResult, extractK8sResources, readDirectory} from './testUtils.js';
import {ResourceParser} from '../common/resourceParser.js';
import {createDefaultMonokleValidator} from '../createDefaultMonokleValidator.node.js';

it('should detect deprecation error - single resource, removal', async () => {
  const {response} = await processResourcesInFolder('src/__tests__/resources/deprecations-1');

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);

  expect(hasErrors).toBe(1);

  const result = response.runs[0].results[0];
  expectResult(result, 'K8S003', 'error', 'ReplicaSet');
  expect(result.message.text).toContain('uses removed');
});

it('should detect deprecation error - multiple resources, removal', async () => {
  const {response} = await processResourcesInFolder('src/__tests__/resources/deprecations-2', 'v1.29');

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);

  expect(hasErrors).toBe(2);

  const result1 = response.runs[0].results[0];
  expectResult(result1, 'K8S003', 'error', 'ValidatingWebhookConfiguration');
  expect(result1.message.text).toContain('uses removed');

  const result2 = response.runs[0].results[1];
  expectResult(result2, 'K8S003', 'error', 'FlowSchema');
  expect(result2.message.text).toContain('uses removed');
});

it('should detect deprecation error - single resource, deprecation', async () => {
  const {response} = await processResourcesInFolder('src/__tests__/resources/deprecations-3', 'v1.15');

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);

  expect(hasErrors).toBe(1);

  const result = response.runs[0].results[0];
  expectResult(result, 'K8S002', 'warning', 'ReplicaSet');
  expect(result.message.text).toContain('uses deprecated');
});

it('should detect deprecation error - multiple resources, removal + deprecation', async () => {
  const {response} = await processResourcesInFolder('src/__tests__/resources/deprecations-4', 'v1.28');

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);

  expect(hasErrors).toBe(2);

  const result1 = response.runs[0].results[0];
  expectResult(result1, 'K8S003', 'error', 'RuntimeClass');
  expect(result1.message.text).toContain('uses removed');

  const result2 = response.runs[0].results[1];
  expectResult(result2, 'K8S002', 'warning', 'KubeSchedulerConfiguration');
  expect(result2.message.text).toContain('uses deprecated');
});

it('should rise warning when no apiVersion present (K8S004)', async () => {
  const {response} = await processResourcesInFolder('src/__tests__/resources/no-apiversion');

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);
  expect(hasErrors).toBe(2);

  const error1 = response.runs[0].results[0];
  expectResult(error1, 'K8S004', 'warning', 'FlowSchema');
  expect(error1.message.text).toContain('Missing "apiVersion"');

  const error2 = response.runs[0].results[1];
  expectResult(error2, 'K8S004', 'warning', 'Pod');
  expect(error2.message.text).toContain('Missing "apiVersion"');
});

async function processResourcesInFolder(path: string, schemaVersion?: string) {
  const files = await readDirectory(path);
  const resources = extractK8sResources(files);

  const parser = new ResourceParser();
  const validator = createDefaultMonokleValidator(parser);

  await configureValidator(validator, schemaVersion);

  processRefs(
    resources,
    parser,
    undefined,
    files.map(f => f.path)
  );
  const response = await validator.validate({resources});
  return {response, resources};
}

async function configureValidator(validator: MonokleValidator, schemaVersion = '1.24.2') {
  return validator.preload({
    plugins: {
      'kubernetes-schema': true,
    },
    settings: {
      'kubernetes-schema': {
        schemaVersion,
      },
      debug: true,
    },
  });
}
