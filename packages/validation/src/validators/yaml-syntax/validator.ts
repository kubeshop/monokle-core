import { YAMLError } from "yaml";
import { AbstractValidator } from "../../common/AbstractValidator.js";
import { ResourceParser } from "../../common/resourceParser.js";
import { ValidationResult, ValidationRule } from "../../common/sarif.js";
import { Incremental, Resource, ValidatorConfig } from "../../common/types.js";
import { YAML_RULES, YAML_RULE_MAP } from "./rules.js";

export type YamlValidatorConfig = ValidatorConfig<"yaml-syntax">;

export class YamlValidator extends AbstractValidator<YamlValidatorConfig> {
  constructor(private resourceParser: ResourceParser) {
    super("yaml-syntax", YAML_RULES);
  }

  async doValidate(
    resources: Resource[],
    incremental?: Incremental
  ): Promise<ValidationResult[]> {
    const results: ValidationResult[] = [];

    const dirtyResources = incremental
      ? resources.filter((r) => incremental.resourceIds.includes(r.id))
      : resources;

    for (const resource of dirtyResources) {
      const resourceErrors = await this.validateResource(resource);
      results.push(...resourceErrors);
    }

    return results;
  }

  /**
   * Parse for YAML errors that were allowed by non-strict parsing
   */
  private async validateResource(
    resource: Resource
  ): Promise<ValidationResult[]> {
    const { parsedDoc } = this.resourceParser.parse(resource, {
      forceParse: true,
    });

    const results = parsedDoc.errors.map((err) => {
      return this.adaptToValidationResult(resource, err);
    });

    return results;
  }

  private adaptToValidationResult(resource: Resource, err: YAMLError) {
    const region = this.resourceParser.parseErrorRegion(resource, err.pos);
    const ruleId = YAML_RULE_MAP[err.code];

    return this.createValidationResult(ruleId, {
      message: {
        text: err.message,
      },
      locations: [
        {
          logicalLocations: [
            {
              kind: "resource",
              name: resource.id,
            },
          ],
          physicalLocation: {
            artifactLocation: {
              uri: resource.filePath.substring(1),
            },
            region,
          },
        },
      ],
    });
  }
}
