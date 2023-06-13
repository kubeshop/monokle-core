import {RuleMetadata} from '../../common/sarif.js';

export const METADATA_RULES: RuleMetadata[] = [
  {
    id: 'MTD001',
    name: 'recommended-labels',
    shortDescription: {
      text: 'Recommended labels are missing.',
    },
    fullDescription: {
      text: '',
    },
    help: {
      text: '',
    },
    defaultConfiguration: {
      level: 'error',
    },
  },
];
