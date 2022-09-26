import {
  RefNode,
  Resource,
  ResourceRefsProcessingConfig,
} from "../../common/types.js";
import { RefMapper } from "../mappers/index.js";
import { getSiblingValues } from "./GetSiblings.js";

/**
 * Checks if the nodes and eventual namespace descriminators match
 */
export function shouldCreateSatisfiedRef(
  sourceRefNode: RefNode,
  targetNode: RefNode | undefined,
  sourceResource: Resource,
  targetResource: Resource,
  outgoingRefMapper: RefMapper,
  config: ResourceRefsProcessingConfig
) {
  if (targetNode && sourceRefNode.scalar.value !== targetNode.scalar.value) {
    return false;
  }

  // check with existing sibling matchers
  if (outgoingRefMapper.source.siblingMatchers) {
    // first collect all sibling values so we can pass them to each matcher
    const siblingValues = getSiblingValues(
      outgoingRefMapper,
      sourceResource,
      sourceRefNode,
      config
    );

    // now query each sibling matcher with all found sibling values and optional matcherProperties
    if (
      Object.entries(outgoingRefMapper.source.siblingMatchers).some(
        ([key, matcher]) => {
          const isMatch = matcher(
            sourceResource,
            targetResource,
            siblingValues[key],
            siblingValues,
            outgoingRefMapper.source.matcherProperties
              ? outgoingRefMapper.source.matcherProperties[key]
              : undefined
          );
          return !isMatch;
        }
      )
    ) {
      return false;
    }
  }

  return true;
}
