import {Document, isCollection, ParsedNode} from 'yaml';
import difference from 'lodash/difference.js';
import intersection from 'lodash/intersection.js';
import {AbstractPlugin} from '../../common/AbstractPlugin.js';
import {ResourceParser} from '../../common/resourceParser.js';
import {ValidationResult} from '../../common/sarif.js';
import {Incremental, Resource} from '../../common/types.js';
import {METADATA_RULES} from './rules.js';
import { createLocations } from '../../utils/createLocations.js';

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
        const labels = rule.configuration?.parameters ?? [];
        const resourceError = this.validateLabels(resource, labels);

        resourceError && results.push(resourceError);
      }
    }

    return results;
  }

  private validateLabels(resource: Resource, expectedLabels: string[]): ValidationResult | undefined {
    if (!expectedLabels.length) {
      return undefined;
    }

    const resourceLabels = resource.content?.metadata?.labels ?? {};
    const missingLabels = difference(expectedLabels, Object.keys(resourceLabels));
    const emptyLabels = Object.entries(resourceLabels).filter(([_, value]) => !value).map(([key, _]) => key);
    const missingEmptyLabels = intersection(expectedLabels, emptyLabels);
    const invalidLabels = [...missingLabels, ...missingEmptyLabels].sort((a, b) => a.localeCompare(b));
    const errorMessage = `Missing valid: ${invalidLabels.join(', ')} ${invalidLabels.length > 1 ? 'labels' : 'label'} in ${resource.kind}.`;

    return this.adaptToValidationResult(resource, ['metadata', 'labels'], 'MTD001', errorMessage);
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

function findJsonPointerNode(valuesDoc: Document.Parsed<ParsedNode>, path: string[]) {
  if (!valuesDoc.contents) {
    return undefined;
  }

  let valueNode: any = valuesDoc.contents;

  for (let c = 0; valueNode && c < path.length; c += 1) {
    let node = path[c];
    if (isCollection(valueNode)) {
      const nextNode = valueNode.get(node, true);
      if (nextNode) {
        valueNode = nextNode;
      } else {
        return valueNode;
      }
    } else break;
  }

  return valueNode;
}
