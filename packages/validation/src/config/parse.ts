import { JsonObject } from "type-fest";
import * as z from "zod";
import { ZodType } from "zod";

/**
 * Parse the configuration as SARIF.
 */
// export function parseConfig(validator: MonokleValidator, config: unknown) {
//   const raw = parseConfigRaw(config);
//   return adaptConfig(validator, raw);
// }

/**
 * Parse the configuration as Monokle Config.
 */
export function parseConfigRaw(config: unknown): Config {
  return configSchema.parse(config);
}

/**
 * A record that configures rules by their human-readable name.
 *
 * @example
 * ```yaml
 * rules:
 * - "open-policy-agent/no-latest-image": "warn"
 * ```
 */
export type RuleMap = Record<string, boolean | "warn" | "err">;

/**
 * The validators that will be loaded.
 */
export type PluginMap = Record<string, boolean>;

export type Config = {
  plugins?: PluginMap;
  rules?: RuleMap;
  settings?: JsonObject;
};

export const configSchema: ZodType<Config> = z.object({
  name: z.string().optional(),
  version: z.string().optional(),
  plugins: z.record(z.boolean()).optional(),
  rules: z.record(z.boolean().or(z.enum(["warn", "err"]))).optional(),
});
