import { Deprecations } from "./validator";

export const DEPRECATIONS: Deprecations[] = [
  {
    version: 'v1.29',
    rules: [
      {
        kinds: ['FlowSchema', 'PriorityLevelConfiguration'],
        versions: ['flowcontrol.apiserver.k8s.io/v1beta2'],
        recommended: 'flowcontrol.apiserver.k8s.io/v1beta3',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#flowcontrol-resources-v129',
        type: 'removal'
      }
    ]
  },
  {
    version: 'v1.22',
    rules: [
      {
        kinds: ['MutatingWebhookConfiguration', 'ValidatingWebhookConfiguration'],
        versions: ['admissionregistration.k8s.io/v1beta1'],
        recommended: 'admissionregistration.k8s.io/v1',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#webhook-resources-v122',
        type: 'removal'
      }
    ]
  },
  {
    version: 'v1.16',
    rules: [
      {
        kinds: ['PodSecurityPolicy'],
        versions: ['extensions/v1beta1'],
        recommended: 'policy/v1beta1',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#psp-v116',
        type: 'removal'
      },
      {
        kinds: ['ReplicaSet'],
        versions: ['extensions/v1beta1', 'apps/v1beta1', 'apps/v1beta2'],
        recommended: 'apps/v1',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#replicaset-v116',
        type: 'removal'
      }
    ],
  }
];
