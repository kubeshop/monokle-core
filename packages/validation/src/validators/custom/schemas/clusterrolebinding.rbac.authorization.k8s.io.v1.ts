import type { ClusterRoleBinding } from "kubernetes-types/rbac/v1.d.js";
export type { ClusterRoleBinding } from "kubernetes-types/rbac/v1.d.js";
  
export function isClusterRoleBinding(resource: unknown): resource is ClusterRoleBinding {
  return typeof resource === "object" && (resource as any)?.apiVersion === "rbac.authorization.k8s.io/v1" && (resource as any)?.kind === "ClusterRoleBinding";
}

