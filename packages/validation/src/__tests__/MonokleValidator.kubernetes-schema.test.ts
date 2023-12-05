import {expect, it} from 'vitest';
import {MonokleValidator} from '../MonokleValidator.js';
import {processRefs} from '../references/index.js';

// Usage note: This library relies on fetch being on global scope!
import 'isomorphic-fetch';
import {extractK8sResources} from '@monokle/parser';
import {readDirectory, expectResult} from './testUtils.js';
import {ResourceParser} from '../common/resourceParser.js';
import {DisabledFixer, SchemaLoader} from '../commonExports.js';
import {DefaultPluginLoader} from '../pluginLoaders/PluginLoader.js';

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

  expect(hasErrors).toBe(3);

  const result0 = response.runs[0].results[0];
  expectResult(result0, 'K8S003', 'error', 'FlowSchema');
  expect(result0.message.text).toContain('uses removed');

  const result1 = response.runs[0].results[1];
  expectResult(result1, 'K8S003', 'error', 'ValidatingWebhookConfiguration');
  expect(result1.message.text).toContain('uses removed');

  expectResult(response.runs[0].results[2], 'K8S004', 'warning', 'SomeCustomResource');
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

  const result0 = response.runs[0].results[0];
  expectResult(result0, 'K8S002', 'warning', 'KubeSchedulerConfiguration');
  expect(result0.message.text).toContain('uses deprecated');

  const result1 = response.runs[0].results[1];
  expectResult(result1, 'K8S003', 'error', 'RuntimeClass');
  expect(result1.message.text).toContain('uses removed');
});

it('should rise warning when no apiVersion present (K8S004)', async () => {
  const {response} = await processResourcesInFolder('src/__tests__/resources/no-apiversion');

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);
  expect(hasErrors).toBe(1);

  const error1 = response.runs[0].results[0];
  expectResult(error1, 'K8S004', 'warning', 'SomeCustomResource');
});

async function processResourcesInFolder(path: string, schemaVersion?: string) {
  const files = await readDirectory(path);
  const resources = extractK8sResources(files);

  resources.forEach(r => {
    if (r.apiVersion === 'test-remove') {
      (r as any).apiVersion = undefined;
    }
  });

  const parser = new ResourceParser();
  const validator = createTestValidator(parser, schemaVersion);

  processRefs(
    resources,
    parser,
    undefined,
    files.map(f => f.path)
  );
  const response = await validator.validate({resources});
  return {response, resources};
}

function createTestValidator(parser: ResourceParser, schemaVersion = '1.24.2') {
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
        'kubernetes-schema': true,
      },
      rules: {
        'kubernetes-schema/strict-mode-violated': true,
      },
      settings: {
        'kubernetes-schema': {
          schemaVersion,
        },
        debug: true,
      },
    }
  );
}
