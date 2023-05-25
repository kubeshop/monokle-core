import type { Ingress } from "kubernetes-types/networking/v1.d.js";
export type { Ingress } from "kubernetes-types/networking/v1.d.js";
  
export function isIngress(resource: unknown): resource is Ingress {
  return typeof resource === "object" && (resource as any)?.apiVersion === "networking.k8s.io/v1" && (resource as any)?.kind === "Ingress";
}

