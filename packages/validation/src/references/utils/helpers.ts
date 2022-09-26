import {
  ResourceRefType,
  ResourceRef,
  RefPosition,
  RefNode,
  Resource,
  ResourceRefsProcessingConfig,
} from "../../common/types.js";
import { RefMapper } from "../mappers/index.js";
import { getSiblingValue } from "./GetSiblings.js";

export function refMapperMatchesKind(refMapper: RefMapper, kind: string) {
  if (refMapper.target.kind.startsWith("$")) {
    return kind.match(refMapper.target.kind.substring(1)) !== null;
  }

  return refMapper.target.kind === kind;
}

export function isIncomingRef(refType: ResourceRefType) {
  return refType === ResourceRefType.Incoming;
}

export function isOutgoingRef(refType: ResourceRefType) {
  return refType === ResourceRefType.Outgoing;
}

export function isUnsatisfiedRef(refType: ResourceRefType) {
  return refType === ResourceRefType.Unsatisfied;
}

export function hasIncomingRefs(resource: Resource) {
  return resource.refs?.some((e) => isIncomingRef(e.type));
}

export function isFileRef(ref: ResourceRef) {
  return ref.target?.type === "file";
}

export function isResourceRef(ref: ResourceRef) {
  return ref.target?.type === "resource";
}

export function isResourceRefTo(ref: ResourceRef, resourceId: string) {
  return (
    ref.target?.type === "resource" && ref.target.resourceId === resourceId
  );
}

export function hasOutgoingRefs(resource: Resource) {
  return resource.refs?.some((e) => isOutgoingRef(e.type));
}

export function hasRefs(resource: Resource) {
  return resource.refs?.some((e) => isOutgoingRef(e.type));
}

export function hasUnsatisfiedRefs(resource: Resource) {
  return resource.refs?.some((e) => isUnsatisfiedRef(e.type));
}

export function areRefPosEqual(
  a: RefPosition | undefined,
  b: RefPosition | undefined
) {
  if (a === undefined && b === undefined) {
    return true;
  }
  if (!a || !b) {
    return false;
  }
  return a.line === b.line && a.column === b.column && a.length === b.length;
}

/**
 * Checks if the specified ref has an optional property set to true
 */
export function isOptionalRef(
  sourceResource: Resource,
  sourceRefNode: RefNode,
  outgoingRefMapper: RefMapper,
  config: ResourceRefsProcessingConfig
): boolean | undefined {
  return outgoingRefMapper.source.isOptional
    ? Boolean(
        getSiblingValue(
          "optional",
          outgoingRefMapper,
          sourceResource,
          sourceRefNode,
          config
        )
      )
    : false;
}
