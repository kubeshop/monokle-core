import { defineRule } from "@monokle/validation/custom";

export const noEmptyAnnotations = defineRule({
  id: "RCA001",
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
