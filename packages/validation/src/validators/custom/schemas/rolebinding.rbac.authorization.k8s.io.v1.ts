import type { RoleBinding } from "kubernetes-types/rbac/v1.d.js";
export type { RoleBinding } from "kubernetes-types/rbac/v1.d.js";
  
export function isRoleBinding(resource: unknown): resource is RoleBinding {
  return typeof resource === "object" && (resource as any)?.apiVersion === "rbac.authorization.k8s.io/v1" && (resource as any)?.kind === "RoleBinding";
}

