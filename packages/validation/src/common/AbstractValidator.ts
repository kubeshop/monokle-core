import keyBy from "lodash/keyBy.js";
import invariant from "tiny-invariant";
import { JsonObject } from "type-fest";
import { UNLOADED_ERR_MSG } from "../constants.js";
import { getResourceId } from "../utils/sarif.js";
import {
  ValidationPolicyRule,
  ValidationResult,
  ValidationRule,
  ValidationRuleConfig,
  ValidationRun,
} from "./sarif.js";
import { Incremental, Resource, Validator, ToolConfig } from "./types.js";

export abstract class AbstractValidator<
  TConfig extends ToolConfig = ToolConfig,
  TRuleProperties extends JsonObject = {}
> implements Validator<TConfig>
{
  public name: string;
  public loaded = false;

  protected config: TConfig | undefined;
  protected _rules: ValidationRule<TRuleProperties>[];
  protected _ruleReverseLookup: Map<string, number> = new Map(); // Lookup index by rule identifier;
  protected _policyRuleReverseLookup: Map<string, number> = new Map(); // Lookup index by rule identifier;
  protected previous: ValidationResult[] = [];

  constructor(name: string, rules: ValidationRule<TRuleProperties>[]) {
    this.name = name;
    this._rules = rules;
    rules.forEach((r, idx) => this._ruleReverseLookup.set(r.id, idx));
  }

  get enabled(): boolean {
    return this.config?.enabled ?? false;
  }

  get rules(): ValidationRule<TRuleProperties>[] {
    return this._rules;
  }

  protected createValidationResult(
    ruleId: string,
    args: Omit<ValidationResult, "ruleId" | "rule">
  ): ValidationResult | undefined {
    const index = this._ruleReverseLookup.get(ruleId);
    invariant(index !== undefined, "rules misconfigured");

    if (!this.isRuleEnabled(ruleId)) {
      return undefined;
    }

    return {
      ruleId,
      rule: {
        index,
        toolComponent: {
          name: this.name,
        },
      },
      ...args,
    };
  }

  async load(config: TConfig): Promise<void> {
    this.config = config;
    if (!this.config.enabled) return;

    this._policyRuleReverseLookup.clear();
    config.policy?.rules.forEach((r, idx) => {
      this._policyRuleReverseLookup.set(r.id, idx);
    });

    await this.doLoad(config);

    this.loaded = true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected doLoad(config: TConfig): Promise<void> {
    return Promise.resolve();
  }

  async clear() {
    this.previous = [];
  }

  async validate(
    resources: Resource[],
    incremental?: Incremental
  ): Promise<ValidationRun> {
    invariant(this.loaded, UNLOADED_ERR_MSG(this.name));

    let results = await this.doValidate(resources, incremental);

    if (incremental) {
      results = this.merge(this.previous, results, incremental);
    }

    this.previous = results;

    return {
      tool: {
        driver: {
          name: this.name,
          rules: this.rules,
        },
      },
      results,
    };
  }

  protected abstract doValidate(
    resources: Resource[],
    incremental?: Incremental
  ): Promise<ValidationResult[]>;

  protected isRuleEnabled(ruleId: string): boolean {
    return this.getRuleConfig(ruleId).enabled ?? true;
  }

  protected getRuleConfig(ruleId: string): ValidationRuleConfig {
    const rule = this.getRule(ruleId);
    const policyRule = this.getPolicyRule(ruleId);

    const defaultConfig = rule.defaultConfiguration;
    const userConfig = policyRule?.defaultConfiguration;

    return {
      ...defaultConfig,
      ...userConfig,
    };
  }

  protected getRule(ruleId: string): ValidationRule {
    const ruleIndex = this._ruleReverseLookup.get(ruleId);
    invariant(ruleIndex !== undefined, `rule_not_found`);
    const rule = this._rules[ruleIndex];
    invariant(rule, `${ruleId} rule_not_found`);
    return rule;
  }

  protected getPolicyRule(ruleId: string): ValidationPolicyRule | undefined {
    const ruleIndex = this._policyRuleReverseLookup.get(ruleId);
    if (ruleIndex === undefined) return undefined;
    return this.config?.policy?.rules[ruleIndex];
  }

  protected merge(
    previous: ValidationResult[],
    current: ValidationResult[],
    incremental?: Incremental
  ) {
    const results: ValidationResult[] = [];
    const hashmap = keyBy(incremental?.resourceIds);

    for (const result of previous) {
      const resourceId = getResourceId(result);
      const isDirty = Boolean(resourceId && hashmap[resourceId]);

      if (!isDirty) {
        results.push(result);
      }
    }

    for (const result of current) {
      const resourceId = getResourceId(result);
      const isDirty = resourceId && hashmap[resourceId];

      if (isDirty) {
        results.push(result);
      }
    }

    return results;
  }
}
