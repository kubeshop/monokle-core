import { definePlugin } from "@monokle/validation/custom";
import { noEmptyAnnotations } from "./rules/noEmptyAnnotations.js";

export default definePlugin({
  id: "RCA",
  name: "annotations",
  description: "Validates your annotations",
  rules: {
    noEmptyAnnotations,
  },
});
