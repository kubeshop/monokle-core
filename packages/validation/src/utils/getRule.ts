import {ValidationResponse, ValidationResult, RuleMetadata} from '../common/sarif.js';
import invariant from './invariant.js';
import {getResourceId} from './sarif.js';

export function getRuleForResult(response: ValidationResponse, result: ValidationResult): RuleMetadata {
  const toolPluginName = result.rule.toolComponent.name;
  const run = response.runs.find(run => run.tool.driver.name === 'monokle');
  const plugin = run?.tool.extensions?.find(plugin => plugin.name === toolPluginName);
  const ruleIndex = result.rule.index;
  const rule = plugin?.rules[ruleIndex];
  invariant(rule, 'rule not found');
  return rule as RuleMetadata;
}

export function createResourceErrorMap(response: ValidationResponse): Map<string, ValidationResult[]> {
  const result = new Map<string, ValidationResult[]>();

  const errors = response.runs.flatMap(run => run.results);

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
