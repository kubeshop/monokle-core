import type { VolumeAttachment } from "kubernetes-types/storage/v1.d.js";
export type { VolumeAttachment } from "kubernetes-types/storage/v1.d.js";
  
export function isVolumeAttachment(resource: unknown): resource is VolumeAttachment {
  return typeof resource === "object" && (resource as any)?.apiVersion === "storage.k8s.io/v1" && (resource as any)?.kind === "VolumeAttachment";
}

