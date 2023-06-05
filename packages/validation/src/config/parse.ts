import * as z from 'zod';
import {ZodType} from 'zod';

/**
 * A record that configures rules by their human-readable name.
 *
 * @example
 * ```yaml
 * rules:
 * - "open-policy-agent/no-latest-image": "warn"
 * ```
 */
export type RuleMap = Record<string, RuleValue>;

export type RuleValue = PrimitiveRuleValue | ArrayRuleValue | ObjectRuleValue;
export type PrimitiveRuleValue = boolean | 'warn' | 'err' | undefined;
export type ArrayRuleValue = [PrimitiveRuleValue] | [PrimitiveRuleValue, any];
export type ObjectRuleValue = {severity: PrimitiveRuleValue; config: any};

/**
 * The validators that will be loaded.
 */
export type PluginMap = Record<string, boolean>;

export type Config = {
  plugins?: PluginMap;
  rules?: RuleMap;
  settings?: any;
};

export const configSchema: ZodType<Config> = z.object({
  name: z.string().optional(),
  version: z.string().optional(),
  plugins: z.record(z.boolean()).optional(),
  rules: z.record(z.boolean().or(z.enum(['warn', 'err']))).optional(),
});

/**
 * Parse the configuration as Monokle Config.
 */
export function parseConfig(config: unknown): Config {
  return configSchema.parse(config);
}
