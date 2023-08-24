import {expect, it} from 'vitest';
import {MonokleValidator} from '../MonokleValidator.js';
import {processRefs} from '../references/process.js';

// Usage note: This library relies on fetch being on global scope!
import 'isomorphic-fetch';
import {ResourceParser} from '../common/resourceParser.js';
import {Config, RuleMap} from '../config/parse.js';
import {createDefaultMonokleValidator} from '../createDefaultMonokleValidator.node.js';
import {extractK8sResources} from '@monokle/parser';
import {readDirectory} from './testUtils.js';

it('should detect invalid volume types', async () => {
  const {response} = await processResourcesInFolder('src/__tests__/resources/pss-1', {
    'pod-security-standards/volume-types': true,
  });

  const errorCount = response.runs.reduce((sum, r) => sum + r.results.length, 0);

  expect(errorCount).toBe(1);
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
      'pod-security-standards': true,
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
