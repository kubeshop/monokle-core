import {RuleMetadata, RuleConfig, ValidationResponse} from './common/sarif.js';
import {PluginMetadata, Resource, Incremental, CustomSchema} from './common/types.js';
import {Config} from './config/parse.js';

export type PluginMetadataWithConfig = PluginMetadata & {
  configuration: {
    enabled: boolean;
  };
};

export type RuleMetadataWithConfig = RuleMetadata & {
  configuration: RuleConfig;
};

export type PluginName = string;

export interface Validator {
  /**
   * The user configuration.
   */
  readonly config: Config;

  /**
   * The metadata and configuration of all plugins.
   */
  readonly metadata: Record<PluginName, PluginMetadataWithConfig>;

  /**
   * The rules of all plugins.
   */
  readonly rules: Record<PluginName, Array<RuleMetadataWithConfig>>;

  registerCustomSchema(schema: CustomSchema): Promise<void>;
  unregisterCustomSchema(schema: Omit<CustomSchema, 'schema'>): Promise<void>;

  /**
   * Validates the resources.
   *
   * @remark Plugins must be loaded and configured before you can validate.
   * this is more text
   */
  validate(args: {
    resources: Resource[];
    incremental?: Incremental;
    abortSignal?: AbortSignal;
  }): Promise<ValidationResponse>;

  /**
   * Unloads all plugins.
   *
   * This will make the validator as new.
   */
  unload(): Promise<void>;
}
