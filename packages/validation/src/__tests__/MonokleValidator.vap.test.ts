import {expect, it} from 'vitest';
import {MonokleValidator} from '../MonokleValidator.js';

import {ResourceParser} from '../common/resourceParser.js';
import {DefaultPluginLoader} from '../pluginLoaders/PluginLoader';
import {ValidationConfig} from '@monokle/types';
import {DisabledFixer, SchemaLoader} from '../node.js';
import {
  NAMESPACE,
  VALIDATING_ADMISSION_POLICY,
  VALIDATING_ADMISSION_POLICY_BINDING,
  DEPLOYMENT,
} from './resources/admissionPolicy/BasicValidatorResources.js';
import {
  PARAMS_CONFIG_MAP,
  PARAMS_DEPLOYMENT,
  PARAMS_NAMESPACE,
  PARAMS_VALIDATING_ADMISSION_POLICY,
  PARAMS_VALIDATING_ADMISSION_POLICY_BINDING,
} from './resources/admissionPolicy/ParamsValidatorResources.js';
import {CRD, CRD_MESSAGE_EXPRESSION, CUSTOM_RESOURCE} from './resources/admissionPolicy/CRDValidatorResources.js';

it('test basic admission policy', async () => {
  const parser = new ResourceParser();

  const validator = createTestValidator(parser, {
    plugins: {
      'admission-policy': true,
    },
  });

  const response = await validator.validate({
    resources: [NAMESPACE, VALIDATING_ADMISSION_POLICY, VALIDATING_ADMISSION_POLICY_BINDING, DEPLOYMENT],
  });

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);
  expect(hasErrors).toBe(1);
});

it('test params admission policy', async () => {
  const parser = new ResourceParser();

  const validator = createTestValidator(parser, {
    plugins: {
      'admission-policy': true,
    },
  });

  const response = await validator.validate({
    resources: [
      PARAMS_CONFIG_MAP,
      PARAMS_DEPLOYMENT,
      PARAMS_NAMESPACE,
      PARAMS_VALIDATING_ADMISSION_POLICY,
      PARAMS_VALIDATING_ADMISSION_POLICY_BINDING,
    ],
  });

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);
  expect(hasErrors).toBe(1);
});

it('test crd admission policy', async () => {
  const parser = new ResourceParser();

  const validator = createTestValidator(parser);

  const response = await validator.validate({
    resources: [CRD, CUSTOM_RESOURCE],
  });

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);
  expect(hasErrors).toBe(1);
});

it('test crd with message expression admission policy', async () => {
  const parser = new ResourceParser();

  const validator = createTestValidator(parser);

  const response = await validator.validate({
    resources: [CRD_MESSAGE_EXPRESSION, CUSTOM_RESOURCE],
  });

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);
  expect(hasErrors).toBe(1);
});

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
        'admission-policy': true,
        'kubernetes-schema': false,
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
