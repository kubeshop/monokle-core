import type { Service } from "kubernetes-types/core/v1.d.js";
export type { Service } from "kubernetes-types/core/v1.d.js";
  
export function isService(resource: unknown): resource is Service {
  return typeof resource === "object" && (resource as any)?.apiVersion === "v1" && (resource as any)?.kind === "Service";
}

