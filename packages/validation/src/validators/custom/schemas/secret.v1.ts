import type { Secret } from "kubernetes-types/core/v1.d.js";
export type { Secret } from "kubernetes-types/core/v1.d.js";
  
export function isSecret(resource: unknown): resource is Secret {
  return typeof resource === "object" && (resource as any)?.apiVersion === "v1" && (resource as any)?.kind === "Secret";
}

