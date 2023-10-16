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

export type SuppressionKind = 'inSource' | 'external';
export type SuppressionStatus = 'underReview' | 'accepted' | 'rejected';

/**
 * A request to suppress a result.
 *
 * @see https://docs.oasis-open.org/sarif/sarif/v2.1.0/csprd01/sarif-v2.1.0-csprd01.html#_Toc10541171
 */
export interface Suppression {
  guid?: string;
  kind: SuppressionKind;
  status: SuppressionStatus;
  justification?: string;
}

export interface ExternalSuppression extends Suppression  {
  guid: string;
}

export interface AnnotationsSuppression extends Suppression {
  kind: 'inSource';
  status: 'accepted';
}

export interface FingerprintSuppression extends ExternalSuppression {
  kind: 'external';
  fingerprint: string;
}

/**
 * Dry-run configs
 */

export type * from './dry-run'
