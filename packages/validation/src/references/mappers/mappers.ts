import { JsonObject } from "type-fest";
import { createPodSelectorOutgoingRefMappers } from "./core.js";
import { podMappers } from "./pod.js";
import { serviceAccountMapper } from "./serviceAccount.js";
import { persistentVolumeMapper } from "./persistentVolume.js";
import { roleBindingMappers } from "./roleBinding.js";
import { clusterRoleBindingMappers } from "./clusterRoleBinding.js";
import { volumeAttachmentMappers } from "./volumeAttachment.js";
import { KnownResourceKinds } from "../../utils/knownResourceKinds.js";
import { endpointsMappers } from "./endpoints.js";
import { endpointSliceMappers } from "./endpointSlice.js";
import { Resource } from "../../common/types.js";
import { isDefined } from "../../utils/isDefined.js";
import { ownerReferenceMapper } from "./ownerReference";

export type SiblingMatcher = (
  source: Resource,
  target: Resource,
  value: string | undefined, // the actual value of the property to be matched
  siblingValues: Record<string, string>, // a map of all sibling property values
  properties?: JsonObject // optional configuration properties passed to matcher (see below)
) => boolean; // function that controls if the specified value

type RefSource = {
  pathParts: string[];

  // sibling matchers that will be used to validate this ref, maps the name of a sibling property to
  // a function that validates if the corresponding property value is a valid match
  siblingMatchers?: Record<string, SiblingMatcher>; // name of the property to match, for example 'kind'

  // optional matcher configuration properties that will be passed to each correspondingly named matcher
  matcherProperties?: Record<string, JsonObject>;

  // optionally checks for an 'optional' sibling to validate ref
  isOptional?: boolean;
};

type RefTarget = {
  kind: string;
  pathParts?: string[];
};

/**
 * Type is used when
 *
 * @types
 * - path: can be used within Kustomization to refer to other files/directories
 * - pairs: Used for label selectors
 * - image: used for Docker images
 * - name: Used for everything else
 */
export type RefMapper = {
  type: "path" | "name" | "pairs" | "image";
  source: RefSource;
  target: RefTarget;

  // called to validate if an unsatisfied ref should be created for this mapper
  shouldCreateUnsatisfiedRef?: (
    refMapper: RefMapper,
    sourceResource: Resource,
    siblingValues: Record<string, string>
  ) => boolean;
};

export function getOutgoingRefMappers(kind: string): RefMapper[] {
  var mappers = OUTGOING_MAPPERS_BY_KIND[kind as KnownResourceKinds] ?? [];

  // always add ownerReferenceMapper
  return [ownerReferenceMapper, ...mappers]
}

export const OUTGOING_MAPPERS_BY_KIND: Partial<
  Record<KnownResourceKinds, RefMapper[] | undefined>
> = {
  Deployment: [...podMappers],
  DaemonSet: [...podMappers],
  CronJob: [...podMappers],
  Job: [...podMappers],
  Pod: [...podMappers],
  StatefulSet: [...podMappers],
  ReplicaSet: [...podMappers],
  ReplicationController: [...podMappers],
  ServiceAccount: serviceAccountMapper,
  PersistentVolume: persistentVolumeMapper,
  RoleBinding: roleBindingMappers,
  ClusterRoleBinding: clusterRoleBindingMappers,
  VolumeAttachment: volumeAttachmentMappers,
  Endpoints: endpointsMappers,
  EndpointSlice: endpointSliceMappers,
  Service: createPodSelectorOutgoingRefMappers(),
  Ingress: [
    {
      type: "name",
      source: { pathParts: ["backend", "service", "name"] },
      target: { kind: "Service" },
    },
  ],
  Secret: [
    {
      type: "name",
      source: {
        pathParts: [
          "metadata",
          "annotations",
          "kubernetes.io/service-account.name",
        ],
      },
      target: { kind: "ServiceAccount" },

      shouldCreateUnsatisfiedRef: (refMapper, sourceResource, values) => {
        return values["kubernetes.io/service-account.name"] !== "default";
      },
    },
  ],
  NetworkPolicy: createPodSelectorOutgoingRefMappers([
    "podSelector",
    "matchLabels",
  ]),
  PersistentVolumeClaim: [
    {
      type: "name",
      source: { pathParts: ["spec", "volumeName"] },
      target: { kind: "PersistentVolume" },
    },
  ],
};

export const OUTGOING_MAPPERS = Object.values(OUTGOING_MAPPERS_BY_KIND)
  .filter(isDefined)
  .flat();
