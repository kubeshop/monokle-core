import type { PersistentVolumeClaim } from "kubernetes-types/core/v1.d.js";
export type { PersistentVolumeClaim } from "kubernetes-types/core/v1.d.js";
  
export function isPersistentVolumeClaim(resource: unknown): resource is PersistentVolumeClaim {
  return typeof resource === "object" && (resource as any)?.apiVersion === "v1" && (resource as any)?.kind === "PersistentVolumeClaim";
}

