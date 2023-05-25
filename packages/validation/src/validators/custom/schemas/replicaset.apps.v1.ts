import type { ReplicaSet } from "kubernetes-types/apps/v1.d.js";
export type { ReplicaSet } from "kubernetes-types/apps/v1.d.js";
  
export function isReplicaSet(resource: unknown): resource is ReplicaSet {
  return typeof resource === "object" && (resource as any)?.apiVersion === "apps/v1" && (resource as any)?.kind === "ReplicaSet";
}

