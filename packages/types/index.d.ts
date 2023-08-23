/**
 * A record that configures rules by their human-readable name.
 *
 * @example
 * ```yaml
 * rules:
 * - "open-policy-agent/no-latest-image": "warn"
 * ```
 */
export type ValidationRuleMap = Record<string, ValidationRuleValue>;
export type ValidationRuleValue = ValidationPrimitiveRuleValue | ValidationArrayRuleValue | ValidationObjectRuleValue;
export type ValidationPrimitiveRuleValue = boolean | 'warn' | 'err' | undefined;
export type ValidationArrayRuleValue = [ValidationPrimitiveRuleValue] | [ValidationPrimitiveRuleValue, any];
export type ValidationObjectRuleValue = {severity: ValidationPrimitiveRuleValue; config: any};

/**
 * Validation settings.
 */
export type ValidationSettings = Record<string, any> & {
  debug?: boolean;
  noInSourceSuppressions?: boolean;
  noExternalSuppressions?: boolean;
};

/**
 * The validators that will be loaded.
 */
export type ValidationPluginMap = Record<string, boolean>;

/**
 * Validation policy config format.
 */
export type ValidationConfig = {
  plugins?: ValidationPluginMap;
  rules?: ValidationRuleMap;
  settings?: ValidationSettings;
};
