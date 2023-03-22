import { RuleMetadata } from "../../common/sarif.js";

export const RESOURCE_LINK_RULES: RuleMetadata[] = [
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
  {
    id: "LNK002",
    name: "no-missing-optional-links",
    shortDescription: {
      text: "Disallow missing optional links.",
    },
    fullDescription: {
      text: "The resource has an optional reference and it cannot be found. This could cause problems during deployments.",
    },
    help: {
      text: "Check whether the referenced resource is missing or has a typo. The reference are often to labels or a names which depends on the property.",
    },
    defaultConfiguration:{
      enabled: false
    }
  },
  {
    id: "LNK003",
    name: "no-missing-owner-references",
    shortDescription: {
      text: "Disallow missing ownerReferences.",
    },
    fullDescription: {
      text: "The resource has an unresolved ownerReference in its metadata secion.",
    },
    help: {
      text: "ownerReferences should only be present in cluster resources - if this is a local file you should remove it, if this" +
        "is in a cluster something seems to have gone wrong in the corresponding operators or Kubernetes itself.",
    }
  },
];
