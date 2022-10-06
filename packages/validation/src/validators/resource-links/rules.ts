import { ValidationRule } from "../../common/sarif.js";

export const RESOURCE_LINK_RULES: ValidationRule[] = [
  {
    id: "LNK001",
    name: "no-missing-links",
    shortDescription: {
      text: "Disallow missing links.",
    },
    fullDescription: {
      text: "The resource has a reference and it cannot be found. This will likely cause problems during deployments.",
    },
    help: {
      text: "Check whether the referenced resource is missing or has a typo. The reference are often to labels or a names which depends on the property.",
    },
  },
];
