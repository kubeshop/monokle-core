import type {Document, ParsedNode} from 'yaml';
import {
  RuleConfigMetadataProperties,
  RuleConfigMetadataAllowedValues,
  RuleLevel,
  reportingDescriptorRelationship,
  ValidationResult,
} from '../../node.js';

export type PluginInit = {
  /**
   * The prefix of the identifier of this plugin's rules.
   *
   * @invariant The length of this identifier must exactly be 3.
   * @example "CKV"
   */
  id: string;

  /**
   * The name of this plugin.
   *
   * @invariant This name must be kebak-casing (aka param-casing).
   * @example "my-custom-plugin"
   */
  name: string;

  /**
   * The display name of this plugin.
   *
   * This might be used in the UI or terminal output.
   *
   * @default - sentence casing of `init.name`.
   */
  displayName?: string;

  /**
   * A description of this plugin.
   */
  description: string;

  /**
   * The icon of this plugin.
   *
   * @invariant This must be one of the icons found here.
   * @default "k8s-schema"
   */
  icon?: string;

  /**
   * The website of your plugin.
   */
  learnMoreUrl?: string;

  /**
   * The rules of your plugin.
   */
  rules: Record<string, RuleInit>;
};

/**
 * Defines a plugin.
 */
export function definePlugin(init: PluginInit): PluginInit {
  return init;
}

export type RuleContext = {
  /**
   * Resources that should be revalidatd.
   */
  resources: Resource[];

  /**
   * All resources - even those not targeted by incremental revalidation.
   */
  allResources: Resource[];

  /**
   * The global settings object.
   */
  settings?: any;

  /**
   * The configuration specific to this rule.
   */
  params?: any;
};

export type RuleInit = {
  /**
   * The postfix of the identifier of this rule.
   *
   * @invariant The identifier has a format like ABC001.
   * @remark Monokle automatically creates that identifier from this number and the plugin's prefix.
   */
  id: number;

  /**
   * The short description of this rule.
   */
  description: string;

  /**
   * The long description of this rule.
   *
   * @default init.description
   */
  fullDescription?: string;

  /**
   * A description of how to resolve this problem.
   */
  help: string;

  /**
   * The runtime of your rule.
   */
  validate(ctx: RuleContext, api: RuleApi): Promise<void> | void;

  /**
   * The runtime that gives a fix for a reported problem.
   *
   * @remark you can update the resource as needed.
   */
  fix?: (ctx: FixContext, api: FixApi) => void;

  /**
   * Advanced rule settings.
   */
  advanced?: RuleAdvancedInit;
};

export type RuleAdvancedInit = {
  enabled?: boolean;
  level?: RuleLevel;
  severity?: number;
  relationships?: reportingDescriptorRelationship[];
  configMetadata?: RuleConfigMetadataProperties & {defaultValue?: RuleConfigMetadataAllowedValues};
};

/**
 * The Kubernetes resource.
 *
 * @remark Use `npm run codegen` to generate types. Learn more in the README.
 * @example `isDeployment(resource)` => resource.spec is fully typed.
 */
export type Resource = any;

export type RuleApi = {
  /**
   * Returns all related resources of the given resource.
   *
   * @example a service's label selector relates to a deployment.
   */
  getRelated(resource: Resource): Resource[];

  /**
   * Reports a problem.
   */
  report(resource: Resource, args: ReportArgs): void;

  /**
   * Returns an internally cached parsed YAML instance of the resource.
   *
   * @remark this is for advanced use cases.
   */
  parse(resource: Resource): Document.Parsed<ParsedNode>;
};

export type FixContext = {
  resource: Resource;
  problem: ValidationResult;
  path: string;
};

export type FixApi = {
  /**
   * Utility that sets the given value.
   *
   * @example a service's label selector relates to a deployment.
   */
  set(resource: Resource, path: string, value: any): void;
};

export type ReportArgs = {
  /**
   * A path to the error.
   * To navigate an array you can simply give the index as seen in the example.
   *
   * @example "metadata.annotations" for an incorrect annotation.
   * @example "spec.template.spec.containers.0.image" for an incorrect image in the first container of a Deployment.
   * @remark try to find a good value. If you cannot find any we recommend to use `kind`.
   */
  path: string;

  /**
   * A message which gives more context to the problem.
   */
  message?: string;
};

export function defineRule(init: RuleInit): RuleInit {
  return init;
}
