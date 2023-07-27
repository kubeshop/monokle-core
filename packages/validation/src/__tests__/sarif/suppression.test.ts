import 'isomorphic-fetch';
import {expect, it} from 'vitest';
import {createDefaultMonokleValidator} from '../../index.js';

import {PRACTICES_ALL_DISABLED, extractK8sResources, readDirectory} from '../testUtils.js';
import {FakeSuppressor} from '../../sarif/suppressions/plugins/FakeSuppressor.js';
import YAML from 'yaml';
import {set} from 'lodash';

it('supports suppress requests', async () => {
  const suppressor = new FakeSuppressor();
  const validator = createDefaultMonokleValidator(undefined, undefined, [suppressor]);

  await validator.preload({
    plugins: {
      practices: true,
    },
    rules: {
      ...PRACTICES_ALL_DISABLED,
      'practices/no-latest-image': 'err',
    },
  });

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

it('in-line annotation suppressions by default', async () => {
  const validator = createDefaultMonokleValidator();

  await validator.preload({
    plugins: {
      practices: true,
    },
    rules: {
      ...PRACTICES_ALL_DISABLED,
      'practices/no-latest-image': 'err',
    },
  });

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
