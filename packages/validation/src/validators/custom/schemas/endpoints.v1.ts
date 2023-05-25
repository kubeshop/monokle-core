import type { Endpoints } from "kubernetes-types/core/v1.d.js";
export type { Endpoints } from "kubernetes-types/core/v1.d.js";
  
export function isEndpoints(resource: unknown): resource is Endpoints {
  return typeof resource === "object" && (resource as any)?.apiVersion === "v1" && (resource as any)?.kind === "Endpoints";
}

