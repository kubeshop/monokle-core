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
      // Based on https://kubernetes.io/docs/concepts/overview/working-with-objects/common-labels/
      parameters: [
        'app.kubernetes.io/name',
        'app.kubernetes.io/instance',
        'app.kubernetes.io/version',
        'app.kubernetes.io/component',
        'app.kubernetes.io/part-of',
        'app.kubernetes.io/managed',
      ]
    },
  },
  {
    id: 'MTD002',
    name: 'custom-labels',
    shortDescription: {
      text: 'Custom labels are missing.',
    },
    fullDescription: {
      text: '',
    },
    help: {
      text: '',
    },
    defaultConfiguration: {
      level: 'warning',
    },
  },
];
