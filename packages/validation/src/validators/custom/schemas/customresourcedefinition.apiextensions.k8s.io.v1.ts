import type { CustomResourceDefinition } from "kubernetes-types/apiextensions/v1.d.js";
export type { CustomResourceDefinition } from "kubernetes-types/apiextensions/v1.d.js";
  
export function isCustomResourceDefinition(resource: unknown): resource is CustomResourceDefinition {
  return typeof resource === "object" && (resource as any)?.apiVersion === "apiextensions.k8s.io/v1" && (resource as any)?.kind === "CustomResourceDefinition";
}

