import invariant from "tiny-invariant";
import { Location, ValidationResult } from "../common/sarif.js";

export function getResourceId(result: ValidationResult): string | undefined {
  return getResourceLocation(result).physicalLocation?.artifactLocation.uri;
}

export function getFileId(result: ValidationResult): string | undefined {
  return getFileLocation(result).physicalLocation?.artifactLocation.uri;
}

export function getResourceLocation(result: ValidationResult): Location {
  const location = result.locations?.[1];
  invariant(location, "invalid SARIF result");
  return location;
}

export function getFileLocation(result: ValidationResult): Location {
  const location = result.locations?.[0];
  invariant(location, "invalid SARIF result");
  return location;
}
