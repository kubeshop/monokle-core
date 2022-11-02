import { definePlugin } from "../custom/config.js";
import { noEmptyLabels } from "./noEmptyLabels.js";

export default definePlugin({
  id: "LBL",
  name: "labels",
  description: "Validates your labels",
  rules: {
    noEmptyLabels,
  },
});
