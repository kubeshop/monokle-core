import type { Role } from "kubernetes-types/rbac/v1.d.js";
export type { Role } from "kubernetes-types/rbac/v1.d.js";
  
export function isRole(resource: unknown): resource is Role {
  return typeof resource === "object" && (resource as any)?.apiVersion === "rbac.authorization.k8s.io/v1" && (resource as any)?.kind === "Role";
}

