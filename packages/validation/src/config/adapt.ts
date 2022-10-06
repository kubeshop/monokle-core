import { ValidationPolicyRule, ValidationRuleConfig } from "../common/sarif.js";
import { MonokleValidator, ValidatorConfig } from "../MonokleValidator.js";
import { Config } from "./parse.js";

/**
 * Adapt our configuration format to SARIF.
 */
export function adaptConfig(
  validator: MonokleValidator,
  config: Config
): ValidatorConfig[] {
  const result = getPluginInit(config);
  const ruleMap = createRuleMap(validator);

  const rules = config.rules ?? {};
  for (const [rule, value] of Object.entries(rules)) {
    const ruleReference = ruleMap[rule];

    if (!ruleReference) {
      continue; // ignore incorrect rules
    }

    const [toolName, ruleId] = ruleReference;
    const toolConfig = result.find((r) => r.tool === toolName);

    if (!toolConfig) {
      continue;
    }

    if (!toolConfig.policy) {
      // JIT initialization of policy
      toolConfig.policy = {
        name: config.name ?? `Custom ${toolName} policy`,
        semanticVersion: config.version,
        rules: [],
        associatedComponent: {
          name: toolName,
        },
      };
    }

    const enabled = value !== false;
    const policyRule: ValidationPolicyRule = {
      id: ruleId,
      defaultConfiguration: {
        enabled,
      },
    };

    if (typeof value === "string") {
      policyRule.defaultConfiguration.level = mapConfigLevel(value);
    }

    toolConfig.policy.rules.push(policyRule);
  }

  return result;
}

type RuleMap = Record<string, [string, string]>;

/**
 * Creates a record that maps human-readable rule names to rule identifiers.
 *
 * @example ruleMap("open-policy-agent/no-latest-image") === ["open-policy-agent", "KSV013"]
 */
function createRuleMap(validator: MonokleValidator): RuleMap {
  const result: RuleMap = {};

  for (const tool of validator.tools) {
    for (const rule of tool.rules) {
      const easyRuleId = `${tool.name}/${rule.name}`;
      result[easyRuleId] = [tool.name, rule.id];
    }
  }

  return result;
}

function mapConfigLevel(input: "warn" | "err"): ValidationRuleConfig["level"] {
  return input === "warn" ? "warning" : "error";
}

function getPluginInit(config: Config): ValidatorConfig[] {
  const result = [];

  const plugins = config.plugins ?? {};
  for (const [tool, value] of Object.entries(plugins)) {
    if (!value) continue;
    result.push({ tool, enabled: true });
  }

  return result;
}
