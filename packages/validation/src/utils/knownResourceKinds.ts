export function isKnownResourceKind(kind: string): boolean {
  return KNOWN_RESOURCE_KINDS.includes(kind as any);
}

export type KnownResourceKinds = typeof KNOWN_RESOURCE_KINDS[number];
export const KNOWN_RESOURCE_KINDS = [
  'ClusterRole',
  'ClusterRoleBinding',
  'ConfigMap',
  'CronJob',
  'CustomResourceDefinition',
  'DaemonSet',
  'Deployment',
  'Endpoints',
  'EndpointSlice',
  'HorizontalPodAutoscaler',
  'Ingress',
  'Job',
  'LimitRange',
  'Namespace',
  'NetworkPolicy',
  'PersistentVolume',
  'PersistentVolumeClaim',
  'Pod',
  'ReplicaSet',
  'ReplicationController',
  'ResourceQuota',
  'Role',
  'RoleBinding',
  'Secret',
  'Service',
  'ServiceAccount',
  'StatefulSet',
  'StorageClass',
  'VolumeAttachment',
] as const;
