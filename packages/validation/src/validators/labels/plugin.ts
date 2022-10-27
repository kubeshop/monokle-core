import { definePlugin } from "../custom/config.js";
import { noEmptyLabels } from "./noEmptyLabels.js";

export default definePlugin("labels", {
  description: "Validates your labels",
  rules: {
    noEmptyLabels,
  },
});
