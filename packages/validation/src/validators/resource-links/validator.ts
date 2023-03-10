import { AbstractPlugin } from "../../common/AbstractPlugin.js";
import { Region, ValidationResult } from "../../common/sarif.js";
import { Resource, ResourceRef, ResourceRefType, ToolConfig } from "../../common/types.js";
import { createLocations } from "../../utils/createLocations.js";
import { isDefined } from "../../utils/isDefined.js";
import { RESOURCE_LINK_RULES } from "./rules.js";

export type ResourceLinksValidatorConfig = ToolConfig<"resource-links">;

/**
 * Validates whether there are unsatisfied references between resources.
 *
 * @prerequisite you MUST run `processRefs` before calling the validator.
 */
export class ResourceLinksValidator extends AbstractPlugin {
  constructor() {
    super(
      {
        id: "LNK",
        name: "resource-links",
        displayName: "Resource Links",
        description: "Validates that links to other resources are valid.",
        icon: "resource-links",
        learnMoreUrl: "https://kubeshop.github.io/monokle/resource-validation/"
      },
      RESOURCE_LINK_RULES
    );
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
    const unsatisfiedRefs = refs.filter(ref => ref.type === ResourceRefType.Unsatisfied || ref.type === ResourceRefType.UnsatisfiedOwner  );

    return unsatisfiedRefs
      .map((ref) => this.adaptToValidationResult(resource, ref))
      .filter(isDefined);
  }

  private adaptToValidationResult(resource: Resource, ref: ResourceRef) {
    const pos = ref.position;
    const region: Region | undefined =
      pos?.endColumn && pos.endLine
        ? {
          startLine: pos.line,
          startColumn: pos.column,
          endLine: pos.endLine,
          endColumn: pos.endColumn
        }
        : pos
          ? {
            startLine: pos.line,
            startColumn: pos.column,
            endLine: pos.line,
            endColumn: pos.column + pos.length
          }
          : undefined;

    const locations = createLocations(resource, region);

    if (ref.target?.type === "resource" && ref.target?.isOptional) {
      return this.isRuleEnabled("LNK002") ? this.createValidationResult("LNK002", {
        message: {
          text: "Unsatisfied optional resource link."
        },
        locations
      }) : undefined;
    } else if( ref.type === ResourceRefType.UnsatisfiedOwner ) {
      return this.isRuleEnabled("LNK003") ? this.createValidationResult("LNK003", {
        message: {
          text: "Unsatisfied ownerReference."
        },
        locations
      }) : undefined;
    }
    else {
      return this.isRuleEnabled("LNK001") ? this.createValidationResult("LNK001", {
        message: {
          text: "Unsatisfied resource link."
        },
        locations
      }) : undefined;
    }
  }
}
