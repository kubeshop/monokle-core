import {Scalar} from 'yaml';
import {RuleMap} from '../config/parse.js';
import {PluginMetadataWithConfig, RuleMetadataWithConfig} from '../types.js';
import {ResourceSchema} from '../validators/kubernetes-schema/schemaLoader.js';
import {ResourceParser} from './resourceParser.js';
import {ToolPlugin, ValidationPolicy, ValidationResult} from './sarif.js';
import {Suppressor} from '../sarif/suppressions/types.js';

export type YamlPath = Array<string | number>;

/* * * * * * * * * * * * * * * * *
 * The common resource type
 * * * * * * * * * * * * * * * * */
export type Resource = {
  id: string;
  fileId: string;
  filePath: string;
  fileOffset: number; // Offset of this resource's startLine within the parent file.
  name: string;
  apiVersion: string;
  kind: string;
  namespace?: string;
  content?: any;
  text: string;
  isSelected?: boolean;
  refs?: ResourceRef[];
  range?: {
    start: number;
    length: number;
  };
};

/* * * * * * * * * * * * * * * * *
 * Types for resource references
 * * * * * * * * * * * * * * * * */

export type ResourceRefsProcessingConfig = {
  /**
   * Whether optional, unsatisfied references should be ignored.
   **/
  shouldIgnoreOptionalUnsatisfiedRefs: boolean;

  /**
   * A shared resource parser.
   */
  parser: ResourceParser;
};

export type RefNode = {scalar: Scalar; key: string; parentKeyPath: string};

export type ResourceMapType = {
  [id: string]: Resource | undefined;
};

export enum ResourceRefType {
  Incoming = 'incoming',
  Outgoing = 'outgoing',
  Unsatisfied = 'unsatisfied-outgoing',

  IncomingOwner = 'incoming-owner',
  OutgoingOwner = 'outgoing-owner',
  UnsatisfiedOwner = 'unsatisfied-outgoing-owner',
}

export type RefTargetResource = {
  type: 'resource';
  resourceId?: string;
  resourceKind?: string;
  isOptional?: boolean; // set true for satisfied refs that were optional
};

export type RefTargetFile = {
  type: 'file';
  filePath: string;
};

export type RefTargetImage = {
  type: 'image';
  tag: string;
};

export type RefTarget = RefTargetResource | RefTargetFile | RefTargetImage;

export interface ResourceRef<TRefTarget extends RefTarget = RefTarget> {
  /** the type of ref (see enum) */
  type: ResourceRefType;
  /** the ref value - for example the name of a configmap */
  name: string;
  /** the target resource or file this is referring to (empty for unsatisfied refs) */
  target?: TRefTarget;
  /** the position in the document of the refName (undefined for incoming file refs) */
  position?: RefPosition;
}

export interface RefPosition {
  line: number;
  column: number;
  length: number;
  endLine?: number;
  endColumn?: number;
}

export type CustomSchema = {
  kind: string;
  apiVersion: string;
  schema: ResourceSchema;
};

/* * * * * * * * * * * * * * * * *
 * Types for validators
 * * * * * * * * * * * * * * * * */
export type ToolConfig<T extends string = string> = {
  tool: T;
  enabled: boolean;
  policy?: ValidationPolicy;
};

export type Incremental = {
  resourceIds: string[];
};

export interface PluginConstructor {
  new (parser: ResourceParser): Plugin;
}

export type PluginMetadata = {
  /**
   * The identifier of this plugin.
   *
   * @remark This is the prefix of all rule identifiers.
   * @example "KSV"
   */
  id: string;

  /**
   * The name of this plugin
   *
   * @example "open-policy-agent"
   */
  name: string;

  /**
   * The display name of this plugin
   *
   * @example "Open Policy Agent
   */
  displayName: string;

  /**
   * The description of this plugin.
   */
  description: string;

  /**
   * The icon of this plugin
   */
  icon?: string;

  /**
   * The website of this plugin.
   */
  learnMoreUrl?: string;

  /**
   * Whether the plugin is in development.
   */
  dev?: boolean;
};

export type PluginConfig = {
  /**
   * Whether the plugin is enabled.
   */
  enabled?: boolean;
};

export type ValidateOptions = {
  incremental?: Incremental;
};

export interface Plugin {
  /**
   * The name of this plugin.
   *
   * @deprecated use metadata.name.
   */
  get name(): string;

  /**
   * The metadata of the plugin.
   */
  get metadata(): PluginMetadataWithConfig;

  /**
   * The SARIF tool component.
   */
  get toolComponent(): ToolPlugin;

  /**
   * The SARIF tool component index.
   */
  get toolComponentIndex(): number;
  set toolComponentIndex(value: number);

  /**
   * The rules of this plugin.
   */
  get rules(): RuleMetadataWithConfig[];

  get enabled(): boolean;
  set enabled(value: boolean);

  /**
   * Whether the rule exists in this plugin.
   *
   * @rule Either the rule identifier or display name.
   * @example "KSV013" or "open-policy-agent/no-latest-image"
   */
  hasRule(rule: string): boolean;

  /**
   * Whether the rule is enabled in this plugin.
   *
   * @rule Either the rule identifier or display name.
   * @example "KSV013" or "open-policy-agent/no-latest-image"
   */
  isRuleEnabled(rule: string): boolean;

  /**
   * Configures the validator.
   *
   * @remark Configure should be idempotent. A validator can be invoked
   * multiple times with unchanged settings because another validator changed.
   */
  configure(config: {rules?: RuleMap; settings?: any}): Promise<void>;

  registerCustomSchema(schema: CustomSchema): Promise<void> | void;
  unregisterCustomSchema(schema: Omit<CustomSchema, 'schema'>): Promise<void> | void;

  validate(resources: Resource[], options: ValidateOptions): Promise<ValidationResult[]>;

  clear(): Promise<void>;
  unload(): Promise<void>;
}
