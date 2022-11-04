import { definePlugin } from "@monokle/validation/custom";
import { noEmptyAnnotations } from "./rules/noEmptyAnnotations.js";
import { noExternalUrl } from "./rules/noExternalUrl.js";
import { sealedSecrets } from "./rules/sealedSecrets.js";

export default definePlugin({
  id: "RCA",
  name: "annotations",
  description: "Validates your annotations",
  rules: {
    noEmptyAnnotations,
    sealedSecrets,
    noExternalUrl,
  },
});
