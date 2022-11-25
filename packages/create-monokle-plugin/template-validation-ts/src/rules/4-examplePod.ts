import { defineRule } from "@monokle/validation/custom";
import { validatePodSpec } from "../utils.js";

/**
 * Example validation of pod in depoyment, statefulset, job, etc.
 *
 * @remark use `npm run codegen` to build the types
 */
export const noLatestImage = defineRule({
  id: 4,
  description: "Disallow images with the latest tag.",
  fullDescription:
    "The latest image makes it difficult to know which version is exactly running which might introduce subtle bugs or run a version that is vulnerable.",
  help: "Pin the exact version of the image.",
  validate({ resources }, { report }) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      pod.initContainers?.forEach((container, index) => {
        const valid = !container.image?.endsWith("latest");
        if (valid) return;

        report(resource, {
          path: `${prefix}.initContainers.${index}.image`,
        });
      });

      pod.containers.forEach((container, index) => {
        const valid = !container.image?.endsWith("latest");
        if (valid) return;

        report(resource, {
          path: `${prefix}.containers.${index}.image`,
        });
      });
    });
  },
});
