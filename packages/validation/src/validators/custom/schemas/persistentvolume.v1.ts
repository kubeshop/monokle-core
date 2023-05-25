import type { PersistentVolume } from "kubernetes-types/core/v1.d.js";
export type { PersistentVolume } from "kubernetes-types/core/v1.d.js";
  
export function isPersistentVolume(resource: unknown): resource is PersistentVolume {
  return typeof resource === "object" && (resource as any)?.apiVersion === "v1" && (resource as any)?.kind === "PersistentVolume";
}

