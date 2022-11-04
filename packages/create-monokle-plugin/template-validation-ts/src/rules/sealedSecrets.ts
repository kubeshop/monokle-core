import { defineRule } from "@monokle/validation/custom";

export const sealedSecrets = defineRule({
  id: "RCA003",
  description: "Disallow default Kubernetes secrets.",
  fullDescription:
    "Kubernetes secrets are base64 encoded and you can easily retrieve the secret value. Instead you should use a SealedSecret which encrypts the secret so that it can safely be committed to your repository.",
  help: "Use a SealedSecret instead of a default Kubernetes secret.",
  validate({ resources }, { report }) {
    resources
      .filter((r) => r.kind === "Secret")
      .forEach((resource) => {
        return report(resource, { path: "kind" });
      });
  },
});
