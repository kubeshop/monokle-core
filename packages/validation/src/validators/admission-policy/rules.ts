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
  {
    id: 'VAP002',
    name: 'admission-policy-failed-to-evaluate',
    shortDescription: {text: "Admission policy couldn't be evaluated"},
    help: {
      text: 'Check whether the admission policy expression is properly written.',
    },
  },
];
