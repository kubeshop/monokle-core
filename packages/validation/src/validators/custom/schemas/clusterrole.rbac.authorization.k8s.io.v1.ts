import type { ClusterRole } from "kubernetes-types/rbac/v1.d.js";
export type { ClusterRole } from "kubernetes-types/rbac/v1.d.js";
  
export function isClusterRole(resource: unknown): resource is ClusterRole {
  return typeof resource === "object" && (resource as any)?.apiVersion === "rbac.authorization.k8s.io/v1" && (resource as any)?.kind === "ClusterRole";
}

