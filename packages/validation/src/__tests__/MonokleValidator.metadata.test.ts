import {expect, it} from 'vitest';
import {MonokleValidator} from '../MonokleValidator.js';
import {processRefs} from '../references/process.js';

// Usage note: This library relies on fetch being on global scope!
import 'isomorphic-fetch';
import {expectResult, extractK8sResources, readDirectory} from './testUtils.js';
import {ResourceParser} from '../common/resourceParser.js';
import {createDefaultMonokleValidator} from '../createDefaultMonokleValidator.node.js';
import { Config, RuleMap } from '../config/parse.js';

it('should detect missing recommended labels (MTD-recommended-labels)', async () => {
  const {response} = await processResourcesInFolder('src/__tests__/resources/metadata');

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);

  expect(hasErrors).toBe(4);

  const result1 = response.runs[0].results[0];
  expectResult(result1, 'MTD-recommended-labels', 'error', 'ReplicaSet');
  expect(result1.message.text).toMatch('app.kubernetes.io/component');

  const result2 = response.runs[0].results[1];
  expectResult(result2, 'MTD-recommended-labels', 'error', 'ReplicaSet');
  expect(result2.message.text).toMatch('app.kubernetes.io/managed');

  const result3 = response.runs[0].results[2];
  expectResult(result3, 'MTD-recommended-labels', 'error', 'ReplicaSet');
  expect(result3.message.text).toMatch('app.kubernetes.io/part-of');

  const result4 = response.runs[0].results[3];
  expectResult(result4, 'MTD-recommended-labels', 'error', 'ReplicaSet');
  expect(result4.message.text).toMatch('app.kubernetes.io/version');
});

it('should not override recommended labels but allow to config level (MTD-recommended-labels)', async () => {
  const {response} = await processResourcesInFolder('src/__tests__/resources/metadata', {
    'metadata/recommended-labels': ['warn', ['app', 'tier', 'role']]
  });

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);

  expect(hasErrors).toBe(4);

  const result1 = response.runs[0].results[0];
  expectResult(result1, 'MTD-recommended-labels', 'warning', 'ReplicaSet');
  expect(result1.message.text).toMatch('app.kubernetes.io/component');

  const result2 = response.runs[0].results[1];
  expectResult(result2, 'MTD-recommended-labels', 'warning', 'ReplicaSet');
  expect(result2.message.text).toMatch('app.kubernetes.io/managed');

  const result3 = response.runs[0].results[2];
  expectResult(result3, 'MTD-recommended-labels', 'warning', 'ReplicaSet');
  expect(result3.message.text).toMatch('app.kubernetes.io/part-of');

  const result4 = response.runs[0].results[3];
  expectResult(result4, 'MTD-recommended-labels', 'warning', 'ReplicaSet');
  expect(result4.message.text).toMatch('app.kubernetes.io/version');
});

it('should detect missing custom labels (MTD-custom-labels)', async () => {
  const {response} = await processResourcesInFolder('src/__tests__/resources/metadata', {
    'metadata/recommended-labels': false,
    'metadata/custom-labels': ['warn', ['app', 'tier', 'role']]
  });

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);

  expect(hasErrors).toBe(1);

  const result = response.runs[0].results[0];
  expectResult(result, 'MTD-custom-labels', 'warning', 'ReplicaSet');
  expectMatchList(result.message.text, ['role']);
  expect(result.message.text).not.toMatch('app.kubernetes.io/version');
});

it('should detect missing annotations labels (MTD-custom-annotations)', async () => {
  const {response} = await processResourcesInFolder('src/__tests__/resources/metadata', {
    'metadata/recommended-labels': false,
    'metadata/custom-annotations': ['warn', ['revision', 'hash', 'annotation-1', 'annotation-2']]
  });

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);

  expect(hasErrors).toBe(2);

  const result1 = response.runs[0].results[0];
  expectResult(result1, 'MTD-custom-annotations', 'warning', 'ReplicaSet');
  expectMatchList(result1.message.text, ['annotation-1']);
  expectNotMatchList(result1.message.text, ['revision', 'hash', 'annotation-2']);

  const result2 = response.runs[0].results[1];
  expectResult(result2, 'MTD-custom-annotations', 'warning', 'ReplicaSet');
  expectMatchList(result2.message.text, ['annotation-2']);
  expectNotMatchList(result2.message.text, ['revision', 'hash', 'annotation-1']);
});

it('should not trigger when predefined custom rules have no names defined (MTD-custom-labels, MTD-custom-annotations)', async () => {
  const {response} = await processResourcesInFolder('src/__tests__/resources/metadata', {
    'metadata/recommended-labels': false,
    'metadata/custom-labels': 'err',
    'metadata/custom-annotations': 'err'
  });

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);

  expect(hasErrors).toBe(0);
});

it('should detect missing dynamic custom labels', async () => {
  const {response} = await processResourcesInFolder('src/__tests__/resources/metadata', {
    'metadata/recommended-labels': false,
    'metadata/app-label': 'warn',
    'metadata/tier-label': 'warn',
    'metadata/role-label': ['warn', ['dev', 'stage', 'prod']],
    'metadata/name-label': 'err',
  });

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);

  expect(hasErrors).toBe(2);

  const result1 = response.runs[0].results[0];
  expectResult(result1, 'MTD-role-label', 'warning', 'ReplicaSet');
  expectMatchList(result1.message.text, ['role']);

  const result2 = response.runs[0].results[1];
  expectResult(result2, 'MTD-name-label', 'error', 'ReplicaSet');
  expectMatchList(result2.message.text, ['name']);
});

it('should detect missing dynamic custom labels (with slashes replacement)', async () => {
  const {response} = await processResourcesInFolder('src/__tests__/resources/metadata', {
    'metadata/recommended-labels': false,
    'metadata/monokle.io__user-label': 'err',
    'metadata/monokle.io__group-label': ['warn', ['red', 'blue']],
    'metadata/monokle.io__namespace-label': ['err', ['default', 'kube-system']],
  });

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);

  expect(hasErrors).toBe(2);

  const result1 = response.runs[0].results[0];
  expectResult(result1, 'MTD-monokle.io__user-label', 'error', 'ReplicaSet');
  expectMatchList(result1.message.text, ['monokle.io/user']);

  const result2 = response.runs[0].results[1];
  expectResult(result2, 'MTD-monokle.io__group-label', 'warning', 'ReplicaSet');
  expectMatchList(result2.message.text, ['monokle.io/group', 'red, blue']);
});

it('should detect missing dynamic custom annotations', async () => {
  const {response} = await processResourcesInFolder('src/__tests__/resources/metadata', {
    'metadata/recommended-labels': false,
    'metadata/app-annotation': 'err',
    'metadata/hash-annotation': ['warn'],
    'metadata/monokle.io__namespace-annotation': ['warn', ['minikube', 'kube-system']],
  });

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);

  expect(hasErrors).toBe(2);

  const result1 = response.runs[0].results[0];
  expectResult(result1, 'MTD-app-annotation', 'error', 'ReplicaSet');
  expectMatchList(result1.message.text, ['app']);

  const result2 = response.runs[0].results[1];
  expectResult(result2, 'MTD-monokle.io__namespace-annotation', 'warning', 'ReplicaSet');
  expectMatchList(result2.message.text, ['monokle.io/namespace', 'minikube, kube-system']);
});

it('should detect missing recommended labels even with no metadata at all (MTD-recommended-labels)', async () => {
  const {response} = await processResourcesInFolder('src/__tests__/resources/no-metadata');

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);

  expect(hasErrors).toBe(6);
});

it('should have custom-* configurable rules', async () => {
  const parser = new ResourceParser();
  const validator = createDefaultMonokleValidator(parser);

  await configureValidator(validator, {
    'metadata/recommended-labels': false,
    'metadata/custom-labels': 'err',
    'metadata/custom-annotations': 'err'
  });

  Object.entries(validator.rules)[0][1].forEach(rule => {
    if (rule.configuration.enabled) {
      expect(rule.properties?.configurability).toBeDefined();
    }
  });
});

it('should generate dynamic configurable rules', async () => {
  const parser = new ResourceParser();
  const validator = createDefaultMonokleValidator(parser);

  await configureValidator(validator, {
    'metadata/recommended-labels': false,
    'metadata/custom-labels': false,
    'metadata/custom-annotations': false,
    'metadata/app-annotation': 'err',
    'metadata/hash-annotation': ['warn'],
    'metadata/monokle.io__namespace-annotation': ['warn', ['minikube', 'kube-system']],
  });

  Object.entries(validator.rules)[0][1].forEach(rule => {
    if (rule.configuration.enabled) {
      expect(rule.properties?.configurability).toBeDefined();
    }
  });
});

async function processResourcesInFolder(path: string, rules?: RuleMap) {
  const files = await readDirectory(path);
  const resources = extractK8sResources(files);

  const parser = new ResourceParser();
  const validator = createDefaultMonokleValidator(parser);

  await configureValidator(validator, rules);

  processRefs(
    resources,
    parser,
    undefined,
    files.map(f => f.path)
  );
  const response = await validator.validate({resources});
  return {response, resources};
}

async function configureValidator(validator: MonokleValidator, rules?: RuleMap) {
  const config: Config = {
    plugins: {
      'metadata': true,
    },
    settings: {
      debug: true,
    },
  };

  if (rules) {
    config.rules = rules;
  }

  return validator.preload(config);
}

function expectMatchList(message: string, expected: string[]) {
  expected.forEach(e => expect(message).toMatch(e));
}

function expectNotMatchList(message: string, expected: string[]) {
  expected.forEach(e => expect(message).not.toMatch(e));
}
