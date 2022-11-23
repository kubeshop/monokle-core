import type { Document, ParsedNode } from "yaml";

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
};

/**
 * The Kubernetes resource.
 *
 * @remark you can generate helpers for your resources and CRDs. Learn more in the README.
 * @example `isDeployment(resource)` => resource.spec is fully typed.
 */
export type Resource = {
  apiVersion: string;
  kind: string;
  metadata?: any;
  spec?: any;
};

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
   * Returns a parsed YAML instance of the resource.
   *
   * @remark this is for advanced use cases.
   */
  parse(resource: Resource): Document.Parsed<ParsedNode>;
};

export type ReportArgs = {
  /**
   * A path to the error.
   * To navigate an array you can simply give the index as seen in the example.
   *
   * @example "metadata.annotations" for an incorrect annotation.
   * @example "spec.template.spec.containers.0.image" for an incorrect image in the first container of a Deployment.
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
