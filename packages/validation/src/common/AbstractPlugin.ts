import keyBy from 'lodash/keyBy.js';
import {PrimitiveRuleValue, RuleMap} from '../config/parse.js';
import {NOT_CONFIGURED_ERR_MSG} from '../constants.js';
import {PluginMetadataWithConfig, RuleMetadataWithConfig} from '../core/types.js';
import invariant from '../utils/invariant.js';
import {getResourceId} from '../utils/sarif.js';
import {ValidationResult, RuleMetadata, RuleConfig, ToolPlugin} from './sarif.js';
import {Incremental, Resource, Plugin, PluginMetadata, CustomSchema, ValidateOptions} from './types.js';
import {fingerprint} from '../utils/fingerprint.js';

const DEFAULT_RULE_CONFIG: RuleConfig = {
  enabled: true,
  level: 'warning',
  rank: -1,
};

export abstract class AbstractPlugin implements Plugin {
  protected _metadata: PluginMetadata;
  public configured = false;

  protected _toolComponentIndex: number = -1;
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
    const rules = this._rules;
    return {name, rules};
  }

  get toolComponentIndex(): number {
    return this._toolComponentIndex;
  }

  set toolComponentIndex(value: number) {
    this._toolComponentIndex = value;
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
    args: Omit<ValidationResult, 'ruleId' | 'rule' | 'suppressions'>
  ): ValidationResult | undefined {
    const index = this._ruleReverseLookup.get(ruleId);
    invariant(index !== undefined, 'rules misconfigured');

    if (!this.isRuleEnabled(ruleId)) {
      return undefined;
    }

    const ruleConfig = this.getRuleConfig(ruleId);
    const rule = this.rules[index];
    const taxa = rule.relationships?.map(r => r.target);
    const result = {
      ruleId,
      rule: {
        id: ruleId,
        index: index ?? 0,
        toolComponent: {
          name: this.name,
          index: this.toolComponentIndex,
        },
      },
      suppressions: [],
      taxa,
      level: ruleConfig.level,
      ...args,
    };

    result.fingerprints = fingerprint(result);

    return result;
  }

  async configure(config: {rules?: RuleMap; settings?: any}): Promise<void> {
    this.preconfigureRules(config.rules);
    this.configureRules(config.rules);
    await this.configurePlugin(config.settings);
    this.configured = true;
  }

  protected preconfigureRules(rules: RuleMap = {}) {}

  protected configureRules(rules: RuleMap = {}) {
    this._ruleConfig.clear();

    // Set defaults
    for (const rule of this._rules) {
      const defaultConfig: RuleConfig = {
        enabled: rule.defaultConfiguration?.enabled ?? DEFAULT_RULE_CONFIG.enabled,
        level: rule.defaultConfiguration?.level ?? DEFAULT_RULE_CONFIG.level,
        parameters: rule.defaultConfiguration?.parameters ?? DEFAULT_RULE_CONFIG.parameters,
        rank: rule.defaultConfiguration?.rank ?? DEFAULT_RULE_CONFIG.rank,
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
      invariant(defaultConfig);

      const isArray = Array.isArray(newConfig);
      const isObject = typeof newConfig === 'object';
      const isPrimitive = typeof newConfig === 'string' || typeof newConfig === 'boolean';

      const severity: PrimitiveRuleValue = isArray
        ? newConfig.at(0)
        : isObject
        ? newConfig['severity']
        : isPrimitive
        ? newConfig
        : undefined;
      const config = isArray ? newConfig.at(1) : isObject ? newConfig['config'] : undefined;
      const enabled =
        typeof severity === 'boolean' ? severity : typeof severity === 'string' ? true : defaultConfig.enabled;
      const level = typeof severity === 'string' ? (severity === 'err' ? 'error' : 'warning') : defaultConfig.level;

      const parameters = {
        ...defaultConfig.parameters,
        ...(config ? {configValue: config} : {}),
      };

      this._ruleConfig.set(ruleId, {
        ...defaultConfig,
        enabled,
        level,
        parameters,
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected configurePlugin(settings: any | undefined): Promise<void> {
    return Promise.resolve();
  }

  registerCustomSchema(schema: CustomSchema): void | Promise<void> {
    return;
  }

  unregisterCustomSchema(schema: Omit<CustomSchema, 'schema'>): void | Promise<void> {
    return;
  }

  async validate(resources: Resource[], options: ValidateOptions = {}): Promise<ValidationResult[]> {
    invariant(this.configured, NOT_CONFIGURED_ERR_MSG(this.name));

    let results = await this.doValidate(resources, options);

    if (options.incremental) {
      results = this.merge(this._previous, results, options.incremental);
    }

    this._previous = results;

    return results;
  }

  protected abstract doValidate(resources: Resource[], options: ValidateOptions): Promise<ValidationResult[]>;

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
