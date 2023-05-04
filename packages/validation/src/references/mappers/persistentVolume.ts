import {explicitNamespaceMatcher, SecretTarget} from './core.js';
import {RefMapper} from './mappers.js';

export const persistentVolumeMapper: RefMapper[] = [
  {
    type: 'name',
    source: {pathParts: ['spec', 'claimRef', 'name']},
    target: {kind: 'PersistentVolumeClaim'},
  },
  {
    // https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.22/#secretreference-v1-core
    type: 'name',
    source: {
      pathParts: ['secretRef', 'name'],
      siblingMatchers: {
        namespace: explicitNamespaceMatcher,
      },
    },
    ...SecretTarget,
  },
  {
    // https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.22/#azurefilepersistentvolumesource-v1-core
    type: 'name',
    source: {
      pathParts: ['spec', 'azureFile', 'secretName'],
      siblingMatchers: {
        secretNamespace: explicitNamespaceMatcher,
      },
    },
    ...SecretTarget,
  },
  {
    // https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.22/#azurefilevolumesource-v1-core
    type: 'name',
    source: {
      pathParts: ['volumes', '*', 'azureFile', 'secretName'],
    },
    ...SecretTarget,
  },
  {
    type: 'name',
    source: {
      pathParts: ['spec', 'claimRef'],
      siblingMatchers: {
        kind(source, target, value) {
          return value === undefined || target.kind === value;
        },
        apiVersion(source, target, value) {
          return value === undefined || target.apiVersion.startsWith(value);
        },
        namespace(source, target, value) {
          return value === undefined || target.namespace === value;
        },
        uid(source, target, value) {
          return value === undefined || target.id === value;
        },
      },
    },
    target: {
      kind: 'PersistentVolumeClaim',
    },
  },
];
