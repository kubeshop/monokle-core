import type { Job } from "kubernetes-types/batch/v1.d.js";
export type { Job } from "kubernetes-types/batch/v1.d.js";
  
export function isJob(resource: unknown): resource is Job {
  return typeof resource === "object" && (resource as any)?.apiVersion === "batch/v1" && (resource as any)?.kind === "Job";
}

