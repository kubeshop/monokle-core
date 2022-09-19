import { ValidationResult } from "../common/sarif";

export function getResourceId(result: ValidationResult): string | undefined {
  return result.locations?.[0]?.logicalLocations?.[0].name;
}
