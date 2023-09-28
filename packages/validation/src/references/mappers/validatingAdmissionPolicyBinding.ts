import {RefMapper} from './mappers.js';

export const validatingAdmissionPolicyBindingMappers: RefMapper[] = [
  {
    type: 'name',
    source: {
      pathParts: ['policyName'],
    },
    target: {
      kind: 'ValidatingAdmissionPolicy',
    },
  },
];
