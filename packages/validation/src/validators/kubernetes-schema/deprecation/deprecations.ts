import { Deprecations } from "./validator";

// Based on:
// - https://kubernetes.io/docs/reference/using-api/deprecation-guide/#removed-apis-by-release

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
    version: 'v1.27',
    rules: [
      {
        kinds: ['CSIStorageCapacity'],
        versions: ['storage.k8s.io/v1beta1'],
        recommended: 'storage.k8s.io/v1',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#csistoragecapacity-v127',
        type: 'removal'
      }
    ]
  },
  {
    version: 'v1.26',
    rules: [
      {
        kinds: ['FlowSchema', 'PriorityLevelConfiguration'],
        versions: ['flowcontrol.apiserver.k8s.io/v1beta1'],
        recommended: 'flowcontrol.apiserver.k8s.io/v1beta3',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#flowcontrol-resources-v126',
        type: 'removal'
      },
      {
        kinds: ['HorizontalPodAutoscaler'],
        versions: ['autoscaling/v2beta2'],
        recommended: 'autoscaling/v2',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#horizontalpodautoscaler-v126',
        type: 'removal'
      }
    ]
  },
  {
    version: 'v1.25',
    rules: [
      {
        kinds: ['CronJob'],
        versions: ['batch/v1beta1'],
        recommended: 'batch/v1',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#cronjob-v125',
        type: 'removal'
      },
      {
        kinds: ['EndpointSlice'],
        versions: ['discovery.k8s.io/v1beta1'],
        recommended: 'discovery.k8s.io/v1',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#endpointslice-v125',
        type: 'removal'
      },
      {
        kinds: ['Event'],
        versions: ['events.k8s.io/v1beta1'],
        recommended: 'events.k8s.io/v1',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#event-v125',
        type: 'removal'
      },
      {
        kinds: ['HorizontalPodAutoscaler'],
        versions: ['autoscaling/v2beta1'],
        recommended: 'autoscaling/v2',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#horizontalpodautoscaler-v125',
        type: 'removal'
      },
      {
        kinds: ['PodDisruptionBudget'],
        versions: ['policy/v1beta1'],
        recommended: 'policy/v1',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#poddisruptionbudget-v125',
        type: 'removal'
      },
      {
        kinds: ['PodSecurityPolicy'],
        versions: ['policy/v1beta1'],
        recommended: null,
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#psp-v125',
        type: 'removal'
      },
      {
        kinds: ['RuntimeClass'],
        versions: ['node.k8s.io/v1beta1'],
        recommended: 'node.k8s.io/v1',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#runtimeclass-v125',
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
      },
      {
        kinds: ['CustomResourceDefinition'],
        versions: ['apiextensions.k8s.io/v1beta1'],
        recommended: 'apiextensions.k8s.io/v1',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#customresourcedefinition-v122',
        type: 'removal'
      },
      {
        kinds: ['APIService'],
        versions: ['apiregistration.k8s.io/v1beta1'],
        recommended: 'apiregistration.k8s.io/v1',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#apiservice-v122',
        type: 'removal'
      },
      {
        kinds: ['TokenReview'],
        versions: ['authentication.k8s.io/v1beta1'],
        recommended: 'authentication.k8s.io/v1',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#tokenreview-v122',
        type: 'removal'
      },
      {
        kinds: ['LocalSubjectAccessReview', 'SelfSubjectAccessReview', 'SubjectAccessReview', 'SelfSubjectRulesReview'],
        versions: ['authorization.k8s.io/v1beta1'],
        recommended: 'authorization.k8s.io/v1',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#subjectaccessreview-resources-v122',
        type: 'removal'
      },
      {
        kinds: ['CertificateSigningRequest'],
        versions: ['certificates.k8s.io/v1beta1'],
        recommended: 'certificates.k8s.io/v1',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#certificatesigningrequest-v122',
        type: 'removal'
      },
      {
        kinds: ['Lease'],
        versions: ['coordination.k8s.io/v1beta1'],
        recommended: 'coordination.k8s.io/v1',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#lease-v122',
        type: 'removal'
      },
      {
        kinds: ['Ingress'],
        versions: ['extensions/v1beta1', 'networking.k8s.io/v1beta1'],
        recommended: 'networking.k8s.io/v1',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#ingress-v122',
        type: 'removal'
      },
      {
        kinds: ['IngressClass'],
        versions: ['networking.k8s.io/v1beta1'],
        recommended: 'networking.k8s.io/v1',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#ingressclass-v122',
        type: 'removal'
      },
      {
        kinds: ['ClusterRole', 'ClusterRoleBinding', 'Role', 'RoleBinding'],
        versions: ['rbac.authorization.k8s.io/v1beta1'],
        recommended: 'rbac.authorization.k8s.io/v1',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#rbac-resources-v122',
        type: 'removal'
      },
      {
        kinds: ['PriorityClass'],
        versions: ['scheduling.k8s.io/v1beta1'],
        recommended: 'scheduling.k8s.io/v1',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#priorityclass-v122',
        type: 'removal'
      },
      {
        kinds: ['CSIDriver', 'CSINode', 'StorageClass', 'VolumeAttachment'],
        versions: ['storage.k8s.io/v1beta1'],
        recommended: ' storage.k8s.io/v1',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#storage-resources-v122',
        type: 'removal'
      }
    ]
  },
  {
    version: 'v1.16',
    rules: [
      {
        kinds: ['NetworkPolicy'],
        versions: ['extensions/v1beta1'],
        recommended: 'networking.k8s.io/v1',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#networkpolicy-v116',
        type: 'removal'
      },
      {
        kinds: ['DaemonSet'],
        versions: ['extensions/v1beta1', 'apps/v1beta2'],
        recommended: 'apps/v1',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#daemonset-v116',
        type: 'removal'
      },
      {
        kinds: ['Deployment'],
        versions: ['extensions/v1beta1', 'apps/v1beta1', 'apps/v1beta2'],
        recommended: 'apps/v1',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#deployment-v116',
        type: 'removal'
      },
      {
        kinds: ['StatefulSet'],
        versions: ['apps/v1beta1', 'apps/v1beta2'],
        recommended: 'apps/v1',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#statefulset-v116',
        type: 'removal'
      },
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
    ]
  }
];
