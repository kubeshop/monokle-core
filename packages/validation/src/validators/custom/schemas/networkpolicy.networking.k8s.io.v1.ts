import type { NetworkPolicy } from "kubernetes-types/networking/v1.d.js";
export type { NetworkPolicy } from "kubernetes-types/networking/v1.d.js";
  
export function isNetworkPolicy(resource: unknown): resource is NetworkPolicy {
  return typeof resource === "object" && (resource as any)?.apiVersion === "networking.k8s.io/v1" && (resource as any)?.kind === "NetworkPolicy";
}

