import type { StorageClass } from "kubernetes-types/storage/v1.d.js";
export type { StorageClass } from "kubernetes-types/storage/v1.d.js";
  
export function isStorageClass(resource: unknown): resource is StorageClass {
  return typeof resource === "object" && (resource as any)?.apiVersion === "storage.k8s.io/v1" && (resource as any)?.kind === "StorageClass";
}

