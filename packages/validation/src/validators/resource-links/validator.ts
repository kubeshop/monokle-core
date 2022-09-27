import { AbstractValidator } from "../../common/AbstractValidator.js";
import {
  ValidationResult,
  Region,
  ValidationRule,
} from "../../common/sarif.js";
import {
  Resource,
  ResourceRef,
  ResourceRefType,
  ValidatorConfig,
} from "../../common/types.js";
import { RESOURCE_LINK_RULES } from "./rules.js";

export type ResourceLinksValidatorConfig = ValidatorConfig<"resource-links">;

/**
 * Validates whether there are unsatisfied references between resources.
 *
 * @prerequisite you MUST run `processRefs` before calling the validator.
 */
export class ResourceLinksValidator extends AbstractValidator<ResourceLinksValidatorConfig> {
  constructor() {
    super("resource-links");
  }

  getRules(): ValidationRule[] {
    return RESOURCE_LINK_RULES;
  }

  override merge(
    _previous: ValidationResult[],
    current: ValidationResult[]
  ): ValidationResult[] {
    // Disable incremental validation for now,
    // editing a resource can fix other resources.
    return current;
  }

  async doValidate(resources: Resource[]): Promise<ValidationResult[]> {
    const results: ValidationResult[] = [];

    for (const resource of resources) {
      const resourceErrors = await this.validateResource(resource);
      results.push(...resourceErrors);
    }

    return results;
  }

  private async validateResource(
    resource: Resource
  ): Promise<ValidationResult[]> {
    const refs = resource.refs ?? [];
    const unsatisfiedRefs = refs.filter(isUnsatisfied);

    const results = unsatisfiedRefs.map((ref) => {
      return this.createValidationResult(resource, ref);
    });

    return results;
  }

  private createValidationResult(resource: Resource, ref: ResourceRef) {
    const region: Region | undefined =
      ref.position?.endColumn && ref.position.endLine
        ? {
            startLine: ref.position.line,
            startColumn: ref.position.column,
            endLine: ref.position.endLine,
            endColumn: ref.position.endColumn,
          }
        : undefined;

    const result: ValidationResult = {
      ruleId: "LNK001",
      message: {
        text: "Unsatisfied resource link.",
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
    };

    return result;
  }
}

const isUnsatisfied = (r: ResourceRef) => {
  return r.type === ResourceRefType.Unsatisfied;
};
