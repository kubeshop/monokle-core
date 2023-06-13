import {expect, it} from 'vitest';
import {MonokleValidator} from '../MonokleValidator.js';
import {processRefs} from '../references/process.js';

// Usage note: This library relies on fetch being on global scope!
import 'isomorphic-fetch';
import {expectResult, extractK8sResources, readDirectory} from './testUtils.js';
import {ResourceParser} from '../common/resourceParser.js';
import {createDefaultMonokleValidator} from '../createDefaultMonokleValidator.node.js';
import { Config, RuleMap } from '../config/parse.js';

it('should detect missing required labels (MTD001)', async () => {
  const {response} = await processResourcesInFolder('src/__tests__/resources/metadata');

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);

  expect(hasErrors).toBe(1);

  const result = response.runs[0].results[0];
  expectResult(result, 'MTD001', 'error', 'ReplicaSet');
  expectMatchList(result.message.text, ['app.kubernetes.io/component', 'app.kubernetes.io/part-of', 'app.kubernetes.io/managed']);
});

it('should detect missing redefined required labels (MTD001)', async () => {
  const {response} = await processResourcesInFolder('src/__tests__/resources/metadata', {
    'metadata/recommended-labels': ['err', ['app', 'tier', 'role']]
  });

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);

  expect(hasErrors).toBe(1);

  const result = response.runs[0].results[0];
  expectResult(result, 'MTD001', 'error', 'ReplicaSet');
  expectMatchList(result.message.text, ['role']);
  expect(result.message.text).not.toMatch('app.kubernetes.io/version');
});

// MTD002
// MTD003
// custom-labels
// custom-annotations
// mixed
// overrides

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
