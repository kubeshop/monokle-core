import 'isomorphic-fetch';
import {expect, it} from 'vitest';
import {createDefaultMonokleValidator} from '../../index.js';

import {PRACTICES_ALL_DISABLED, extractK8sResources, readDirectory} from '../testUtils.js';

it('should have fingerprints & baseline', async () => {
  const validator = createDefaultMonokleValidator();

  await validator.preload({
    plugins: {
      practices: true,
    },
    rules: {
      ...PRACTICES_ALL_DISABLED,
      'practices/no-writable-fs': 'err',
      'practices/no-latest-image': 'err',
    },
  });

  const files = await readDirectory('./src/__tests__/resources/basic-deployment');
  const resourceBad = extractK8sResources(files);
  const badResponse = await validator.validate({resources: resourceBad});

  // Enable another rule to have one "new" problem
  await validator.preload({
    plugins: {
      practices: true,
    },
    rules: {
      ...PRACTICES_ALL_DISABLED,
      'practices/no-writable-fs': 'err',
      'practices/no-latest-image': 'err',
      'practices/drop-capabilities': 'err',
    },
  });

  // Fix no-latest-image problem to have one "absent" problem
  files[0].content = files[0].content.replace(':latest', ':v1');

  const editedResponse = await validator.validate({
    resources: extractK8sResources(files),
    incremental: {resourceIds: [resourceBad[0].id]},
    baseline: badResponse,
  });

  const run = editedResponse.runs[0];
  expect(run.baselineGuid).toBeDefined();
  const unchangedCount = run.results.reduce((sum, r) => sum + (r.baselineState === 'unchanged' ? 1 : 0), 0);
  const newCount = run.results.reduce((sum, r) => sum + (r.baselineState === 'new' ? 1 : 0), 0);
  const absentCount = run.results.reduce((sum, r) => sum + (r.baselineState === 'absent' ? 1 : 0), 0);
  expect(unchangedCount).toBe(1);
  expect(newCount).toBe(1);
  expect(absentCount).toBe(1);
});
