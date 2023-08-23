import * as z from 'zod';
import {ZodType} from 'zod';
import type {
  ValidationArrayRuleValue,
  ValidationConfig,
  ValidationObjectRuleValue,
  ValidationPluginMap,
  ValidationPrimitiveRuleValue,
  ValidationRuleMap,
  ValidationRuleValue,
  ValidationSettings,
} from '@monokle/types';

// Re-export common types for backwards compatibility.
export type RuleMap = ValidationRuleMap;
export type RuleValue = ValidationRuleValue;
export type PrimitiveRuleValue = ValidationPrimitiveRuleValue;
export type ArrayRuleValue = ValidationArrayRuleValue;
export type ObjectRuleValue = ValidationObjectRuleValue;
export type Settings = ValidationSettings;
export type PluginMap = ValidationPluginMap;
export type Config = ValidationConfig;

export const configSchema: ZodType<Config> = z.object({
  name: z.string().optional(),
  version: z.string().optional(),
  plugins: z.record(z.boolean()).optional(),
  rules: z.record(z.boolean().or(z.enum(['warn', 'err']))).optional(),
  settings: z.record(z.any()).optional(),
});

/**
 * Parse the configuration as Monokle Config.
 */
export function parseConfig(config: unknown): Config {
  return configSchema.parse(config);
}
