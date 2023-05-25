import type { LimitRange } from "kubernetes-types/core/v1.d.js";
export type { LimitRange } from "kubernetes-types/core/v1.d.js";
  
export function isLimitRange(resource: unknown): resource is LimitRange {
  return typeof resource === "object" && (resource as any)?.apiVersion === "v1" && (resource as any)?.kind === "LimitRange";
}

