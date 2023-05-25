import type { DaemonSet } from "kubernetes-types/apps/v1.d.js";
export type { DaemonSet } from "kubernetes-types/apps/v1.d.js";
  
export function isDaemonSet(resource: unknown): resource is DaemonSet {
  return typeof resource === "object" && (resource as any)?.apiVersion === "apps/v1" && (resource as any)?.kind === "DaemonSet";
}

