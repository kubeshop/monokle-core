import type { ReplicationController } from "kubernetes-types/core/v1.d.js";
export type { ReplicationController } from "kubernetes-types/core/v1.d.js";
  
export function isReplicationController(resource: unknown): resource is ReplicationController {
  return typeof resource === "object" && (resource as any)?.apiVersion === "v1" && (resource as any)?.kind === "ReplicationController";
}

