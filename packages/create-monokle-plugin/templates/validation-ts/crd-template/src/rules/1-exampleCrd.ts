import { defineRule } from "@monokle/plugin-toolkit";
import { isPrometheus } from "../schemas/__generated__/prometheus.monitoring.coreos.com.v1.js";

/**
 * Example with a CRD.
 *
 * @remark use `npm run codegen` to build the types
 */
export const noAdminApi = defineRule({
  id: 1,
  description: "Disallow the admin API for Prometheus instances.",
  help: "Do not set enabledAdminAPI to true.",
  validate({ resources }, { report }) {
    resources.filter(isPrometheus).forEach((prometheus) => {
      const valid = prometheus.spec.enableAdminAPI !== true;
      if (valid) return;
      report(prometheus, { path: "spec.enableAdminAPI" });
    });
  },
});
