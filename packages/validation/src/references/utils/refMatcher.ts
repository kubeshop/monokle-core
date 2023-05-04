import type {RefMapper} from '../mappers/mappers.js';

export function refMapperMatchesKind(refMapper: RefMapper, kind: string) {
  if (kind && refMapper.target.kind.startsWith('$')) {
    return kind.match(refMapper.target.kind.substring(1)) !== null;
  }

  return refMapper.target.kind === kind;
}
