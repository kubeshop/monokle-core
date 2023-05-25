import type { ServiceAccount } from "kubernetes-types/core/v1.d.js";
export type { ServiceAccount } from "kubernetes-types/core/v1.d.js";
  
export function isServiceAccount(resource: unknown): resource is ServiceAccount {
  return typeof resource === "object" && (resource as any)?.apiVersion === "v1" && (resource as any)?.kind === "ServiceAccount";
}

