import type { KnownResourceKinds } from "../../utils/knownResourceKinds.js";

export function getResourceSchemaPrefix(kind: string): string | undefined {
  const prefix = RESOURCE_SCHEMA_PREFIX[kind as KnownResourceKinds];
  return prefix;
}

export const RESOURCE_SCHEMA_PREFIX: Partial<
  Record<KnownResourceKinds, string>
> = {
  ClusterRole: "io.k8s.api.rbac.v1",
  ClusterRoleBinding: "io.k8s.api.rbac.v1",
  ConfigMap: "io.k8s.api.core.v1",
  CronJob: "io.k8s.api.batch.v1",
  CustomResourceDefinition:
    "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1",
  DaemonSet: "io.k8s.api.apps.v1",
  Deployment: "io.k8s.api.apps.v1",
  HorizontalPodAutoscaler: "io.k8s.api.autoscaling.v1",
  Ingress: "io.k8s.api.networking.v1",
  Job: "io.k8s.api.batch.v1",
  LimitRange: "io.k8s.api.core.v1",
  Namespace: "io.k8s.api.core.v1",
  NetworkPolicy: "io.k8s.api.networking.v1",

  Service: "io.k8s.api.core.v1",
  Role: "io.k8s.api.rbac.v1",
  RoleBinding: "io.k8s.api.rbac.v1",
};
