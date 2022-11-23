import { defineRule } from "@monokle/validation/custom";

/**
 * A basic example.
 */
export const noEmptyAnnotations = defineRule({
  id: 1,
  description: "Require annotations as metadata.",
  help: "Add any annotation to the Kubernetes resource.",
  validate({ resources }, { report }) {
    resources.forEach((resource) => {
      const annotations = Object.entries(
        resource.content.metadata?.annotations ?? {}
      );
      const hasAnnotations = annotations.length > 1;

      if (!hasAnnotations) {
        report(resource, { path: "metadata.annotations" });
      }
    });
  },
});
