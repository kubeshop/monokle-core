import {expect, it} from 'vitest';
import {MonokleValidator} from '../MonokleValidator.js';
import {processRefs} from '../references';

// Usage note: This library relies on fetch being on global scope!
import 'isomorphic-fetch';
import {ResourceParser} from '../common/resourceParser.js';
import {Config, RuleMap} from '../config/parse.js';
import {extractK8sResources} from '@monokle/parser';
import {readDirectory} from './testUtils.js';
import {ValidationConfig} from "@monokle/types";
import {DefaultPluginLoader} from "../pluginLoaders/PluginLoader";
import {SchemaLoader} from "../validators";
import {DisabledFixer} from "../sarif";

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
  const validator = createTestValidator(parser, rules);

  processRefs(
    resources,
    parser,
    undefined,
    files.map(f => f.path)
  );
  const response = await validator.validate({resources});
  return {response, resources};
}

function createTestValidator(parser: ResourceParser, rules?: ValidationConfig['rules']) {
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
