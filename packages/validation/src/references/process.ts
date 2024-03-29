import groupBy from 'lodash/groupBy.js';
import keyBy from 'lodash/keyBy.js';
import uniq from 'lodash/uniq.js';
import {Incremental, Resource, ResourceRefsProcessingConfig, ResourceRefType, YamlPath} from '../common/types.js';
import {handlePairRefMapping} from './handlePairRefMapping.js';
import {handleRefMappingByKey} from './handleRefMappingByKey.js';
import {getOutgoingRefMappers} from './mappers/index.js';
import {cleanResourceRefs} from './utils/cleanResourceRefs.js';
import {clearOutgoingResourceRefs} from './utils/clearOutgoingRefs.js';
import {getResourceKindsWithTargetingRefs} from './utils/getResourceKindsWithTargetingRefs.js';
import {getResourceRefNodes} from './utils/getResourceNodes.js';
import {refMapperMatchesKind} from './utils/refMatcher.js';
import {processKustomizations} from './utils/kustomizeRefs.js';
import {ResourceParser} from '../common/resourceParser.js';
import {isDefined} from '../utils/isDefined.js';
import {isNode} from 'yaml';

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
  files?: string[]
): Resource[] {
  const filteredResources = filterResources(resources, incremental);

  doProcessRefs(resources, filteredResources, {
    shouldIgnoreOptionalUnsatisfiedRefs: false,
    parser,
  });

  // extract all unique file paths from resources if not specified
  const filePaths = files ? new Set(files) : new Set(resources.map(obj => obj.filePath));
  processKustomizations(resources, filePaths, parser);
  return resources;
}

function filterResources(resources: Resource[], incremental?: Incremental) {
  if (!incremental) {
    return resources;
  }

  const dirtyResources = resources.filter(r => incremental.resourceIds.includes(r.id));
  const dirtyKinds = uniq(dirtyResources.map(r => r.kind));
  const relevantKinds = uniq(dirtyKinds.flatMap(getResourceKindsWithTargetingRefs));

  return resources.filter(r => {
    return incremental.resourceIds.includes(r.id) || relevantKinds.includes(r.kind);
  });
}

function doProcessRefs(resources: Resource[], resourcesToProcess: Resource[], config: ResourceRefsProcessingConfig) {
  const resourceMap = keyBy(resources, 'id');
  const resourcesByKind = groupBy(resources, r => r.kind);
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
      const targetKinds = uniq(knownKinds.filter(kind => refMapperMatchesKind(outgoingRefMapper, kind)));
      const targetResources = targetKinds.map(kind => resourcesByKind[kind]).flat();

      if (outgoingRefMapper.type === 'pairs') {
        handlePairRefMapping(sourceResource, targetResources, outgoingRefMapper, config);
      } else {
        handleRefMappingByKey(sourceResource, targetResources, outgoingRefMapper, config);
      }
    }

    if (sourceResource.kind === 'ValidatingAdmissionPolicyBinding') {
      processValidatingAdmissionPolicyParams(sourceResource, resourceMap, resourcesByKind, config.parser);
    }
  }

  cleanResourceRefs(resources);
}

/**
 * Process references to parameters of ValidationAdmissionPolicyBindings.
 *
 * These are quite unique as it needs a referenced Policy object to determine the referenced Params object.
 * To avoid further complicating the reference framework, we handle this as a one-off special case.
 */
function processValidatingAdmissionPolicyParams(
  policyBinding: Resource,
  resourceMap: Record<string, Resource>,
  resourcesByKind: Record<string, Resource[]>,
  parser: ResourceParser
) {
  const paramName = policyBinding.content?.spec?.paramRef?.name;
  const {paramKind} = determineParamKind(policyBinding, resourceMap);
  const paramNamespace = policyBinding.content?.spec?.paramRef?.namespace;

  if (!policyBinding.refs || !paramName || !paramKind) {
    return;
  }

  const relatedParams = resourcesByKind[paramKind].find(o => {
    const matchingName = paramName === o.name;
    const matchingNamespace = paramNamespace ? paramNamespace === o.namespace : true;
    return matchingName && matchingNamespace;
  });

  if (!relatedParams) {
    return;
  }

  // Add reference to Binding object
  policyBinding.refs.push({
    type: ResourceRefType.Outgoing,
    name: paramName,
    target: {
      type: 'resource',
      resourceId: relatedParams.id,
      resourceKind: relatedParams.kind,
    },
    position: getPosition(parser, policyBinding, ['spec', 'paramRef', 'name']),
  });

  // Add reference to Params object
  if (!relatedParams.refs) {
    relatedParams.refs = [];
  }

  const hasRef = relatedParams.refs.some(
    ref =>
      ref.type === ResourceRefType.Incoming &&
      ref.name === paramName &&
      ref.target &&
      ref.target.type === 'resource' &&
      ref.target.resourceId === policyBinding.id
  );
  if (hasRef) {
    return;
  }

  relatedParams.refs.push({
    type: ResourceRefType.Incoming,
    name: paramName,
    target: {
      type: 'resource',
      resourceId: policyBinding.id,
      resourceKind: policyBinding.kind,
    },
    position: getPosition(parser, relatedParams, ['metadata', 'name']),
  });
}

function determineParamKind(
  policyBinding: Resource,
  resourceMap: Record<string, Resource>
): {paramKind: string | undefined; paramApiVersion: string | undefined} {
  if (!policyBinding.refs) {
    return {paramKind: undefined, paramApiVersion: undefined};
  }

  const relatedPolicy = policyBinding.refs
    .map(ref => (ref.target?.type === 'resource' ? ref.target.resourceId : undefined))
    .filter(isDefined)
    .map(relatedId => resourceMap[relatedId])
    .find(object => object?.kind === 'ValidatingAdmissionPolicy');

  return {
    paramKind: relatedPolicy?.content?.spec?.paramKind?.kind,
    paramApiVersion: relatedPolicy?.content?.spec?.paramKind?.apiVersion,
  };
}

function getPosition(parser: ResourceParser, object: Resource, path: YamlPath) {
  const parsedObject = parser.parse(object);
  const node = parsedObject.parsedDoc.getIn(path, true);

  if (!isNode(node)) {
    return {line: 0, column: 0, length: 0};
  }

  if (node && parsedObject.lineCounter && node.range) {
    const linePos = parsedObject.lineCounter.linePos(node.range[0]);
    return {
      line: linePos.line,
      column: linePos.col,
      length: node.range[1] - node.range[0],
    };
  }

  return {line: 0, column: 0, length: 0};
}
