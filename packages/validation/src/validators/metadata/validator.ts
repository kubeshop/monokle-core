import difference from 'lodash/difference.js';
import intersection from 'lodash/intersection.js';
import {AbstractPlugin} from '../../common/AbstractPlugin.js';
import {ResourceParser} from '../../common/resourceParser.js';
import {ValidationResult} from '../../common/sarif.js';
import {Incremental, Resource} from '../../common/types.js';
import {METADATA_RULES} from './rules.js';
import {createLocations} from '../../utils/createLocations.js';
import {RuleMetadataWithConfig} from '../../types.js';
import {findJsonPointerNode} from '../../utils/findJsonPointerNode.js';

export class MetadataValidator extends AbstractPlugin {
  constructor(private resourceParser: ResourceParser) {
    super(
      {
        id: 'MTD',
        name: 'metadata',
        displayName: 'Metadata',
        description: 'Validates that your manifests have correct metadata fields and values.',
        learnMoreUrl: 'https://kubeshop.github.io/monokle/resource-validation/',
      },
      METADATA_RULES
    );
  }

  async doValidate(resources: Resource[], incremental?: Incremental): Promise<ValidationResult[]> {
    const results: ValidationResult[] = [];
    const dirtyResources = incremental ? resources.filter(r => incremental.resourceIds.includes(r.id)) : resources;

    for (const resource of dirtyResources) {
      for (const rule of this.rules) {
        const resourceError = this[this.isLabelRule(rule) ? 'validateLabels' : 'validateAnnotations'](resource, rule);

        resourceError && results.push(resourceError);
      }
    }

    return results;
  }

  private isLabelRule(rule: RuleMetadataWithConfig) {
    return rule.name.endsWith('-labels') || rule.name.endsWith('-label');
  }

  private validateAnnotations(resource: Resource, rule: RuleMetadataWithConfig) {
    const invalidKeys = this.validateMap(resource.content?.metadata?.annotations ?? {}, rule.configuration?.parameters ?? []);

    if (!invalidKeys.length) {
      return undefined;
    }

    const errorMessage = `Missing valid: ${invalidKeys.join(', ')} ${invalidKeys.length > 1 ? 'annotations' : 'annotation'} in ${resource.kind}.`;

    return this.adaptToValidationResult(resource, ['metadata', 'annotations'], rule.id, errorMessage);
  }

  private validateLabels(resource: Resource, rule: RuleMetadataWithConfig) {
    const invalidKeys = this.validateMap(resource.content?.metadata?.labels ?? {}, rule.configuration?.parameters ?? []);

    if (!invalidKeys.length) {
      return undefined;
    }

    const errorMessage = `Missing valid: ${invalidKeys.join(', ')} ${invalidKeys.length > 1 ? 'labels' : 'label'} in ${resource.kind}.`;

    return this.adaptToValidationResult(resource, ['metadata', 'labels'], rule.id, errorMessage);
  }

  private validateMap(actualMap: {[key: string]: any}, expectedKeys: string[]): string[] {
    if (!expectedKeys.length) {
      return [];
    }

    const missingLabels = difference(expectedKeys, Object.keys(actualMap));
    const emptyLabels = Object.entries(actualMap).filter(([_, value]) => !value).map(([key, _]) => key);
    const missingEmptyLabels = intersection(expectedKeys, emptyLabels);

    return [...missingLabels, ...missingEmptyLabels].sort((a, b) => a.localeCompare(b));
  }

  private adaptToValidationResult(resource: Resource, path: string[], ruleId: string, errText: string) {
    const {parsedDoc} = this.resourceParser.parse(resource);

    const valueNode = findJsonPointerNode(parsedDoc, path);

    const region = this.resourceParser.parseErrorRegion(resource, valueNode.range);

    const locations = createLocations(resource, region);

    return this.createValidationResult(ruleId, {
      message: {
        text: errText,
      },
      locations,
    });
  }
}
