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
import { RuleMap } from '../../config/parse.js';
import { isDefined } from '../../utils/isDefined.js';

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

  protected preconfigureRules(rules: RuleMap = {}) {
    Object.entries(rules).forEach(rule => {
      const ruleName = rule[0];

      if (!ruleName.startsWith('metadata/') || !ruleName.endsWith('-label') && !ruleName.endsWith('-annotation')) {
        return;
      }

      const isLabelRule = this.isLabelRule(ruleName);
      const ruleTypeName = isLabelRule ? 'label' : 'annotation';
      const ruleShortName = ruleName.replace('metadata/', '');
      const ruleNormalizedName = ruleShortName.replace('__', '/').replace((isLabelRule ? /-label$/ : /-annotation$/), '');

      this._rules.push({
        id: `MTD-${ruleShortName}`,
        name: ruleShortName,
        shortDescription: { text: `The ${ruleNormalizedName} ${ruleTypeName} is missing.` },
        fullDescription: {
          text: `The resource is violating the ${ruleShortName}. The resource may not be discoverable by tools that rely on these ${ruleTypeName}s.`
        },
        help: {
          text: `Add required ${ruleTypeName}. You can hover the key for documentation.`
        },
        defaultConfiguration: {
          parameters: {name: ruleNormalizedName}
          // rest of the configuration is set during 'this.configureRules()' method call
        },
      });
    });

    this.setRules(this._rules);
  }

  async doValidate(resources: Resource[], incremental?: Incremental): Promise<ValidationResult[]> {
    const results: ValidationResult[] = [];
    const dirtyResources = incremental ? resources.filter(r => incremental.resourceIds.includes(r.id)) : resources;

    for (const resource of dirtyResources) {
      for (const rule of this.rules) {
        const resourceErrors = this.validateResource(resource, rule);
        results.push(...resourceErrors);
      }
    }

    return results;
  }

  private isLabelRule(ruleName: string) {
    return ruleName.endsWith('-labels') || ruleName.endsWith('-label');
  }

  // We have special behavior for different rules (https://github.com/kubeshop/monokle-saas/issues/722):
  // MTD-recommended-labels does not allow to config parameters (meaning label names or values).
  // MTD-custom-labels and MTD-custom-annotations allows to define label/annotations expected names with config parameters.
  // MTD-*-(label|annotation) (dynamic rules) allow to define expected values with config parameters.
  private validateResource(resource: Resource, rule: RuleMetadataWithConfig) {
    const isLabelRule = this.isLabelRule(rule.name);
    const allowsNamesList = rule.id === 'MTD-custom-labels' || rule.id === 'MTD-custom-annotations';
    const allowsValuesList = rule.name.endsWith('-label') || rule.name.endsWith('-annotation');

    let expectedNames = allowsNamesList ? rule.configuration?.parameters ?? [] : rule.defaultConfiguration?.parameters ?? [];
    const expectedValues = allowsValuesList ? rule.configuration?.parameters ?? [] : []; // if not defined it will contain rule name
    const valuesMap = isLabelRule ? resource.content?.metadata?.labels ?? {} : resource.content?.metadata?.annotations ?? {};

    if (allowsValuesList && rule.defaultConfiguration?.parameters?.name) {
      expectedNames = [rule.defaultConfiguration?.parameters?.name];
    }

    const invalidKeys = this.validateMap(valuesMap, expectedNames, expectedValues);

    if (!invalidKeys.length) {
      return [];
    }

    return invalidKeys.map(key => this.adaptToValidationResult(
        resource,
        ['metadata', isLabelRule ? 'labels' : 'annotations'],
        rule.id,
        `Missing valid '${key}' ${isLabelRule ? 'label' : 'annotation'} in '${resource.kind}'.` // expected value: ${expectedValues.join(', ')}
      )
    ).filter(isDefined)
  }

  private validateMap(actualMap: {[key: string]: any}, expectedKeys: string[], expectedValues: string[]): string[] {
    if (!expectedKeys.length) {
      return [];
    }

    const missingLabels = difference(expectedKeys, Object.keys(actualMap));
    const invalidLabels = expectedValues.length ?
      Object.entries(actualMap).filter(([_, value]) => !expectedValues.includes(value)).map(([key, _]) => key):
      Object.entries(actualMap).filter(([_, value]) => !value).map(([key, _]) => key);
    const missingInvalidLabels = intersection(expectedKeys, invalidLabels);

    return [...missingLabels, ...missingInvalidLabels].sort((a, b) => a.localeCompare(b));
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
