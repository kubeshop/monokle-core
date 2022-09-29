import { Location, Region } from "../common/sarif.js";
import { Resource } from "../common/types.js";
import { FALLBACK_REGION } from "../constants.js";

export function createLocations(
  resource: Resource,
  region: Region = FALLBACK_REGION
): [Location] | [Location, Location] {
  return [
    {
      physicalLocation: {
        artifactLocation: {
          uriBaseId: "RESOURCE",
          uri: resource.id,
        },
        region,
      },
    },
    {
      physicalLocation: {
        artifactLocation: {
          uriBaseId: "SRCROOT",
          // it should be relative path without leading path separator '/'.
          uri: resource.filePath.substring(1),
        },
        region: {
          ...region,
          startLine: region.startLine + (resource.fileOffset ?? 0),
        },
      },
    },
  ];
}
