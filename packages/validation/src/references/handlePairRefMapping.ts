import {
  RefNode,
  Resource,
  ResourceRefsProcessingConfig,
  ResourceRefType,
} from "../common/types.js";
import { isDefined } from "../utils/isDefined.js";
import { RefMapper } from "./mappers/index.js";
import { createResourceRef, linkResources } from "./utils/createResourceRef.js";
import {
  getResourceRefNodes,
  joinPathParts,
} from "./utils/getResourceNodes.js";
import { isOptionalRef } from "./utils/helpers.js";
import { NodeWrapper } from "./utils/NodeWrapper.js";
import { shouldCreateSatisfiedRef } from "./utils/shouldCreateSatisfiedRef.js";

/**
 * Creates pair resource refs from a specified resource to target resources using the specified refMapper (i.e. selectors)
 */
export function handlePairRefMapping(
  sourceResource: Resource,
  targetResources: Resource[],
  outgoingRefMapper: RefMapper,
  config: ResourceRefsProcessingConfig
) {
  const sourceRefNodes: RefNode[] = [];
  const refNodes = getResourceRefNodes(sourceResource, config);
  if (!refNodes) {
    return;
  }

  Object.values(refNodes)
    .filter(isDefined)
    .flat()
    .forEach(({ scalar, key, parentKeyPath }) => {
      const outgoingRefMapperSourcePath = joinPathParts(
        outgoingRefMapper.source.pathParts
      );
      if (parentKeyPath.endsWith(outgoingRefMapperSourcePath)) {
        sourceRefNodes.push({ scalar, key, parentKeyPath });
      }
    });

  // if no target resources are found, then mark all source ref nodes as unsatisfied
  const { lineCounter: sourceLineCounter } =
    config.parser.parse(sourceResource);

  if (targetResources.length === 0) {
    sourceRefNodes.forEach((sourceRefNode) => {
      createResourceRef(
        sourceResource,
        ResourceRefType.Unsatisfied,
        new NodeWrapper(sourceRefNode.scalar, sourceLineCounter),
        undefined,
        outgoingRefMapper.target.kind
      );
    });
  } else {
    sourceRefNodes.forEach((sourceRefNode) => {
      const foundMatchByTargetResourceId: Record<string, boolean> =
        Object.fromEntries(
          targetResources.map((targetResource) => [targetResource.id, false])
        );

      targetResources.forEach((targetResource) => {
        const targetNodes: RefNode[] = [];
        const targetRefNodes = getResourceRefNodes(targetResource, config);
        if (targetRefNodes) {
          Object.values(targetRefNodes)
            .filter(isDefined)
            .flat()
            .forEach(({ scalar, key, parentKeyPath }) => {
              if (outgoingRefMapper.target.pathParts) {
                const outgoingRefMapperTargetPath = joinPathParts(
                  outgoingRefMapper.target.pathParts
                );
                if (parentKeyPath.endsWith(outgoingRefMapperTargetPath)) {
                  targetNodes.push({ scalar, key, parentKeyPath });
                }
              }
            });
          targetNodes.forEach((targetNode) => {
            if (
              sourceRefNode.key === targetNode.key &&
              shouldCreateSatisfiedRef(
                sourceRefNode,
                targetNode,
                sourceResource,
                targetResource,
                outgoingRefMapper,
                config
              )
            ) {
              const targetLineCounter =
                config.parser.parse(targetResource).lineCounter;

              foundMatchByTargetResourceId[targetResource.id] = true;

              linkResources(
                sourceResource,
                targetResource,
                new NodeWrapper(sourceRefNode.scalar, sourceLineCounter),
                new NodeWrapper(targetNode.scalar, targetLineCounter),
                isOptionalRef(
                  sourceResource,
                  sourceRefNode,
                  outgoingRefMapper,
                  config
                )
              );
            }
          });
        }
      });

      // if this sourceRefNode did not link to any target resource, mark the node as unsatisfied
      const noMatchesFound = Object.values(foundMatchByTargetResourceId).every(
        (foundMatch) => !foundMatch
      );

      if (noMatchesFound) {
        createResourceRef(
          sourceResource,
          ResourceRefType.Unsatisfied,
          new NodeWrapper(sourceRefNode.scalar, sourceLineCounter),
          undefined,
          outgoingRefMapper.target.kind
        );
      }
    });
  }
}
