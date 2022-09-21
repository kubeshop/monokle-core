import { Resource } from "../../common/types.js";
import { RefMapper, SiblingMatcher } from "./mappers.js";

export const ConfigMapTarget = {
  target: {
    kind: "ConfigMap",
  },
};

export const SecretTarget = {
  target: {
    kind: "$(Secret|SealedSecret)",
  },
};

export const ServiceAccountTarget = {
  target: {
    kind: "ServiceAccount",
  },
};

export const PersistentVolumeClaimTarget = {
  target: {
    kind: "PersistentVolumeClaim",
  },
};

/**
 * Matcher that ensures the source and target namespace are the same
 */
export function implicitNamespaceMatcher(
  sourceResource: Resource,
  targetResource: Resource
) {
  return targetResource.namespace === sourceResource.namespace;
}

/**
 * Matcher the ensures that the target resource has an optionally specified namespace
 */
export const optionalExplicitNamespaceMatcher: SiblingMatcher = (
  source,
  target,
  value
) => {
  if (value) {
    return target.namespace === value;
  }

  return target.namespace === source.namespace;
};

/**
 * Matcher the ensures that the target resource has the specified namespace
 */

export const explicitNamespaceMatcher: SiblingMatcher = (
  _source,
  target,
  value
) => {
  return target.namespace === value;
};

/**
 * Matcher the ensures that the target resource has the specified kind
 */
export const targetKindMatcher: SiblingMatcher = (_source, target, value) => {
  return target.kind === value;
};

/**
 * Matcher the ensures that the target resource has the specified apiGroup - uses an optional defaultGroup configuration
 * property if no group is found
 */
export const targetGroupMatcher: SiblingMatcher = (
  source,
  target,
  value,
  siblingValues,
  properties
) => {
  if (!value && properties && properties.defaultGroup) {
    value = String(properties.defaultGroup);
  }
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return target.apiVersion.startsWith(`${value}/`);
};

export function createPodSelectorOutgoingRefMappers(
  selectorPathParts?: string[]
): RefMapper[] {
  return [
    createSelectorOutgoingRefMappers(
      "$(Pod|DaemonSet|Deployment|Job|ReplicaSet|ReplicationController|StatefulSet)",
      selectorPathParts
    ),
  ];
}

export function createSelectorOutgoingRefMappers(
  targetResourceKind: string,
  selectorPathParts?: string[]
): RefMapper {
  return {
    source: {
      pathParts:
        selectorPathParts && selectorPathParts.length > 0
          ? selectorPathParts
          : ["spec", "selector"],
    },
    target: {
      kind: targetResourceKind,
      pathParts: ["metadata", "labels"],
    },
    type: "pairs",
  };
}
