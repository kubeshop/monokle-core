import { ValidationRule } from "../../common/sarif.js";

export const LABELS_RULES: ValidationRule[] = [
  {
    id: "LBL001",
    name: "no-empty-labels",
    shortDescription: {
      text: "Cannot find any label.",
    },
    fullDescription: {
      text: "The resource should use labels to easily identify it. Without labels it is difficult to determine source of deployment and ownership.",
    },
    help: {
      text: "Add any label to the Kubernetes resource.",
    },
  },
];
