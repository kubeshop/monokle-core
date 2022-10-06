import * as z from "zod";
import { ZodType } from "zod";

export function parseConfig(config: unknown): Config {
  return configSchema.parse(config);
}

export type Config = {
  /**
   * The name of this configuration.
   *
   * @example "KubeShop default policy"
   */
  name?: string;

  /**
   * The version of this configuration.
   */
  version?: string;

  /**
   * The validators that will be loaded.
   */
  plugins?: Record<string, boolean>;

  /**
   * A record that configures rules by their human-readable name.
   *
   * @example
   * ```yaml
   * rules:
   * - "open-policy-agent/no-latest-image": "warn"
   * ```
   */
  rules?: Record<string, boolean | "warn" | "err">;
};

export const configSchema: ZodType<Config> = z.object({
  name: z.string().optional(),
  version: z.string().optional(),
  plugins: z.record(z.boolean()).optional(),
  rules: z.record(z.boolean().or(z.enum(["warn", "err"]))).optional(),
});
