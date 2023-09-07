import 'isomorphic-fetch';
import {expect, it} from 'vitest';
import {
  AnnotationSuppressor,
  createDefaultMonokleValidator,
  DisabledFixer,
  MonokleValidator,
  ResourceParser,
  SchemaLoader, Suppressor
} from '../../index.js';

import {extractK8sResources} from '@monokle/parser';
import {PRACTICES_ALL_DISABLED, readDirectory} from '../testUtils.js';
import {FakeSuppressor} from '../../sarif/suppressions/plugins/FakeSuppressor.js';
import YAML from 'yaml';
import {set} from 'lodash';
import {DefaultPluginLoader} from "../../pluginLoaders/PluginLoader";

it('supports suppress requests', async () => {
  const suppressor = new FakeSuppressor();
  const validator = createTestValidator(suppressor);

  // Given a problem
  const files = await readDirectory('./src/__tests__/resources/basic-deployment');
  const badResponse = await validator.validate({
    resources: extractK8sResources(files),
  });
  const problemCount = badResponse.runs[0].results.length;
  expect(problemCount).toBe(1);

  // When it is suppressed
  suppressor.addSuppressionRequest(badResponse.runs[0].results[0]);

  // Then the next validate response will mark the suppress request
  const editedResponse = await validator.validate({
    resources: extractK8sResources(files),
  });

  editedResponse.runs.forEach(r =>
    r.results.forEach(result => {
      console.error(result.ruleId, result.suppressions);
    })
  );

  const problem = editedResponse.runs[0].results[0];
  expect(problem.suppressions?.length).toBe(1);
});

it('supports annotation suppressions', async () => {
  const validator = createTestValidator(new AnnotationSuppressor());

  // Given a problem
  const files = await readDirectory('./src/__tests__/resources/basic-deployment');
  const badResponse = await validator.validate({
    resources: extractK8sResources(files),
  });
  const problemCount = badResponse.runs[0].results.length;
  expect(problemCount).toBe(1);

  // When an annotation is added
  const content = YAML.parse(files[0].content);
  set(content, 'metadata.annotations["monokle.io/suppress.kbp.no-latest-image"]', true);
  files[0].content = YAML.stringify(content);

  // Then the next validate response will mark the suppress request
  const editedResponse = await validator.validate({
    resources: extractK8sResources(files),
  });

  const problem = editedResponse.runs[0].results[0];
  expect(problem.suppressions?.length).toBe(1);
});


function createTestValidator(suppressor: Suppressor) {
  return new MonokleValidator(
      {
        loader: new DefaultPluginLoader(),
        parser: new ResourceParser(),
        schemaLoader: new SchemaLoader(),
        suppressors: [suppressor],
        fixer: new DisabledFixer(),
      },
      {
        plugins: {
          practices: true,
        },
        rules: {
          ...PRACTICES_ALL_DISABLED,
          'practices/no-latest-image': 'err',
        },
      }
  );
}