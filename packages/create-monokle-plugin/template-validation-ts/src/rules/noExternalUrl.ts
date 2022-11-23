import { defineRule } from "@monokle/validation/custom";
import { isPrometheus } from "../schemas/__generated__/prometheus.monitoring.coreos.com.v1.js";

/**
 * Example with a CRD.
 *
 * @remark use `npm run codegen` to build the types
 */
export const noExternalUrl = defineRule({
  id: 3,
  description: "Disallow external URLs for Prometheus instances.",
  help: "Remove the externalUrl.",
  validate({ resources }, { report }) {
    for (const resource of resources) {
      if (!isPrometheus(resource.content)) {
        continue;
      }

      if (resource.content.spec.externalUrl !== undefined) {
        report(resource, { path: "spec.externalUrl" });
      }
    }
  },
});
