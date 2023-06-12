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
      text: 'The resource has unsupported or invalid "apiVersion" field value.',
    },
    fullDescription: {
      text: 'The resource is violating the strict-mode violation. The resource will not be validated against Kubernetes schema.',
    },
    help: {
      text: 'Not supported or invalid "apiVersion" value has been used. You can hover the key for documentation.',
    },
  },
];
