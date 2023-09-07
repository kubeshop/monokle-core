import {expect, it} from 'vitest';
import {processRefs, ResourceParser, DisabledFixer, SchemaLoader, MonokleValidator} from '../index.js';

// Usage note: This library relies on fetch being on global scope!
import 'isomorphic-fetch';
import {BAD_DEPLOYMENT, BAD_SERVICE, RESOURCES} from './badResources.js';
import {DefaultPluginLoader} from '../pluginLoaders/PluginLoader.js';

it('should work with monokle.validation.yaml', async () => {
  // Step 1: Create the validator
  const parser = new ResourceParser();
  const validator = createTestValidator(parser);

  // Step 2: Configure validator with monokle.validation.yaml
  await validator.preload({
    // Responsible for validator construction
    plugins: {
      'open-policy-agent': true,
      'yaml-syntax': true,
      'kubernetes-schema': false,
      'resource-links': false,
    },
    // Responsbility for rules
    rules: {
      KSV005: 'warn',
      'open-policy-agent/no-latest-image': 'warn',
    },
    // Responsible for validator runtime behavior
    settings: {
      debug: true,
    },
  });

  // Step 3: Validate resources
  const resources = [BAD_DEPLOYMENT, BAD_SERVICE];
  processRefs(resources, parser);
  const response = await validator.validate({resources});

  // uncomment to debug
  // response.runs.forEach((r) =>
  //   r.results.forEach((result) => {
  //     console.error(result.ruleId, result.message.text);
  //   })
  // );

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);
  expect(hasErrors).toMatchInlineSnapshot('11');
});

it('should handle race conditions', async () => {
  for (let i = 0; i < 3; i++) {
    const validator = createTestValidator();

    validator.preload({
      plugins: {
        'open-policy-agent': true,
        'yaml-syntax': true,
        'kubernetes-schema': true,
        'resource-links': true,
      },
      rules: {
        KSV005: false,
        KSV013: true,
      },
    });

    validator.preload({
      plugins: {
        'open-policy-agent': false,
        'yaml-syntax': true,
        'kubernetes-schema': false,
        'resource-links': false,
      },
      rules: {
        KSV005: false,
        KSV013: true,
      },
    });

    validator.preload({
      // Responsible for validator construction
      plugins: {
        'open-policy-agent': true,
        'yaml-syntax': false,
        'kubernetes-schema': false,
        'resource-links': false,
      },
      // Responsbility for rules
      rules: {
        KSV005: 'warn',
        'open-policy-agent/no-latest-image': 'warn',
      },
      // Responsible for validator runtime behavior
      settings: {
        debug: true,
      },
    });

    const response = await validator.validate({resources: RESOURCES});

    // uncomment to debug
    // response.runs.forEach((r) =>
    //   r.results.forEach((result) => {
    //     console.error(result.ruleId, result.message.text);
    //   })
    // );

    const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);
    expect(hasErrors).toMatchInlineSnapshot('11');
  }
});

function createTestValidator(parser?: ResourceParser) {
  return new MonokleValidator(
    {
      parser: parser ?? new ResourceParser(),
      schemaLoader: new SchemaLoader(),
      loader: new DefaultPluginLoader(),
      suppressors: [],
      fixer: new DisabledFixer(),
    },
    {
      plugins: {
        'kubernetes-schema': true,
        'yaml-syntax': true,
        'pod-security-standards': true,
        'resource-links': true,
      },
    }
  );
}
