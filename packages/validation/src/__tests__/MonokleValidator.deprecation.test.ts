import {expect, it} from 'vitest';
import {MonokleValidator} from '../MonokleValidator.js';
import {processRefs} from '../references/process.js';

// Usage note: This library relies on fetch being on global scope!
import 'isomorphic-fetch';
import {extractK8sResources, readDirectory} from './testUtils.js';
import {ResourceParser} from '../common/resourceParser.js';
import {createDefaultMonokleValidator} from '../createDefaultMonokleValidator.node.js';

it('should detect deprecation error - single resource', async () => {
  const {response} = await processResourcesInFolder('src/__tests__/resources/deprecations-1');

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);

  console.log(JSON.stringify(response.runs[0].results));

  expect(hasErrors).toBe(1);
});

it('should detect deprecation error - multiple resources', async () => {
  const {response} = await processResourcesInFolder('src/__tests__/resources/deprecations-2', 'v1.29');

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);

  console.log(JSON.stringify(response.runs[0].results));

  expect(hasErrors).toBe(2);
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
      'kubernetes-schema': false,
      'deprecation': true,
    },
    settings: {
      'kubernetes-schema': {
        schemaVersion,
      },
      debug: true,
    },
  });
}
