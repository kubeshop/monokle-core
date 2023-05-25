import type { ResourceQuota } from "kubernetes-types/core/v1.d.js";
export type { ResourceQuota } from "kubernetes-types/core/v1.d.js";
  
export function isResourceQuota(resource: unknown): resource is ResourceQuota {
  return typeof resource === "object" && (resource as any)?.apiVersion === "v1" && (resource as any)?.kind === "ResourceQuota";
}

