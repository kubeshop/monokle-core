import { Resource, ResourceRefType } from "../../common/types.js";
import { areRefPosEqual } from "./helpers.js";
import { NodeWrapper } from "./NodeWrapper.js";

/**
 * Adds a resource ref with the specified type/target to the specified resource
 */
export function createResourceRef(
  resource: Resource,
  refType: ResourceRefType,
  refNode?: NodeWrapper,
  targetResourceId?: string,
  targetResourceKind?: string,
  isOptional?: boolean
) {
  if (!refNode && !targetResourceId) {
    // eslint-disable-next-line no-console
    console.warn(
      `missing both refNode and targetResource for refType ${refType} on resource ${resource.filePath}`
    );
    return;
  }

  if (!resource.refs) {
    resource.refs = [];
  }

  const refName =
    (refNode ? refNode.nodeValue() : targetResourceId) || "<missing>";

  // make sure we don't duplicate
  if (
    !resource.refs.some(
      (ref) =>
        ref.type === refType &&
        ref.name === refName &&
        ref.target?.type === "resource" &&
        ref.target.resourceId === targetResourceId &&
        areRefPosEqual(ref.position, refNode?.getNodePosition())
    )
  ) {
    resource.refs.push({
      type: refType,
      name: refName,
      position: refNode?.getNodePosition(),
      target: {
        type: "resource",
        resourceId: targetResourceId,
        resourceKind: targetResourceKind?.startsWith("$")
          ? undefined
          : targetResourceKind,
        isOptional,
      },
    });
  }
}

export function linkResources(
  source: Resource,
  target: Resource,
  sourceRef: NodeWrapper,
  targetRef?: NodeWrapper,
  isOptional?: boolean
) {
  createResourceRef(
    source,
    ResourceRefType.Outgoing,
    sourceRef,
    target.id,
    target.kind,
    isOptional
  );
  createResourceRef(
    target,
    ResourceRefType.Incoming,
    targetRef,
    source.id,
    source.kind,
    isOptional
  );
}
