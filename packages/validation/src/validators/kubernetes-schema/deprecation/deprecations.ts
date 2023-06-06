import { Deprecations } from "./validator";

// Based on:
// - https://kubernetes.io/docs/reference/using-api/deprecation-guide/#removed-apis-by-release

export const REMOVALS: Deprecations[] = [
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
        type: 'removal',
        clarification: 'Serving these resources can be temporarily re-enabled using the "--runtime-config" apiserver flag (https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.16.md#deprecations-and-removals).'
      },
      {
        kinds: ['DaemonSet'],
        versions: ['extensions/v1beta1', 'apps/v1beta2'],
        recommended: 'apps/v1',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#daemonset-v116',
        type: 'removal',
        clarification: 'Serving these resources can be temporarily re-enabled using the "--runtime-config" apiserver flag (https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.16.md#deprecations-and-removals).'
      },
      {
        kinds: ['Deployment'],
        versions: ['extensions/v1beta1', 'apps/v1beta1', 'apps/v1beta2'],
        recommended: 'apps/v1',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#deployment-v116',
        type: 'removal',
        clarification: 'Serving these resources can be temporarily re-enabled using the "--runtime-config" apiserver flag (https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.16.md#deprecations-and-removals).'
      },
      {
        kinds: ['StatefulSet'],
        versions: ['apps/v1beta1', 'apps/v1beta2'],
        recommended: 'apps/v1',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#statefulset-v116',
        type: 'removal',
        clarification: 'Serving these resources can be temporarily re-enabled using the "--runtime-config" apiserver flag (https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.16.md#deprecations-and-removals).'
      },
      {
        kinds: ['PodSecurityPolicy'],
        versions: ['extensions/v1beta1'],
        recommended: 'policy/v1beta1',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#psp-v116',
        type: 'removal',
        clarification: 'Serving these resources can be temporarily re-enabled using the "--runtime-config" apiserver flag (https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.16.md#deprecations-and-removals).'
      },
      {
        kinds: ['ReplicaSet'],
        versions: ['extensions/v1beta1', 'apps/v1beta1', 'apps/v1beta2'],
        recommended: 'apps/v1',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#replicaset-v116',
        type: 'removal',
        clarification: 'Serving these resources can be temporarily re-enabled using the "--runtime-config" apiserver flag (https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.16.md#deprecations-and-removals).'
      }
    ]
  }
];

export const DEPRECATIONS: Deprecations[] = [
  {
    version: 'v1.26',
    rules: [
      {
        kinds: ['KubeSchedulerConfiguration'],
        versions: ['kubescheduler.config.k8s.io/v1beta3'],
        recommended: 'kubescheduler.config.k8s.io/v1',
        link: 'https://kubernetes.io/docs/reference/scheduling/config', // Should refer to v1.27 docs permalink when available
        type: 'deprecation'
      },
    ]
  },
  {
    version: 'v1.25',
    rules: [
      {
        kinds: ['KubeSchedulerConfiguration'],
        versions: ['kubescheduler.config.k8s.io/v1beta2'],
        recommended: 'kubescheduler.config.k8s.io/v1',
        link: 'https://v1-25.docs.kubernetes.io/docs/reference/scheduling/config',
        type: 'deprecation'
      },
    ]
  },
  {
    version: 'v1.24',
    rules: [
      {
        // https://kubernetes.io/docs/reference/config-api/kubeadm-config.v1beta3/
        kinds: ['InitConfiguration', 'ClusterConfiguration', 'KubeletConfiguration', 'KubeProxyConfiguration', 'JoinConfiguration'],
        versions: ['kubeadm.k8s.io/v1beta2'],
        recommended: 'kubeadm.k8s.io/v1beta3',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.24.md#urgent-upgrade-notes',
        type: 'deprecation'
      },
      {
        kinds: ['RuntimeClass'],
        versions: ['node.k8s.io/v1alpha1'],
        recommended: 'node.k8s.io/v1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.24.md#deprecation',
        type: 'removal'
      },
      {
        kinds: ['ExecCredential'],
        versions: ['client.authentication.k8s.io/v1alpha1'],
        recommended: 'client.authentication.k8s.io/v1beta1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.24.md#deprecation',
        type: 'removal'
      },
      {
        // https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/
        // https://kubernetes.io/docs/reference/config-api/apiserver-audit.v1/#audit-k8s-io-v1-Policy
        kinds: ['Policy'],
        versions: ['audit.k8s.io/v1beta1', 'audit.k8s.io/v1alpha1'],
        recommended: 'audit.k8s.io/v1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.24.md#api-change-4',
        type: 'removal'
      },
      {
        kinds: ['CSIStorageCapacity'],
        versions: ['storage.k8s.io/v1beta1'],
        recommended: 'storage.k8s.io/v1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.24.md#api-change-4',
        type: 'deprecation'
      }
    ]
  },
  {
    version: 'v1.23',
    rules: [
      {
        kinds: ['HorizontalPodAutoscaler'],
        versions: ['autoscaling/v2beta1'],
        recommended: 'autoscaling/v2',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.23.md#horizontalpodautoscaler-v2-graduates-to-ga',
        type: 'deprecation'
      }
    ]
  },
  {
    version: 'v1.22',
    rules: [
      {
        // https://kubernetes.io/docs/reference/config-api/kubeadm-config.v1beta3/
        kinds: ['InitConfiguration', 'ClusterConfiguration', 'KubeletConfiguration', 'KubeProxyConfiguration', 'JoinConfiguration'],
        versions: ['kubeadm.k8s.io/v1beta1'],
        recommended: 'kubeadm.k8s.io/v1beta3',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.24.md#urgent-upgrade-notes',
        type: 'removal'
      }
    ]
  },
  {
    version: 'v1.21',
    rules: [
      {
        kinds: ['PodSecurityPolicy'],
        versions: ['policy/v1beta1'],
        recommended: null,
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.21.md#deprecation-of-podsecuritypolicy',
        type: 'deprecation'
      },
      {
        kinds: ['CronJob'],
        versions: ['batch/v2alpha1'],
        recommended: 'batch/v1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.21.md#deprecation',
        type: 'removal'
      },
      {
        kinds: ['Policy'],
        versions: ['audit.k8s.io/v1beta1', 'audit.k8s.io/v1alpha1'],
        recommended: 'audit.k8s.io/v1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.21.md#deprecation',
        type: 'deprecation'
      },
      {
        kinds: ['EndpointSlice'],
        versions: ['discovery.k8s.io/v1beta1'],
        recommended: 'discovery.k8s.io/v1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.21.md#deprecation',
        type: 'deprecation'
      },
      {
        kinds: ['EndpointSlice'],
        versions: ['discovery.k8s.io/v1alpha1'],
        recommended: 'discovery.k8s.io/v1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.21.md#api-change-3',
        type: 'removal'
      },
      {
        kinds: ['PodDisruptionBudget'],
        versions: ['policy/v1beta1'],
        recommended: 'policy/v1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.21.md#api-change-3',
        type: 'deprecation'
      },
    ]
  },
  {
    version: 'v1.20',
    rules: [
      {
        kinds: ['RuntimeClass'],
        versions: ['node.k8s.io/v1beta1'],
        recommended: 'node.k8s.io/v1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.20.md#runtimeclass-feature-graduates-to-general-availability',
        type: 'deprecation'
      },
      {
        kinds: ['EndpointSlice'],
        versions: ['discovery.k8s.io/v1alpha1'],
        recommended: 'discovery.k8s.io/v1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.20.md#api-change-4',
        type: 'deprecation'
      },
    ]
  },
  {
    version: 'v1.19',
    rules: [
      {
        kinds: ['CustomResourceDefinition'],
        versions: ['apiextensions.k8s.io/v1beta1'],
        recommended: 'apiextensions.k8s.io/v1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.19.md#deprecation',
        type: 'deprecation'
      },
      {
        kinds: ['APIService'],
        versions: ['apiregistration.k8s.io/v1beta1'],
        recommended: 'apiregistration.k8s.io/v1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.19.md#deprecation',
        type: 'deprecation'
      },
      {
        kinds: ['TokenReview'],
        versions: ['authentication.k8s.io/v1beta1'],
        recommended: 'authentication.k8s.io/v1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.19.md#deprecation',
        type: 'deprecation'
      },
      {
        kinds: ['HorizontalPodAutoscaler'],
        versions: ['autoscaling/v2beta1'],
        recommended: 'autoscaling/v2beta2',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.19.md#deprecation',
        type: 'deprecation'
      },
      {
        kinds: ['Lease'],
        versions: ['coordination.k8s.io/v1beta1'],
        recommended: 'coordination.k8s.io/v1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.19.md#deprecation',
        type: 'deprecation'
      },
      {
        kinds: ['Ingress', 'IngressClass'],
        versions: ['extensions/v1beta1', 'networking.k8s.io/v1beta1'],
        recommended: 'networking.k8s.io/v1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.19.md#api-change-4',
        type: 'deprecation'
      },
      {
        kinds: ['CSIDriver', 'CSINode', 'StorageClass', 'VolumeAttachment'],
        versions: ['storage.k8s.io/v1beta1'],
        recommended: 'storage.k8s.io/v1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.19.md#deprecation-4',
        type: 'deprecation'
      },
    ]
  },
  {
    version: 'v1.18',
    rules: [
      {
        kinds: ['*'],
        versions: ['apps/v1beta1', 'apps/v1beta2'],
        recommended: 'apps/v1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.18.md#kube-apiserver-1',
        type: 'removal'
      },
      {
        kinds: ['DaemonSet', 'Deployment', 'ReplicaSet'],
        versions: ['extensions/v1beta1'],
        recommended: 'apps/v1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.18.md#kube-apiserver-1',
        type: 'removal'
      },
      {
        kinds: ['DaemonSet', 'Deployment', 'ReplicaSet'],
        versions: ['extensions/v1beta1'],
        recommended: 'apps/v1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.18.md#kube-apiserver-1',
        type: 'removal'
      },
      {
        kinds: ['NetworkPolicy'],
        versions: ['extensions/v1beta1'],
        recommended: 'networking.k8s.io/v1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.18.md#kube-apiserver-1',
        type: 'removal'
      },
      {
        kinds: ['PodSecurityPolicy'],
        versions: ['extensions/v1beta1'],
        recommended: 'policy/v1beta1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.18.md#kube-apiserver-1',
        type: 'removal'
      },
    ]
  },
  {
    version: 'v1.17',
    rules: [
      {
        kinds: ['InitConfiguration', 'ClusterConfiguration', 'KubeletConfiguration', 'KubeProxyConfiguration', 'JoinConfiguration'],
        versions: ['kubeadm.k8s.io/v1beta1'],
        recommended: 'kubeadm.k8s.io/v1beta2',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.17.md#deprecations-and-removals',
        type: 'deprecation'
      },
      {
        kinds: ['ClusterRole', 'ClusterRoleBinding', 'Role', 'RoleBinding'],
        versions: ['rbac.authorization.k8s.io/v1beta1', 'rbac.authorization.k8s.io/v1alpha1'],
        recommended: 'rbac.authorization.k8s.io/v1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.17.md#deprecations-and-removals',
        type: 'deprecation'
      },
      {
        kinds: ['CSINode'],
        versions: ['storage.k8s.io/v1beta1'],
        recommended: 'storage.k8s.io/v1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.17.md#deprecations-and-removals',
        type: 'deprecation'
      },
    ]
  },
  {
    version: 'v1.16',
    rules: [
      {
        kinds: ['Ingress', 'IngressClass'],
        versions: ['extensions/v1beta1'],
        recommended: 'networking.k8s.io/v1beta1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.16.md#deprecations-and-removals',
        type: 'deprecation'
      },
      {
        kinds: ['PriorityClass'],
        versions: ['scheduling.k8s.io/v1beta1', 'scheduling.k8s.io/v1alpha1'],
        recommended: 'scheduling.k8s.io/v1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.16.md#deprecations-and-removals',
        type: 'deprecation'
      },
      {
        kinds: ['CustomResourceDefinition'],
        versions: ['apiextensions.k8s.io/v1beta1'],
        recommended: 'apiextensions.k8s.io/v1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.16.md#deprecations-and-removals',
        type: 'deprecation'
      },
      {
        kinds: ['MutatingWebhookConfiguration', 'ValidatingWebhookConfiguration'],
        versions: ['admissionregistration.k8s.io/v1beta1'],
        recommended: 'admissionregistration.k8s.io/v1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.16.md#deprecations-and-removals',
        type: 'deprecation'
      }
    ]
  },
  {
    version: 'v1.15',
    rules: [
      {
        kinds: ['Ingress', 'IngressClass'],
        versions: ['extensions/v1beta1'],
        recommended: 'networking.k8s.io/v1beta1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.15.md#deprecations-and-removals',
        type: 'deprecation'
      },
      {
        kinds: ['NetworkPolicy'],
        versions: ['extensions/v1beta1'],
        recommended: 'networking.k8s.io/v1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.15.md#deprecations-and-removals',
        type: 'deprecation'
      },
      {
        kinds: ['PodSecurityPolicy'],
        versions: ['extensions/v1beta1'],
        recommended: 'policy/v1beta1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.15.md#deprecations-and-removals',
        type: 'deprecation'
      },
      {
        kinds: ['DaemonSet', 'Deployment', 'ReplicaSet'],
        versions: ['extensions/v1beta1', 'apps/v1beta1', 'apps/v1beta2'],
        recommended: 'apps/v1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.18.md#kube-apiserver-1',
        type: 'deprecation'
      },
      {
        kinds: ['PriorityClass'],
        versions: ['scheduling.k8s.io/v1beta1', 'scheduling.k8s.io/v1alpha1'],
        recommended: 'scheduling.k8s.io/v1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.15.md#deprecations-and-removals',
        type: 'deprecation'
      },
      {
        kinds: ['InitConfiguration', 'ClusterConfiguration', 'KubeletConfiguration', 'KubeProxyConfiguration', 'JoinConfiguration'],
        versions: ['kubeadm.k8s.io/v1alpha3'],
        // https://igeclouds.github.io/kubernetes.github.io/docs/reference/config-api/kubeadm-config.v1beta2/
        recommended: 'kubeadm.k8s.io/v1beta2',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.15.md#other-notable-changes-13',
        type: 'removal'
      }
    ]
  },
  {
    version: 'v1.14',
    rules: [
      {
        kinds: ['Ingress', 'IngressClass'],
        versions: ['extensions/v1beta1'],
        recommended: 'networking.k8s.io/v1beta1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.14.md#deprecations',
        type: 'deprecation'
      },
      {
        kinds: ['NetworkPolicy'],
        versions: ['extensions/v1beta1'],
        recommended: 'networking.k8s.io/v1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.14.md#deprecations',
        type: 'deprecation'
      },
      {
        kinds: ['PodSecurityPolicy'],
        versions: ['extensions/v1beta1'],
        recommended: 'policy/v1beta1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.14.md#deprecations',
        type: 'deprecation'
      },
      {
        kinds: ['DaemonSet', 'Deployment', 'ReplicaSet'],
        versions: ['extensions/v1beta1', 'apps/v1beta1', 'apps/v1beta2'],
        recommended: 'apps/v1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.14.md#deprecations',
        type: 'deprecation'
      },
      {
        kinds: ['PriorityClass'],
        versions: ['scheduling.k8s.io/v1beta1', 'scheduling.k8s.io/v1alpha1'],
        recommended: 'scheduling.k8s.io/v1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.14.md#deprecations',
        type: 'deprecation'
      },
    ]
  },
  {
    version: 'v1.13',
    rules: [
      {
        kinds: ['KubeSchedulerConfiguration'],
        versions: ['componentconfig/v1alpha1'],
        recommended: 'kubescheduler.config.k8s.io/v1alpha1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.13.md#urgent-upgrade-notes',
        type: 'removal'
      },
      {
        kinds: ['EncryptionConfig '],
        versions: ['v1'],
        recommended: 'apiserver.config.k8s.io/v1 (with EncryptionConfiguration)',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.13.md#deprecations',
        type: 'deprecation'
      },
    ]
  },
  {
    version: 'v1.12',
    rules: [
      {
        kinds: ['InitConfiguration', 'ClusterConfiguration', 'KubeletConfiguration', 'KubeProxyConfiguration', 'JoinConfiguration'],
        versions: ['kubeadm.k8s.io/v1alpha1'],
        recommended: 'kubeadm.k8s.io/v1alpha2',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.12.md#action-required-1',
        type: 'removal'
      },
      {
        kinds: ['Event'],
        versions: ['audit.k8s.io/v1beta1'],
        recommended: 'audit.k8s.io/v1',
        link: 'https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.12.md#other-notable-changes-15',
        type: 'deprecation'
      }
    ]
  }
];
