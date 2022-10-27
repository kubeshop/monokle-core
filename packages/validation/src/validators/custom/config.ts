import type { Document, ParsedNode } from "yaml";
import type { ValidationRule } from "../../common/sarif.js";
import type { Resource } from "../../common/types.js";

export type PluginInit = {
  description: string;
  rules: Record<string, Rule>;
};

export type SimplePlugin = {
  name: string;
  description: string;
  rules: ExecutableValidationRule[];
};

export type ExecutableValidationRule = ValidationRule & {
  validate: RuleInit["validate"];
};

export function definePlugin(name: string, init: PluginInit): SimplePlugin {
  const rules: ExecutableValidationRule[] = Object.entries(init.rules).map(
    ([name, r]) => {
      return {
        id: r.id,
        name: r.name,
        shortDescription: {
          text: r.description,
        },
        fullDescription: {
          text: r.fullDescription ?? r.description,
        },
        help: {
          text: r.help ?? "No help available.",
        },
        validate: r.validate,
      };
    }
  );

  return {
    name,
    description: init.description,
    rules,
  };
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

export type ReportArgs = { path: string; message?: string };

export type RuleApi = {
  report(resource: Resource, args: ReportArgs): void;
  parse(resource: Resource): Document.Parsed<ParsedNode>;
};

export type RuleInit = {
  name: string;
  description: string;
  fullDescription?: string;
  help?: string;
  validate(ctx: RuleContext, api: RuleApi): Promise<void> | void;
};

export type Rule = RuleInit & { id: string };

export function defineRule(id: string, init: RuleInit): Rule {
  return { id, ...init };
}
