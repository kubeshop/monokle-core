import {expect, it} from 'vitest';
import {MonokleValidator} from '../MonokleValidator.js';
import {processRefs} from '../references/index.js';

// Usage note: This library relies on fetch being on global scope!
import 'isomorphic-fetch';
import {extractK8sResources} from '@monokle/parser';
import {ValidationConfig} from '@monokle/types';
import {ResourceParser} from '../common/resourceParser.js';
import {Config, RuleMap} from '../config/parse.js';
import {readDirectory} from './testUtils.js';
import {DefaultPluginLoader} from '../pluginLoaders/PluginLoader.js';
import {SchemaLoader} from '../validators/index.js';
import {DisabledFixer} from '../sarif/index.js';

it('should detect rules which allow creation of pods', async () => {
  const {response} = await processResourcesInFolder('src/__tests__/resources/kbp', {
    'practices/no-pod-create': true,
    'practices/no-pod-execute': false,
  });

  const errorCount = response.runs.reduce((sum, r) => sum + r.results.length, 0);
  expect(errorCount).toBe(2);
});

it('should detect rules which allow execution of pods', async () => {
  const {response} = await processResourcesInFolder('src/__tests__/resources/kbp', {
    'practices/no-pod-create': false,
    'practices/no-pod-execute': true,
  });

  const errorCount = response.runs.reduce((sum, r) => sum + r.results.length, 0);
  expect(errorCount).toBe(1);
});

async function processResourcesInFolder(path: string, rules?: RuleMap) {
  const files = await readDirectory(path);
  const resources = extractK8sResources(files);

  const parser = new ResourceParser();
  const validator = createTestValidator(parser, rules);
  const response = await validator.validate({resources});
  return {response, resources};
}

function createTestValidator(parser: ResourceParser, rules?: ValidationConfig['rules']) {
  const config: Config = {
    plugins: {
      practices: true,
    },
    settings: {
      debug: true,
    },
  };

  if (rules) {
    config.rules = rules;
  }

  return new MonokleValidator(
    {
      loader: new DefaultPluginLoader(),
      parser,
      schemaLoader: new SchemaLoader(),
      suppressors: [],
      fixer: new DisabledFixer(),
    },
    config
  );
}
