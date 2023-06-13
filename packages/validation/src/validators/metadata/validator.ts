// import {YAMLError} from 'yaml';
import {AbstractPlugin} from '../../common/AbstractPlugin.js';
import {ResourceParser} from '../../common/resourceParser.js';
import {ValidationResult} from '../../common/sarif.js';
import {Incremental, Resource} from '../../common/types.js';
// import {createLocations} from '../../utils/createLocations.js';
// import {isDefined} from '../../utils/isDefined.js';
import {METADATA_RULES} from './rules.js';

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

    console.log(this._rules);
    console.log(this._ruleConfig);

    for (const resource of dirtyResources) {
      // const resourceErrors = await this.validateResource(resource);
      // results.push(...resourceErrors);
    }

    return results;
  }

  // /**
  //  * Parse for YAML errors that were allowed by non-strict parsing
  //  */
  // private async validateResource(resource: Resource): Promise<ValidationResult[]> {
  //   const {parsedDoc} = this.resourceParser.parse(resource, {
  //     forceParse: true,
  //   });

  //   const results = parsedDoc.errors.map(err => this.adaptToValidationResult(resource, err)).filter(isDefined);

  //   return results;
  // }

  // private adaptToValidationResult(resource: Resource, err: YAMLError) {
  //   const region = this.resourceParser.parseErrorRegion(resource, err.pos);
  //   const locations = createLocations(resource, region);
  //   const ruleId = YAML_RULE_MAP[err.code];

  //   const textWithoutLocation = err.message.split(' at line').at(0) ?? err.message;

  //   return this.isRuleEnabled(ruleId)
  //     ? this.createValidationResult(ruleId, {
  //         message: {
  //           text: textWithoutLocation,
  //         },
  //         locations,
  //       })
  //     : undefined;
  // }
}
