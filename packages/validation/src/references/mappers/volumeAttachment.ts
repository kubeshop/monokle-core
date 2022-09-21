import { explicitNamespaceMatcher, SecretTarget } from "./core.js";
import { RefMapper } from "./mappers.js";

export const volumeAttachmentMappers: RefMapper[] = [
  {
    // https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.22/#azurefilepersistentvolumesource-v1-core
    source: {
      pathParts: ["inlineVolumeSpec", "azureFile", "secretName"],
      siblingMatchers: {
        secretNamespace: explicitNamespaceMatcher,
      },
    },
    type: "name",
    ...SecretTarget,
  },
  {
    // https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.22/#secretreference-v1-core
    source: {
      pathParts: ["secretRef", "name"],
      siblingMatchers: {
        namespace: explicitNamespaceMatcher,
      },
    },
    type: "name",
    ...SecretTarget,
  },
  {
    // https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.22/#azurefilepersistentvolumesource-v1-core
    source: {
      pathParts: ["spec", "azureFile", "secretName"],
      siblingMatchers: {
        secretNamespace: explicitNamespaceMatcher,
      },
    },
    type: "name",
    ...SecretTarget,
  },
];
