import { RuleMetadata } from "../../common/sarif.js";

export const KUBERNETES_SCHEMA_RULES: RuleMetadata[] = [
  {
    id: "K8S001",
    name: "schema-violated",
    shortDescription: {
      text: "The resource is formatted incorrectly.",
    },
    fullDescription: {
      text: "The resource is violating the schema violation. The Kubernetes API will not accept this resource.",
    },
    help: {
      text: "Check whether the property is used correctly. You can hover the key for documentation.",
    },
  },
];
