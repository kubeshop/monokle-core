import { ValidationRule } from "../../common/sarif.js";

export const KUBERNETES_SCHEMA_RULES: ValidationRule[] = [
  {
    id: "K8S001",
    name: "SCHEMA_VIOLATED",
    shortDescription: {
      text: "The resource is formated incorrectly.",
    },
    fullDescription: {
      text: "The resource is violating the schema violation. The Kubernetes API will not accept this resource.",
    },
    help: {
      text: "Check whether the property is used correctly. You can hover the key for documentation.",
    },
  },
];
