import type { EndpointSlice } from "kubernetes-types/discovery/v1.d.js";
export type { EndpointSlice } from "kubernetes-types/discovery/v1.d.js";
  
export function isEndpointSlice(resource: unknown): resource is EndpointSlice {
  return typeof resource === "object" && (resource as any)?.apiVersion === "discovery.k8s.io/v1" && (resource as any)?.kind === "EndpointSlice";
}

