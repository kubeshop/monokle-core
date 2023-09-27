import {RuleMetadata} from '../../common/sarif.js';

export const ADMISSION_POLICY_RULES: RuleMetadata[] = [
  {
    id: 'VAP001',
    name: 'admission-policy-violated',
    shortDescription: {text: 'Admission policy conditions violated'},
    help: {
      text: 'Check whether the admission policy conditions are met.',
    },
  },
];
