import type { CronJob } from "kubernetes-types/batch/v1.d.js";
export type { CronJob } from "kubernetes-types/batch/v1.d.js";
  
export function isCronJob(resource: unknown): resource is CronJob {
  return typeof resource === "object" && (resource as any)?.apiVersion === "batch/v1" && (resource as any)?.kind === "CronJob";
}

