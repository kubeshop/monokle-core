import { Resource } from "../../common/types.js";
import { getOutgoingRefMappers, OUTGOING_MAPPERS, RefMapper } from "../mappers/index.js";
import { refMapperMatchesKind } from "./helpers.js";

const refMapperCache = new Map<string, RefMapper[]>();
const incomingRefMappersCache = new Map<string, RefMapper[]>();

/**
 * Cache of refMappers for a specific resource kind
 */
export function getRefMappers(resource: Resource): RefMapper[] {
  const cachedMappers = refMapperCache.get(resource.kind);

  if (cachedMappers) {
    return cachedMappers;
  }

  const outgoingRefMappers = getOutgoingRefMappers(resource.kind);
  const incomingRefMappers = getIncomingRefMappers(resource.kind);
  const mappers = [...incomingRefMappers, ...outgoingRefMappers];

  refMapperCache.set(resource.kind, mappers);

  return refMapperCache.get(resource.kind) || [];
}

export function getIncomingRefMappers(kind: string): RefMapper[] {
  const cachedMappers = incomingRefMappersCache.get(kind);

  if (cachedMappers) {
    return cachedMappers;
  }

  const mappers = OUTGOING_MAPPERS.filter((outgoingMapper) =>
    refMapperMatchesKind(outgoingMapper, kind)
  );

  incomingRefMappersCache.set(kind, mappers);

  return mappers;
}
