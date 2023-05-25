import type { Pod } from "kubernetes-types/core/v1.d.js";
export type { Pod } from "kubernetes-types/core/v1.d.js";
  
export function isPod(resource: unknown): resource is Pod {
  return typeof resource === "object" && (resource as any)?.apiVersion === "v1" && (resource as any)?.kind === "Pod";
}

