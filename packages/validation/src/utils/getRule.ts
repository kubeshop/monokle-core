import {RuleMetadata, Taxonomy, ValidationResponse, ValidationResult, ValidationRun} from '../common/sarif.js';
import invariant from './invariant.js';
import {getResourceId} from './sarif.js';

/**
 * Returns the rule for this result based on the result.
 *
 * @deprecated use `getRuleForResultV2` which takes a run instead the full response. Monokle plugins have been refactored as tool extensions.
 */
export function getRuleForResult(response: ValidationResponse, result: ValidationResult): RuleMetadata {
  const toolPluginName = result.rule.toolComponent.name;
  const run = response.runs.find(run => run.tool.driver.name === 'monokle');
  const plugin = run?.tool.extensions?.find(plugin => plugin.name === toolPluginName);
  const ruleIndex = result.rule.index;
  const rule = plugin?.rules[ruleIndex];
  invariant(rule, 'rule not found');
  return rule as RuleMetadata;
}

export function getRuleForResultV2(run: ValidationRun | undefined, result: ValidationResult): RuleMetadata {
  const toolPluginIndex = result.rule.toolComponent.index;
  const toolPluginName = result.rule.toolComponent.name;
  const extensions = run?.tool.extensions ?? [];
  const plugin = extensions[toolPluginIndex] ?? extensions.find(plugin => plugin.name === toolPluginName);
  const ruleIndex = result.rule.index;
  const rule = plugin?.rules[ruleIndex];
  invariant(rule, 'rule not found');
  return rule as RuleMetadata;
}

export function getTaxonomiesForRule(run: ValidationRun, rule: RuleMetadata): Taxonomy[] {
  const taxonomies = [];
  for (const relationship of rule.relationships ?? []) {
    const taxonomyName = relationship.target.toolComponent.name;
    const taxonomy = run.taxonomies?.find(t => t.name === taxonomyName);
    if (!taxonomy) continue;
    taxonomies.push(taxonomy);
  }
  return taxonomies;
}

export function getTaxonomiesForResult(run: ValidationRun, result: ValidationResult): Taxonomy[] {
  const rule = getRuleForResultV2(run, result);
  const taxonomies = getTaxonomiesForRule(run, rule);
  return taxonomies;
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
