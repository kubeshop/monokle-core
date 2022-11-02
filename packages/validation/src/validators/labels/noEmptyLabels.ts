import { defineRule } from "../custom/config.js";

export const noEmptyLabels = defineRule({
  id: "CLB001",
  description: "Require labels as metadata.",
  help: "Add any label to the Kubernetes resource.",
  validate({ resources }, { report }) {
    resources.forEach((resource) => {
      const labels = Object.entries(resource.content.metadata?.labels ?? {});
      const hasLabels = labels.length > 0;

      if (!hasLabels) {
        report(resource, { path: "metadata.labels" });
      }
    });
  },
});
