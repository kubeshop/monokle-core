import { Location, Region } from "../common/sarif.js";
import { Resource } from "../common/types.js";
import { FALLBACK_REGION } from "../constants.js";

export function createLocations(
  resource: Resource,
  region: Region = FALLBACK_REGION
): [Location, Location] {
  // SARIF expects relative paths without leading path separator '/'.
  const filePath = resource.filePath.startsWith("/")
    ? resource.filePath.substring(1)
    : resource.filePath;

  return [
    {
      physicalLocation: {
        artifactLocation: {
          uriBaseId: "SRCROOT",
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
          uriBaseId: "RESOURCE",
          uri: resource.id,
        },
        region,
      },
    },
  ];
}
