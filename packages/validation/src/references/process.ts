import groupBy from "lodash/groupBy.js";
import keyBy from "lodash/keyBy.js";
import uniq from "lodash/uniq.js";
import { ResourceParser } from "../common/resourceParser.js";
import {
  Incremental,
  Resource,
  ResourceRefsProcessingConfig,
} from "../common/types.js";
import { handlePairRefMapping } from "./handlePairRefMapping.js";
import { handleRefMappingByKey } from "./handleRefMappingByKey.js";
import { getOutgoingRefMappers } from "./mappers/index.js";
import { cleanResourceRefs } from "./utils/cleanResourceRefs.js";
import { clearOutgoingResourceRefs } from "./utils/clearOutgoingRefs.js";
import { getResourceKindsWithTargetingRefs } from "./utils/getResourceKindsWithTargetingRefs.js";
import { getResourceRefNodes } from "./utils/getResourceNodes.js";
import { refMapperMatchesKind } from "./utils/refMatcher.js";
import { processKustomizations } from "./utils/kustomizeRefs.js";

/**
 * Processes resources and MUTATES them with their references to other resources.
 *
 * @glossary
 * - RefMap: Decides whether an edge is formed between two resources.
 * - Sibling: A RefMap is build on a single property that will be higlighted,
 *     though target identity might be based on multiple properties. These
 *     non-highlighted properties are called siblings.
 */
export function processRefs(
  resources: Resource[],
  parser: ResourceParser,
  incremental?: Incremental,
  // optional list of files that were processed to extract the specified resources, needed to resolve refs
  // to files that don't contain any resources. If not specified the list of files will be extracted from
  // specified resources instead.
  files?: string[],
  options?: {
    shouldIgnoreOptionalUnsatisfiedRefs?: boolean
  }
): Resource[] {
  const filteredResources = filterResources(resources, incremental);

  doProcessRefs(resources, filteredResources, {
    shouldIgnoreOptionalUnsatisfiedRefs: Boolean(options?.shouldIgnoreOptionalUnsatisfiedRefs),
    parser,
  });

  // extract all unique file paths from resources if not specified
  const filePaths = files
    ? new Set(files)
    : new Set(resources.map((obj) => obj.filePath));
  processKustomizations(resources, filePaths, parser);
  return resources;
}

function filterResources(resources: Resource[], incremental?: Incremental) {
  if (!incremental) {
    return resources;
  }

  const dirtyResources = resources.filter((r) =>
    incremental.resourceIds.includes(r.id)
  );
  const dirtyKinds = uniq(dirtyResources.map((r) => r.kind));
  const relevantKinds = uniq(
    dirtyKinds.flatMap(getResourceKindsWithTargetingRefs)
  );

  return resources.filter((r) => {
    return (
      incremental.resourceIds.includes(r.id) || relevantKinds.includes(r.kind)
    );
  });
}

function doProcessRefs(
  resources: Resource[],
  resourcesToProcess: Resource[],
  config: ResourceRefsProcessingConfig
) {
  const resourceMap = keyBy(resources, "id");
  const resourcesByKind = groupBy(resources, (r) => r.kind);
  const knownKinds = Object.keys(resourcesByKind);

  for (const sourceResource of resourcesToProcess) {
    clearOutgoingResourceRefs(sourceResource, resourceMap);
    const sourceRefNodes = getResourceRefNodes(sourceResource, config);

    if (!sourceRefNodes || Object.values(sourceRefNodes).length === 0) {
      continue;
    }

    const outgoingRefMappers = getOutgoingRefMappers(sourceResource.kind);

    for (const outgoingRefMapper of outgoingRefMappers) {
      // todo image code
      const targetKinds = uniq(
        knownKinds.filter((kind) =>
          refMapperMatchesKind(outgoingRefMapper, kind)
        )
      );
      const targetResources = targetKinds
        .map((kind) => resourcesByKind[kind])
        .flat();

      if (outgoingRefMapper.type === "pairs") {
        handlePairRefMapping(
          sourceResource,
          targetResources,
          outgoingRefMapper,
          config
        );
      } else {
        handleRefMappingByKey(
          sourceResource,
          targetResources,
          outgoingRefMapper,
          config
        );
      }
    }
  }

  cleanResourceRefs(resources);
}
