import {RuleMetadata} from '../../common/sarif.js';

export const KUBERNETES_SCHEMA_RULES: RuleMetadata[] = [
  {
    id: 'K8S001',
    name: 'schema-violated',
    shortDescription: {
      text: 'The resource is formatted incorrectly.',
    },
    fullDescription: {
      text: 'The resource is violating the schema violation. The Kubernetes API will not accept this resource.',
    },
    help: {
      text: 'Check whether the property is used correctly. You can hover the key for documentation.',
    },
  },
  {
    id: 'K8S002',
    name: 'deprecation-violated',
    shortDescription: {
      text: 'The resource uses deprecated "apiVersion" value.',
    },
    fullDescription: {
      text: 'The resource is violating the deprecation violation. The Kubernetes API may not accept this resource or can behave unexpectedly.',
    },
    help: {
      text: 'Change "apiVersion" for up-to-date value. You can hover the key for documentation.',
    },
  },
  {
    id: 'K8S003',
    name: 'removal-violated',
    shortDescription: {
      text: 'The resource uses removed "apiVersion" value.',
    },
    fullDescription: {
      text: 'The resource is violating the removal violation. The Kubernetes API may not accept this resource or can behave unexpectedly.',
    },
    help: {
      text: 'Change "apiVersion" for up-to-date value. You can hover the key for documentation.',
    },
    defaultConfiguration: {
      level: 'error',
    },
  },
  {
    id: 'K8S004',
    name: 'strict-mode-violated',
    shortDescription: {
      text: 'Strict mode violated.',
    },
    fullDescription: {
      text: 'Strict mode violated. Cannot validate schema because its either missing or there is a typo in your apiVersion/kind.',
    },
    help: {
      text: 'Check if there is a typo in the apiVersion/kind or look into registering the schema of this CRD.',
    },
    defaultConfiguration: {
      enabled: false,
    },
  },
];
