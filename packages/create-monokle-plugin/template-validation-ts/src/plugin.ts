import { definePlugin } from "@monokle/validation/custom";
import { noEmptyAnnotations } from "./rules/noEmptyAnnotations.js";
import { noExternalUrl } from "./rules/noExternalUrl.js";
import { sealedSecrets } from "./rules/sealedSecrets.js";

export default definePlugin({
  id: "YCP",
  name: "Your custom plugin",
  description: "Welcome to your first plugin!",
  rules: {
    noEmptyAnnotations,
    sealedSecrets,
    noExternalUrl,
  },
});
