import toLower from 'lodash/toLower.js';
import {Location, LogicalLocation, Region} from '../common/sarif.js';
import {Resource} from '../common/types.js';
import {FALLBACK_REGION} from '../constants.js';
import {YamlPath} from '../common/types.js';

export function createLocations(
  resource: Resource,
  region: Region = FALLBACK_REGION,
  path?: YamlPath
): [Location, Location] {
  // SARIF expects relative paths without leading path separator '/'.
  const filePath = resource.filePath.startsWith('/') ? resource.filePath.substring(1) : resource.filePath;
  const logicalLocations = createLogicalLocations(resource, path);

  return [
    {
      physicalLocation: {
        artifactLocation: {
          uriBaseId: 'SRCROOT',
          uri: filePath,
        },
        region: {
          ...region,
          startLine: region.startLine + (resource.fileOffset ?? 0),
          endLine: region.endLine + (resource.fileOffset ?? 0),
        },
      },
    },
    {
      physicalLocation: {
        artifactLocation: {
          uriBaseId: 'RESOURCE',
          uri: resource.id,
        },
        region,
      },
      logicalLocations,
    },
  ];
}

function createLogicalLocations(resource: Resource, path?: YamlPath): LogicalLocation[] {
  const logicalLocations: LogicalLocation[] = [
    {
      kind: 'resource',
      fullyQualifiedName: createFullyQualifiedName(resource),
      name: resource.name,
    },
  ];

  if (path) {
    logicalLocations.push({
      kind: 'element',
      name: String(path.at(-1)),
      fullyQualifiedName: path.join('.'),
    });
  }

  return logicalLocations;
}

function createFullyQualifiedName(resource: Resource) {
  return resource.namespace
    ? `${resource.name}.${resource.namespace}.${toLower(resource.kind)}@${resource.filePath}`
    : `${resource.name}.${toLower(resource.kind)}@${resource.filePath}`;
}
