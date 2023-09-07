import {RuleConfigMetadataType, RuleMetadata} from '../../common/sarif.js';

export const METADATA_RULES: RuleMetadata[] = [
  {
    id: 'MTD-recommended-labels',
    name: 'recommended-labels',
    shortDescription: {
      text: 'Recommended labels are missing.',
    },
    fullDescription: {
      text: 'The resource is violating the recommended labels. The resource may not be discoverable by tools that rely on these labels.',
    },
    help: {
      text: 'Add all recommended labels. You can hover the key for documentation.',
    },
    defaultConfiguration: {
      level: 'error',
      // Based on https://kubernetes.io/docs/concepts/overview/working-with-objects/common-labels/
      parameters: {
        configValue: [
          'app.kubernetes.io/name',
          'app.kubernetes.io/instance',
          'app.kubernetes.io/version',
          'app.kubernetes.io/component',
          'app.kubernetes.io/part-of',
          'app.kubernetes.io/managed',
        ],
      },
    },
  },
  {
    id: 'MTD-custom-labels',
    name: 'custom-labels',
    shortDescription: {
      text: 'Custom labels are missing.',
    },
    fullDescription: {
      text: 'The resource is violating the custom labels. The resource may not be discoverable by tools that rely on these labels.',
    },
    help: {
      text: 'Add all required custom labels. You can hover the key for documentation.',
    },
    defaultConfiguration: {
      enabled: false,
      level: 'warning',
      parameters: {
        configValue: [],
      },
    },
    properties: {
      configMetadata: {
        type: RuleConfigMetadataType.StringArray,
        name: 'Required labels',
      },
    },
  },
  {
    id: 'MTD-custom-annotations',
    name: 'custom-annotations',
    shortDescription: {
      text: 'Custom annotations are missing.',
    },
    fullDescription: {
      text: 'The resource is violating the custom annotations. The resource may not be discoverable by tools that rely on these annotations.',
    },
    help: {
      text: 'Add all required custom annotations. You can hover the key for documentation.',
    },
    defaultConfiguration: {
      enabled: false,
      level: 'warning',
      parameters: {
        configValue: [],
      },
    },
    properties: {
      configMetadata: {
        type: RuleConfigMetadataType.StringArray,
        name: 'Required annotations',
      },
    },
  },
];
