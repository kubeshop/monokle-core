import keyBy from 'lodash/keyBy.js';
import {JsonObject} from 'type-fest';
import {RuleMap} from '../config/parse.js';
import {NOT_CONFIGURED_ERR_MSG} from '../constants.js';
import {PluginMetadataWithConfig, RuleMetadataWithConfig} from '../types.js';
import invariant from '../utils/invariant.js';
import {getResourceId} from '../utils/sarif.js';
import {ValidationResult, RuleMetadata, RuleConfig, ValidationRun, ToolPlugin} from './sarif.js';
import {Incremental, Resource, Plugin, PluginMetadata, CustomSchema} from './types.js';

const DEFAULT_RULE_CONFIG: RuleConfig = {
  enabled: true,
  level: 'warning',
  rank: -1,
};

export abstract class AbstractPlugin implements Plugin {
  protected _metadata: PluginMetadata;
  public configured = false;

  protected _enabled: boolean = true;

  protected _rules: RuleMetadata[] = [];
  protected _ruleReverseLookup: Map<string, number> = new Map(); // Lookup index by rule identifier;
  protected _policyRuleReverseLookup: Map<string, number> = new Map(); // Lookup index by rule identifier;
  protected _ruleNameToIdLookup: Map<string, string> = new Map();
  protected _ruleConfig: Map<string, RuleConfig> = new Map();
  protected _previous: ValidationResult[] = [];

  constructor(metadata: PluginMetadata, rules: RuleMetadata[]) {
    this._metadata = metadata;
    this.setRules(rules);
  }

  protected setRules(rules: RuleMetadata[]) {
    this._ruleReverseLookup.clear();
    this._ruleNameToIdLookup.clear();
    this._rules = rules;
    rules.forEach((r, idx) => this._ruleReverseLookup.set(r.id, idx));
    rules.forEach(r => this._ruleNameToIdLookup.set(`${this._metadata.name}/${r.name}`, r.id));
  }

  get metadata(): PluginMetadataWithConfig {
    return {
      ...this._metadata,
      configuration: {
        enabled: this._enabled,
      },
    };
  }

  get rules(): RuleMetadataWithConfig[] {
    return this._rules.map(rule => {
      return {
        ...rule,
        configuration: this.getRuleConfig(rule.id),
      };
    });
  }

  get toolComponent(): ToolPlugin {
    const name = this.name;
    const rules = this.rules;
    return {name, rules};
  }

  get name(): string {
    return this._metadata.name;
  }

  get enabled(): boolean {
    return this._enabled;
  }

  set enabled(value: boolean) {
    this._enabled = value;
  }

  hasRule(rule: string): boolean {
    const split = rule.split('/');
    if (split.length !== 2) {
      // rule identifier (e.g. KSV013)
      const ruleConfig = this._ruleConfig.get(rule);
      return ruleConfig !== undefined;
    } else {
      // rule display name (e.g. open-policy-agent/no-latest-image)
      const [pluginName, ruleName] = split;
      if (this.name !== pluginName) return false;
      const ruleId = this._ruleNameToIdLookup.get(ruleName);
      if (!ruleId) return false;
      const ruleConfig = this._ruleConfig.get(ruleId);
      return ruleConfig !== undefined;
    }
  }

  isRuleEnabled(rule: string): boolean {
    const ruleSplit = rule.split('/');
    if (ruleSplit.length === 1) {
      // rule-id
      const ruleConfig = this._ruleConfig.get(rule);
      if (!ruleConfig) return false;
      return ruleConfig.enabled ?? true;
    } else {
      // validator-name/rule-name
      const ruleId = this._ruleNameToIdLookup.get(rule);

      if (!ruleId) {
        return false;
      }

      return this.getRuleConfig(ruleId).enabled ?? true;
    }
  }

  protected createValidationResult(
    ruleId: string,
    args: Omit<ValidationResult, 'ruleId' | 'rule'>
  ): ValidationResult | undefined {
    const index = this._ruleReverseLookup.get(ruleId);
    invariant(index !== undefined, 'rules misconfigured');

    if (!this.isRuleEnabled(ruleId)) {
      return undefined;
    }

    const ruleConfig = this.getRuleConfig(ruleId);

    return {
      ruleId,
      rule: {
        index: index ?? 0,
        toolComponent: {
          name: this.name,
        },
      },
      level: ruleConfig.level,
      ...args,
    };
  }

  async configure(config: {rules?: RuleMap; settings?: JsonObject}): Promise<void> {
    this.configureRules(config.rules);
    await this.configurePlugin(config.settings);
    this.configured = true;
  }

  protected configureRules(rules: RuleMap = {}) {
    this._ruleConfig.clear();

    // Set defaults
    for (const rule of this._rules) {
      const defaultConfig: RuleConfig = {
        ...DEFAULT_RULE_CONFIG,
        ...rule.defaultConfiguration,
      };

      this._ruleConfig.set(rule.id, defaultConfig);
    }

    // Set overrides
    for (const [ruleName, newConfig] of Object.entries(rules)) {
      // ruleName is either "validator-name/rule-name" or 'rule-id".
      const ruleId = this._ruleNameToIdLookup.get(ruleName) ?? ruleName;
      const ruleIndex = this._ruleReverseLookup.get(ruleId);

      if (ruleIndex === undefined) {
        continue; // rule not found.
      }

      const defaultConfig = this._ruleConfig.get(ruleId);

      this._ruleConfig.set(
        ruleId,
        typeof newConfig === 'boolean'
          ? {
              ...defaultConfig,
              enabled: newConfig,
            }
          : {
              ...defaultConfig,
              enabled: true,
              level: newConfig === 'err' ? 'error' : 'warning',
            }
      );
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected configurePlugin(settings: JsonObject | undefined): Promise<void> {
    return Promise.resolve();
  }

  registerCustomSchema(schema: CustomSchema): void | Promise<void> {
    return;
  }

  unregisterCustomSchema(schema: Omit<CustomSchema, 'schema'>): void | Promise<void> {
    return;
  }

  async validate(resources: Resource[], incremental?: Incremental): Promise<ValidationResult[]> {
    invariant(this.configured, NOT_CONFIGURED_ERR_MSG(this.name));

    let results = await this.doValidate(resources, incremental);

    if (incremental) {
      results = this.merge(this._previous, results, incremental);
    }

    this._previous = results;

    return results;
  }

  protected abstract doValidate(resources: Resource[], incremental?: Incremental): Promise<ValidationResult[]>;

  protected getRuleConfig(ruleId: string): RuleConfig {
    const ruleConfig = this._ruleConfig.get(ruleId);
    invariant(ruleConfig, `rule_config_not_found`);
    return ruleConfig as RuleConfig;
  }

  protected merge(previous: ValidationResult[], current: ValidationResult[], incremental?: Incremental) {
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

  async clear() {
    this._previous = [];
  }

  async unload() {
    return;
  }
}
