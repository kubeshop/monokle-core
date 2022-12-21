import { definePlugin } from "@monokle/plugin-toolkit";
import { noEmptyAnnotations } from "./rules/1-example.js";

export default definePlugin({
  id: "YCP",
  name: "ycp",
  displayName: "Your custom plugin",
  description: "Welcome to your first plugin!",
  rules: {
    noEmptyAnnotations
  },
});
