import {
  ConfigMapTarget,
  explicitNamespaceMatcher,
  implicitNamespaceMatcher,
  optionalExplicitNamespaceMatcher,
  PersistentVolumeClaimTarget,
  SecretTarget,
  ServiceAccountTarget,
} from "./core.js";
import { RefMapper } from "./mappers.js";

export const podMappers: RefMapper[] = [
  {
    source: {
      pathParts: ["selector", "matchLabels"],
    },
    target: {
      kind: "$(DaemonSet|Deployment|Job|ReplicaSet|ReplicationController|StatefulSet)",
      pathParts: ["template", "metadata", "labels"],
    },
    type: "pairs",
  },
  {
    source: {
      pathParts: ["selector", "matchLabels"],
    },
    target: {
      kind: "Pod",
      pathParts: ["metadata", "labels"],
    },
    type: "pairs",
  },
  {
    source: {
      pathParts: ["configMapRef", "name"],
      isOptional: true,
    },
    type: "name",
    ...ConfigMapTarget,
  },
  {
    source: {
      pathParts: ["configMapKeyRef", "name"],
      isOptional: true,
    },
    type: "name",
    ...ConfigMapTarget,
  },
  {
    source: {
      pathParts: ["volumes", "*", "configMap", "name"],
      isOptional: true,
    },
    type: "name",
    ...ConfigMapTarget,
  },
  {
    // https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.22/#secretvolumesource-v1-core
    source: {
      pathParts: ["volumes", "*", "secret", "secretName"],
      isOptional: true,
    },
    type: "name",
    ...SecretTarget,
  },
  {
    // https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.22/#secretprojection-v1-core
    source: {
      pathParts: ["sources", "*", "secret", "name"],
      isOptional: true,
    },
    type: "name",
    ...SecretTarget,
  },
  {
    // secretRefs can be one of https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.22/#objectreference-v1-core (with namespace)
    // or https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.22/#secretreference-v1-core (with namespace)
    // or https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.22/#localobjectreference-v1-core (without namespace)
    source: {
      pathParts: ["secretRef", "name"],
      siblingMatchers: {
        namespace: optionalExplicitNamespaceMatcher,
      },
    },
    type: "name",
    ...SecretTarget,
  },
  {
    // https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.22/#secretreference-v1-core (with namespace)
    source: {
      pathParts: ["controllerExpandSecretRef", "name"],
      siblingMatchers: {
        namespace: explicitNamespaceMatcher,
      },
    },
    type: "name",
    ...SecretTarget,
  },
  {
    // https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.22/#secretreference-v1-core (with namespace)
    source: {
      pathParts: ["controllerPublishSecretRef", "name"],
      siblingMatchers: {
        namespace: explicitNamespaceMatcher,
      },
    },
    type: "name",
    ...SecretTarget,
  },
  {
    // https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.22/#secretreference-v1-core (with namespace)
    source: {
      pathParts: ["nodePublishSecretRef", "name"],
      siblingMatchers: {
        namespace: explicitNamespaceMatcher,
      },
    },
    type: "name",
    ...SecretTarget,
  },
  {
    // https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.22/#secretreference-v1-core (with namespace)
    source: {
      pathParts: ["nodeStageSecretRef", "name"],
      siblingMatchers: {
        namespace: explicitNamespaceMatcher,
      },
    },
    type: "name",
    ...SecretTarget,
  },
  {
    source: {
      pathParts: ["secretKeyRef", "name"],
      isOptional: true,
    },
    type: "name",
    ...SecretTarget,
  },
  {
    source: {
      pathParts: ["imagePullSecrets", "*", "name"],
      siblingMatchers: {
        namespace: implicitNamespaceMatcher,
      },
    },
    type: "name",
    ...SecretTarget,
  },
  {
    source: {
      pathParts: ["serviceAccountName"],
    },
    type: "name",
    ...ServiceAccountTarget,

    shouldCreateUnsatisfiedRef: (refMapper, sourceResource, values) => {
      return values["serviceAccountName"] !== "default";
    },
  },
  {
    // https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.22/#persistentvolumeclaimvolumesource-v1-core
    source: {
      pathParts: ["persistentVolumeClaim", "claimName"],
      siblingMatchers: {
        namespace: implicitNamespaceMatcher,
      },
    },
    type: "name",
    ...PersistentVolumeClaimTarget,
  },
  {
    type: "image",
    source: {
      pathParts: ["image"],
    },
    target: {
      kind: "monokle://image", // this is not used (maybe needs a refactor later on to make the target optional)
    },
  },
];
