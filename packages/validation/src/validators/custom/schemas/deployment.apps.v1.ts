import type { Deployment } from "kubernetes-types/apps/v1.d.js";
export type { Deployment } from "kubernetes-types/apps/v1.d.js";
  
export function isDeployment(resource: unknown): resource is Deployment {
  return typeof resource === "object" && (resource as any)?.apiVersion === "apps/v1" && (resource as any)?.kind === "Deployment";
}

