import {
  RefNode,
  Resource,
  ResourceRefsProcessingConfig,
} from "../../common/types.js";
import { RefMapper } from "../mappers/index.js";
import { joinPathParts, getResourceRefNodes } from "./getResourceNodes.js";

export function getSiblingValues(
  outgoingRefMapper: RefMapper,
  sourceResource: Resource,
  sourceRefNode: RefNode,
  config: ResourceRefsProcessingConfig
) {
  const siblingValues: Record<string, any> = {};
  if (outgoingRefMapper.source.siblingMatchers) {
    Object.keys(outgoingRefMapper.source.siblingMatchers).forEach((key) => {
      const value = getSiblingValue(
        key,
        outgoingRefMapper,
        sourceResource,
        sourceRefNode,
        config
      );
      siblingValues[key] = value;
    });
  }

  siblingValues[sourceRefNode.key] = sourceRefNode.scalar.value;
  return siblingValues;
}

/**
 * Returns the value of the named sibling to the sourceRefNode
 */
export function getSiblingValue(
  name: string,
  outgoingRefMapper: RefMapper,
  sourceResource: Resource,
  sourceRefNode: RefNode,
  config: ResourceRefsProcessingConfig
) {
  const siblingPath = joinPathParts([
    ...outgoingRefMapper.source.pathParts.slice(0, -1),
    name,
  ]);

  const refNodes = getResourceRefNodes(sourceResource, config);
  const matchingRefNodes = refNodes ? refNodes[siblingPath] : undefined;

  const siblingRefNodes = matchingRefNodes?.filter((refNode) =>
    refNode.parentKeyPath.startsWith(sourceRefNode.parentKeyPath)
  );
  return siblingRefNodes && siblingRefNodes.length > 0
    ? siblingRefNodes[0].scalar.value
    : undefined;
}
