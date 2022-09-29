import invariant from "tiny-invariant";
import {
  ValidationResponse,
  ValidationResult,
  ValidationRule,
} from "../common/sarif.js";
import { getResourceId } from "./sarif.js";

export function getRuleForResult(
  response: ValidationResponse,
  result: ValidationResult
): ValidationRule {
  const tool = result.rule.toolComponent.name;
  const run = response.runs.find((run) => run.tool.driver.name === tool);
  const ruleIndex = result.rule.index;
  const rule = run?.tool.driver.rules[ruleIndex];
  invariant(rule, "rule not found");
  return rule;
}

export function createResourceErrorMap(
  response: ValidationResponse
): Map<string, ValidationResult[]> {
  const result = new Map<string, ValidationResult[]>();

  const errors = response.runs.flatMap((run) => run.results);

  for (const err of errors) {
    const resourceId = getResourceId(err);

    if (!resourceId) {
      continue;
    }

    if (!result.has(resourceId)) {
      result.set(resourceId, []);
    }

    const current = result.get(resourceId);
    current?.push(err);
  }

  return result;
}
