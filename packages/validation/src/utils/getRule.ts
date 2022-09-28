import invariant from "tiny-invariant";
import {
  ValidationResponse,
  ValidationResult,
  ValidationRule,
} from "../common/sarif";

export function getRuleForResult(
  response: ValidationResponse,
  result: ValidationResult
): ValidationRule {
  const tool = result.rule.toolComponent.name;
  const run = response.runs.find((run) => run.tool.driver.name === tool);
  const ruleIndex = result.rule.index;
  const rule = run?.tool.rules[ruleIndex];
  invariant(rule, "rule not found");
  return rule;
}

export function createResourceErrorMap(
  response: ValidationResponse
): Map<string, ValidationResult[]> {
  const result = new Map<string, ValidationResult[]>();

  const errors = response.runs.flatMap((run) => run.results);

  for (const err of errors) {
    const locations = err.locations?.[0]?.logicalLocations ?? [];

    for (const { name } of locations) {
      if (name === undefined) {
        continue;
      }

      if (!result.has(name)) {
        result.set(name, []);
      }

      const current = result.get(name);
      current?.push(err);
    }
  }

  return result;
}
