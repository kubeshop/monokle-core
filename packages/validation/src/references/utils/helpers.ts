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
import { LineCounter, parseDocument } from "yaml";
import path from "path";

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

// some (older) kustomization yamls don't contain kind/group properties to identify them as such
// they are identified only by their name
function isUntypedKustomizationFile(filePath = ''): boolean {
  const base = path.parse(filePath).base.toLowerCase();
  return ['kustomization.yaml', 'kustomization.yml', 'Kustomization'].includes(
    base
  );
}

export function isYamlFile(filePath:  string): boolean {
  return filePath.endsWith('.yml') || filePath.endsWith('.yaml');
}

export function parseYamlDocument(text: string, lineCounter?: LineCounter) {
  return parseDocument(text, { lineCounter, uniqueKeys: false, strict: false });
}

export function findResourceById(id: string, resources: Resource[]) {
  return resources.find(r => r.id === id);
}

export function isFolderPath(filePath: string, files: Set<string>) {
  return Object.keys(files).find(f => f.startsWith(filePath + path.sep)) !== undefined;
}

export function findChildren(files: Set<string>, parentFile: string) {
  return Object.keys(files).filter(
    f =>
      f.startsWith(parentFile + path.sep) &&
      f.indexOf(path.sep, parentFile.length + 1) === -1
  );
}

export function getResourcesForPath(
  filePath: string,
  resources: Resource[] | undefined
) {
  return resources
    ? resources.filter(resource => resource.filePath === filePath)
    : [];
}
