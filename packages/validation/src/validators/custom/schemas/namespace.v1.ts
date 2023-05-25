import type { Namespace } from "kubernetes-types/core/v1.d.js";
export type { Namespace } from "kubernetes-types/core/v1.d.js";
  
export function isNamespace(resource: unknown): resource is Namespace {
  return typeof resource === "object" && (resource as any)?.apiVersion === "v1" && (resource as any)?.kind === "Namespace";
}

