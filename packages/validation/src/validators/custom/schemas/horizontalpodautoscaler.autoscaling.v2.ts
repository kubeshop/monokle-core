import type { HorizontalPodAutoscaler } from "kubernetes-types/autoscaling/v2.d.js";
export type { HorizontalPodAutoscaler } from "kubernetes-types/autoscaling/v2.d.js";
  
export function isHorizontalPodAutoscaler(resource: unknown): resource is HorizontalPodAutoscaler {
  return typeof resource === "object" && (resource as any)?.apiVersion === "autoscaling/v2" && (resource as any)?.kind === "HorizontalPodAutoscaler";
}

