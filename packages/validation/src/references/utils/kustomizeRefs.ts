import path from '../../utils/path.js';
import {isScalar, isSeq} from 'yaml';
import {NodeWrapper} from '../../common/NodeWrapper.js';
import {ResourceParser} from '../../common/resourceParser.js';
import {Resource, ResourceRef, ResourceRefType} from '../../common/types.js';
import { KUSTOMIZATION_API_GROUP, KUSTOMIZATION_COMPONENT_KIND, KUSTOMIZATION_KIND } from "../../constants.js";
import {linkResources} from './createResourceRef.js';
import {findChildren, findResourceById, getResourcesForPath, isFolderPath} from './helpers.js';

/**
 * Creates kustomization refs between a kustomization and its resources
 */

function linkParentKustomization(
  filePath: string,
  kustomization: Resource,
  resources: Resource[],
  refNode: NodeWrapper
) {
  let result: Resource[] = [];

  getResourcesForPath(filePath, resources).forEach(r => {
    // since the target is a file there is no target refNode
    linkResources(kustomization, r, refNode);
    result.push(r);
  });

  return result;
}

/**
 * Checks if the specified resource is a kustomization resource
 */

export function isKustomizationResource(r: Resource | undefined) {
  return r &&
    (r.kind === KUSTOMIZATION_KIND || r.kind === KUSTOMIZATION_COMPONENT_KIND) &&
    (!r.apiVersion || r.apiVersion.startsWith(KUSTOMIZATION_API_GROUP));
}

/**
 * Checks if the specified resource is a kustomization patch
 */

export function isKustomizationPatch(r: Resource | undefined) {
  return r && r.name.startsWith('Patch: ');
}

export function isKustomizationFilePath(filePath: string) {
  const name = path.basename(filePath).toLowerCase();
  return name.endsWith('.yaml') && name.indexOf('kustomization') !== -1;
}

/**
 * Checks if the specified fileEntry is a kustomization file
 */

export function isKustomizationFile(filePath: string, resources: Resource[]) {
  if (filePath && isKustomizationFilePath(filePath)) {
    const r = getResourcesForPath(filePath, resources);
    return r.length === 1 && isKustomizationResource(r[0]);
  }

  return false;
}

/**
 * Processes a resource ref in a kustomization and creates corresponding resourcerefs
 */

function processKustomizationResourceRef(
  kustomization: Resource,
  refNode: NodeWrapper,
  resources: Resource[],
  files: Set<string>
) {
  let resourcePath = path.join(path.parse(kustomization.filePath).dir, refNode.nodeValue());

  if (files.has(resourcePath)) {
    let children = findChildren(files, resourcePath);
    if (children.length > 0) {
      children
        .filter(childFileEntry => isKustomizationFile(childFileEntry, resources))
        .forEach(childFileEntry => {
          linkParentKustomization(childFileEntry, kustomization, resources, refNode);
        });
    } else {
      // resource is file -> check for contained resources
      let result = linkParentKustomization(resourcePath, kustomization, resources, refNode);

      // no resources found in file? - create a fileref instead
      if (result.length === 0) {
        createKustomizationFileRef(kustomization, refNode, resourcePath, files);
      }
    }
  } else {
    // resource is file or folder ref
    createKustomizationFileRef(kustomization, refNode, resourcePath, files);
  }
}

/**
 * Extract patches at the specified nodePath and create resource or file refs
 */

function extractPatches(
  kustomization: Resource,
  files: Set<string>,
  resources: Resource[],
  patchPath: string,
  parser: ResourceParser
) {
  let patchPaths = getScalarNodes(kustomization, patchPath, parser);
  patchPaths
    .filter(refNode => refNode.node.type === 'PLAIN')
    .filter(refNode => !isExternalResourceRef(refNode))
    .forEach((refNode: NodeWrapper) => {
      let targetPath = path.join(path.parse(kustomization.filePath).dir, refNode.nodeValue());
      let linkedResources = linkParentKustomization(targetPath, kustomization, resources, refNode);
      if (linkedResources.length > 0) {
        linkedResources.forEach(resource => {
          if (!resource.name.startsWith('Patch:')) {
            resource.name = `Patch: ${resource.name}`;
          }
        });
      } else {
        createKustomizationFileRef(kustomization, refNode, targetPath, files);
      }
    });
}

// as specified by https://github.com/hashicorp/go-getter#url-format
function isExternalResourceRef(refNode: NodeWrapper) {
  const externalPrefixes: string[] = [
    'http://',
    'https://',
    'github.com/',
    'gitlab.com/',
    'bitbucket.org/',
    'git::',
    'hg::',
    's3::',
    'gcs::',
    'file:',
    'ssh:',
  ];

  let value = refNode.nodeValue().toLowerCase();
  return externalPrefixes.findIndex(v => value.startsWith(v)) >= 0;
}

/**
 * Processes all kustomizations in resourceMap and establishes corresponding resourcerefs
 */

export function processKustomizations(resources: Resource[], files: Set<string>, parser: ResourceParser) {
  resources
    .filter(r => isKustomizationResource(r))
    .forEach(kustomization => {
      let resourceNodes = getScalarNodes(kustomization, 'resources', parser);
      if (kustomization.content.bases) {
        resourceNodes = resourceNodes.concat(getScalarNodes(kustomization, 'bases', parser));
      }

      resourceNodes
        .filter(refNode => !isExternalResourceRef(refNode))
        .forEach((refNode: NodeWrapper) => {
          processKustomizationResourceRef(kustomization, refNode, resources, files);
        });

      if (kustomization.content.patchesStrategicMerge) {
        extractPatches(kustomization, files, resources, 'patchesStrategicMerge', parser);
      }
      if (kustomization.content.patchesJson6902) {
        extractPatches(kustomization, files, resources, 'patchesJson6902:path', parser);
      }
      if (kustomization.content.patches) {
        extractPatches(kustomization, files, resources, 'patches:path', parser);
      }

      // extract refs to additional helm values files introduced in Kustomize 5.0.0
      if (kustomization.content.helmCharts) {
        let valuesPaths = getScalarNodes(kustomization, 'helmCharts:additionalValuesFiles', parser);
        valuesPaths
          .filter(refNode => refNode.node.type === 'PLAIN')
          .filter(refNode => !isExternalResourceRef(refNode))
          .forEach((refNode: NodeWrapper) => {
            let targetPath = path.join(path.parse(kustomization.filePath).dir, refNode.nodeValue());
            createKustomizationFileRef(kustomization, refNode, targetPath, files);
          });
      }
    });
}

/**
 * Gets all resources directly linked to by a kustomization, including transient resources
 */

export function getKustomizationRefs(resources: Resource[], kustomizationId: string, selectParent = false) {
  let linkedResourceIds: string[] = [];
  const kustomization = findResourceById(kustomizationId, resources);
  if (kustomization && kustomization.refs) {
    kustomization.refs
      .filter(r => r.type === ResourceRefType.Outgoing || (selectParent && r.type === ResourceRefType.Incoming))
      .forEach(r => {
        if (r.target?.type === 'resource' && r.target.resourceId) {
          const target = findResourceById(r.target.resourceId, resources);
          if (target) {
            linkedResourceIds.push(r.target.resourceId);

            if (isKustomizationResource(target) && r.type === ResourceRefType.Outgoing) {
              linkedResourceIds = linkedResourceIds.concat(getKustomizationRefs(resources, r.target.resourceId));
            }
          }
        }
      });
  }

  return linkedResourceIds;
}

/**
 * Adds a file ref to the specified file to the specified resource
 */

function createKustomizationFileRef(resource: Resource, refNode: NodeWrapper, filePath: string, files: Set<string>) {
  const isFile = files.has(filePath);
  const isFolder = !isFile && isFolderPath(filePath, files);
  const refType = isFile || isFolder ? ResourceRefType.Outgoing : ResourceRefType.Unsatisfied;
  resource.refs = resource.refs || [];
  const refName = (refNode ? refNode.nodeValue() : filePath) || '<missing>';

  const ref: ResourceRef = {
    type: refType,
    name: refName,
    position: refNode.getNodePosition(),
    target: {
      type: 'file',
      filePath: isFolder ? `${filePath + path.sep}kustomization.yaml` : filePath,
    },
  };

  resource.refs.push(ref);
}

export function parseNodePath(nodePath: string) {
  return nodePath.split(':');
}

export function getScalarNodes(resource: Resource, nodePath: string, parser: ResourceParser) {
  let parents = [parser.parse(resource).parsedDoc];

  const names = parseNodePath(nodePath);
  for (let ix = 0; ix < names.length; ix += 1) {
    let nextParents: any[] = [];
    const name = names[ix];

    parents.forEach(parent => {
      if( isScalar( parent )){
         nextParents.push( parent );
      }
      else {
        const child = parent.get(name, true);
        if (child) {
          if (isSeq<any>(child)) {
            nextParents = nextParents.concat(child.items);
          } else {
            nextParents.push(child);
          }
        }
      }
    });

    if (nextParents.length === 0) {
      return [];
    }

    parents = nextParents;
  }

  let results: NodeWrapper[] = [];
  parents.forEach(parent => {
    if (isSeq<any>(parent)) {
      results = results.concat(parent.items.map(node => new NodeWrapper(node, parser.getLineCounter(resource))));
    } else if (isScalar(parent)) {
      results.push(new NodeWrapper(parent, parser.getLineCounter(resource)));
    }
  });

  return results;
}
