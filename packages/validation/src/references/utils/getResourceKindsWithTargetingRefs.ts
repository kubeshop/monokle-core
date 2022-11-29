import { KNOWN_RESOURCE_KINDS } from "../../utils/knownResourceKinds.js";
import { getOutgoingRefMappers } from "../mappers/index.js";
import { refMapperMatchesKind } from "./refMatcher.js";

const targetResourceKindCache = new Map<string, string[]>();

/**
 * Returns all resource kinds that could potentially link to the specified kind.
 */
export function getResourceKindsWithTargetingRefs(kind: string): string[] {
  if (!targetResourceKindCache.has(kind)) {
    const resourceKinds = KNOWN_RESOURCE_KINDS.filter((knownKind) => {
      const mappers = getOutgoingRefMappers(knownKind);
      return mappers.some((m) => refMapperMatchesKind(m, kind));
    });

    targetResourceKindCache.set(kind, resourceKinds);
  }
  return targetResourceKindCache.get(kind) ?? [];
}
