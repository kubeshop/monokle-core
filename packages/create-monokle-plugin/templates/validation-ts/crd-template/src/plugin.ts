import { definePlugin } from "@monokle/plugin-toolkit";
import { noAdminApi } from "./rules/1-exampleCrd.js";

export default definePlugin({
  id: "YCP",
  name: "ycp",
  displayName: "Sample CRD plugin",
  description: "Welcome to your first plugin!",
  rules: {
    noAdminApi,
  },
});
