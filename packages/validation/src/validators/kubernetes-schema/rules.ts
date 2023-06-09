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
    name: 'apiversion-required',
    shortDescription: {
      text: 'The resource does not have "apiVersion" field.',
    },
    fullDescription: {
      text: 'The resource is violating the apiversion required. The resource schema will not be validated.',
    },
    help: {
      text: 'Set "apiVersion" to correct value according to used resource kind. You can hover the key for documentation.',
    },
  },
];
