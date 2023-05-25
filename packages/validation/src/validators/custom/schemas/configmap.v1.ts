import type { ConfigMap } from "kubernetes-types/core/v1.d.js";
export type { ConfigMap } from "kubernetes-types/core/v1.d.js";
  
export function isConfigMap(resource: unknown): resource is ConfigMap {
  return typeof resource === "object" && (resource as any)?.apiVersion === "v1" && (resource as any)?.kind === "ConfigMap";
}

