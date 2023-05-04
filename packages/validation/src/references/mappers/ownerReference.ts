import {RefMapper} from './mappers.js';

export const ownerReferenceMapper: RefMapper = {
  source: {
    pathParts: ['metadata', 'ownerReferences', '*', 'uid'],
  },
  target: {
    kind: '$.*',
    pathParts: ['metadata', 'uid'],
  },
  type: 'owner',
};
