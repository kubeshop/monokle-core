import { OriginalUriBaseIds } from "../common/sarif.js";

type CreateOriginalUriBaseIdsParams = {
  srcroot?: string;
}

export function createOriginalUriBaseIds({
  srcroot
}: CreateOriginalUriBaseIdsParams) {
  const result: OriginalUriBaseIds = {
    "SRCROOT": {
      description: {
        text: "The path to the root of this project."
      }
    },
    "RESOURCE": {
      description: {
        text:"A symbol which indicates the URI is a resource identifier."
      } 
    }
  }

  if (srcroot) {
    result["SRCROOT"].uri = srcroot;
  }

  return result;
}