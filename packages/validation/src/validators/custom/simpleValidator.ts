import omit from "lodash/omit.js";
import { JsonObject } from "type-fest";
import { Document, isNode, Node, ParsedNode } from "yaml";
import { AbstractValidator } from "../../common/AbstractValidator.js";
import { ResourceParser } from "../../common/resourceParser.js";
import { ValidationResult, ValidationRule } from "../../common/sarif.js";
import { Incremental, Resource } from "../../common/types.js";
import { createLocations } from "../../utils/createLocations.js";
import { ReportArgs, SimplePlugin } from "./config.js";

/**
 * Validator for simple custom policies.
 */
export class SimpleCustomValidator extends AbstractValidator {
  private _settings: any = {};

  constructor(private plugin: SimplePlugin, private parser: ResourceParser) {
    super(
      plugin.name,
      plugin.rules.map((r) => omit(r, "validate"))
    );
  }

  protected override async configureValidator(
    rawSettings: JsonObject = {}
  ): Promise<void> {
    this._settings = rawSettings;
  }

  async doValidate(
    resources: Resource[],
    incremental?: Incremental
  ): Promise<ValidationResult[]> {
    const results: ValidationResult[] = [];

    const dirtyResources = incremental
      ? resources.filter((r) => incremental.resourceIds.includes(r.id))
      : resources;

    console.log("debugging", this.plugin.rules.length);
    for (const rule of this.plugin.rules) {
      console.log("debugging", rule.id, this.isRuleEnabled(rule.id));
      if (!this.isRuleEnabled(rule.id)) {
        continue;
      }

      await rule.validate(
        {
          resources: dirtyResources,
          allResources: resources,
          settings: this._settings,
        },
        {
          parse: (resource) => {
            return this.parser.parse(resource).parsedDoc;
          },
          report: (resource, args) => {
            const result = this.adaptToValidationResult(rule, resource, args);
            if (!result) return;
            results.push(result);
          },
        }
      );
    }

    return results;
  }

  private adaptToValidationResult(
    rule: ValidationRule,
    resource: Resource,
    args: ReportArgs
  ): ValidationResult | undefined {
    const { parsedDoc } = this.parser.parse(resource);

    const path = args.path.split(".");
    const node = determineClosestNodeForPath(parsedDoc, path);
    const region = node?.range
      ? this.parser.parseErrorRegion(resource, node.range)
      : undefined;

    const locations = createLocations(resource, region);

    return this.createValidationResult(rule.id, {
      message: {
        text: args.message ?? rule.shortDescription.text,
      },
      locations,
    });
  }
}

type YamlPath = Array<string | number>;

/**
 * Use a path hint to determine the node of the error or closest parent.
 *
 * Example:
 * - Hint: $container.securityContext.readOnlyRootFilesystem and desired value is `true`.
 * - When $container specifies `securityContext.readOnlyRootFilesystem` then it underlines the incorrect `false` value.
 * - When $container specifies `securityContext` then it underlines whole context object.
 * - When $container does not specify `securityContext` then it underlines whole container object.
 */
function determineClosestNodeForPath(
  resource: Document.Parsed<ParsedNode>,
  path: YamlPath,
  prefix: YamlPath = []
): Node | undefined {
  const currentPath = prefix.concat(path);

  while (currentPath.length > prefix.length) {
    const node = resource.getIn(currentPath, true);

    if (isNode(node)) {
      return node;
    }

    currentPath.pop();
  }

  const node = resource.getIn(currentPath, true);
  return isNode(node) ? node : undefined;
}
