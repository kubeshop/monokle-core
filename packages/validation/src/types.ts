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

export type ValidateParams = {
  /**
   * The resources that will be validated.
   */
  resources: Resource[];

  /**
   * The list of resources that recently got updated.
   *
   * @remarks Validators can use this information to skip non-modified resources.
   */
  incremental?: Incremental;

  /**
   * A previous run which acts as the baseline for detected problems.
   *
   * @remark Providing a baseline will set run.baselineGuid and result.baselineStatus.
   * @remark Newly fixed problems will be added as 'absent' results.
   * When using baseline, it is important to properly filter or
   * indicate absent results or they appear as false positives.
   */
  baseline?: ValidationResponse;

  /**
   * A signal that can be used to abort processing.
   */
  abortSignal?: AbortSignal;
};

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
  validate(args: ValidateParams): Promise<ValidationResponse>;

  /**
   * Unloads all plugins.
   *
   * This will make the validator as new.
   */
  unload(): Promise<void>;
}
