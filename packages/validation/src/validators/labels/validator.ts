import { YAMLMap } from "yaml";
import { ResourceParser } from "../../common/resourceParser.js";
import { AbstractValidator } from "../../common/AbstractValidator.js";
import { Incremental, Resource, ToolConfig } from "../../common/types.js";
import { ValidationResult } from "../../common/sarif.js";
import { LABELS_RULES } from "./rules.js";
import { createLocations } from "../../utils/createLocations.js";
import { isDefined } from "../../utils/isDefined.js";

export type LabelsValidatorConfig = ToolConfig<"labels">;

/**
 * Trivial validator used for development and testing.
 */
export class LabelsValidator extends AbstractValidator<LabelsValidatorConfig> {
  static toolName = "labels";

  constructor(private parser: ResourceParser) {
    super(LabelsValidator.toolName, LABELS_RULES);
  }

  async doValidate(
    resources: Resource[],
    incremental?: Incremental
  ): Promise<ValidationResult[]> {
    const invalidResources: Resource[] = [];
    const dirtyResources = incremental
      ? resources.filter((r) => incremental.resourceIds.includes(r.id))
      : resources;

    for (const resource of dirtyResources) {
      const labels = Object.entries(resource.content.metadata?.labels ?? {});
      const hasLabels = labels.length > 0;

      if (!hasLabels) {
        invalidResources.push(resource);
      }
    }

    const results = invalidResources
      .map((r) => this.adaptToValidationResult(r))
      .filter(isDefined);
    return results;
  }

  private adaptToValidationResult(
    resource: Resource
  ): ValidationResult | undefined {
    const { parsedDoc } = this.parser.parse(resource);
    const node = parsedDoc.getIn(["metadata"], true) as YAMLMap | undefined;
    const region = node?.range
      ? this.parser.parseErrorRegion(resource, node.range)
      : undefined;

    const locations = createLocations(resource, region);

    return this.createValidationResult("LBL001", {
      message: {
        text: "Resource is unlabelled.",
      },
      locations,
    });
  }
}
