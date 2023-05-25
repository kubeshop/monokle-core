import type { StatefulSet } from "kubernetes-types/apps/v1.d.js";
export type { StatefulSet } from "kubernetes-types/apps/v1.d.js";
  
export function isStatefulSet(resource: unknown): resource is StatefulSet {
  return typeof resource === "object" && (resource as any)?.apiVersion === "apps/v1" && (resource as any)?.kind === "StatefulSet";
}

