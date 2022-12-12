import { definePlugin } from "@monokle/plugin-toolkit";
import { noEmptyAnnotations } from "./rules/1-example.js";
import { noAdminApi } from "./rules/3-exampleCrd.js";
import { noPortMismatch } from "./rules/2-exampleRelated.js";
import { noLatestImage } from "./rules/4-examplePod.js";

export default definePlugin({
  id: "YCP",
  name: "Your custom plugin",
  description: "Welcome to your first plugin!",
  rules: {
    noEmptyAnnotations,
    noPortMismatch,
    noAdminApi,
    noLatestImage,
  },
});
