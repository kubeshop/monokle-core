import { ValidationResult } from "../common/sarif.js";

export function getResourceId(result: ValidationResult): string | undefined {
  return result.locations?.[0]?.physicalLocation?.artifactLocation.uri;
}
