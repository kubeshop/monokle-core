import { definePlugin } from "../custom/config.js";
import { noEmptyLabels } from "./noEmptyLabels.js";

export default definePlugin({
  id: "CLB",
  name: "labels",
  description: "Validates your labels",
  rules: {
    noEmptyLabels,
  },
});
