import type { Document, ParsedNode } from "yaml";
import type { Resource } from "../../common/types.js";

export type PluginInit = {
  /**
   * The identifier of this plugin.
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
   * The identifier of this rule
   *
   * @invariant The identifier must be unique.
   * @invariant The identifier must be prefixed with your plugin's identifier.
   * @example "CKV001"
   */
  id: string;

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

export type RuleApi = {
  report(resource: Resource, args: ReportArgs): void;
  parse(resource: Resource): Document.Parsed<ParsedNode>;
};

export type ReportArgs = { path: string; message?: string };

export function defineRule(init: RuleInit): RuleInit {
  return init;
}
