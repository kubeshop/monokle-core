import {AbstractPlugin} from '../../common/AbstractPlugin.js';
import {CustomSchema, Resource, ValidateOptions} from '../../common/types.js';
import {ResourceParser} from '../../common/resourceParser.js';
import {RuleLevel, ValidationResult} from '../../common/sarif.js';
import {loadWasm} from './loadWasm.js';
import {
  CRDExpressions,
  Expression,
  PolicyBindingFilterResponse,
  PolicyExpressionsAndFilteredResources,
} from './types.js';
import * as YAML from 'yaml';
import {isKustomizationPatch, isKustomizationResource} from '../../references/utils/kustomizeRefs.js';
import {ADMISSION_POLICY_RULES} from './rules.js';
import {findJsonPointerNode} from '../../utils/findJsonPointerNode.js';
import {createLocations} from '../../utils/createLocations.js';
import {isDefined} from '../../utils/isDefined.js';
import {getCRDExpressions} from './utils.js';

const KNOWN_RESOURCE_KINDS_PLURAL: Record<string, string> = {
  Deployment: 'deployments',
};

export class AdmissionPolicyValidator extends AbstractPlugin {
  private loadedWasm: boolean | undefined;
  private crdExpressions: CRDExpressions = {};

  constructor(private resourceParser: ResourceParser) {
    super(
      {
        id: 'AP',
        name: 'admission-policy',
        displayName: 'Admission Policy (alpha)',
        description:
          'Ensure that your manifests comply with the conditions specified in the Validating Admission Policies.',
      },
      ADMISSION_POLICY_RULES
    );
  }

  override async configurePlugin(): Promise<void> {
    if (this.loadedWasm === true) return;
    await loadWasm();
    this.loadedWasm = true;
  }

  override registerCustomSchema(schema: CustomSchema, crd?: Resource): void | Promise<void> {
    if (!crd) return;

    const crdExpressions = getCRDExpressions(schema, crd);

    if (!Object.keys(crdExpressions).length) return;

    const schemaKey = `${schema.apiVersion}#${schema.kind}`;

    for (const [key, expressions] of Object.entries(crdExpressions)) {
      this.crdExpressions = {...this.crdExpressions, [schemaKey]: {[key]: expressions}};
    }
  }

  async doValidate(resources: Resource[], options: ValidateOptions): Promise<ValidationResult[]> {
    const results: ValidationResult[] = [];

    for (const [key, keyExpressions] of Object.entries(this.crdExpressions)) {
      const [apiGroupVersion, kind] = key.split('#');

      const crds = resources.filter(r => r.kind === kind && r.apiVersion === apiGroupVersion);

      for (const [property, expressions] of Object.entries(keyExpressions)) {
        for (const expression of expressions) {
          for (const resource of crds) {
            if (property !== '<root>' && !resource.content[property]) continue;

            const errors = await this.validateResource({type: 'crd', resource, expression, level: 'error', property});
            results.push(...errors);
          }
        }
      }
    }

    const resourcesToBeValidated = this.getResourcesToBeValidated(resources);

    for (const [policyName, {resources: filteredResources, expressions, level, params}] of Object.entries(
      resourcesToBeValidated
    )) {
      for (const resource of filteredResources) {
        for (const expression of expressions) {
          const errors = await this.validateResource({
            type: 'validating-admission-policy',
            resource,
            expression,
            level,
            params,
          });

          results.push(...errors);
        }
      }
    }

    return results;
  }

  private async validateResource(args: {
    type: 'crd' | 'validating-admission-policy';
    resource: Resource;
    expression: Expression;
    level: RuleLevel;
    params?: any;
    property?: string;
  }): Promise<ValidationResult[]> {
    const {
      type,
      resource,
      expression: {message, expression},
      level,
      params,
      property,
    } = args;

    let output: any;

    if (type === 'validating-admission-policy') {
      output = (globalThis as any).eval(expression, YAML.stringify({object: resource.content, params})).output;
    } else if (type === 'crd' && property) {
      output = (globalThis as any).eval(
        expression,
        YAML.stringify({self: property === '<root>' ? resource.content : resource.content[property]})
      ).output;
    }

    if (output === 'true' || output.includes('ERROR:') || !output) {
      return [];
    }

    if (output.includes('failed to evaluate')) {
      return [
        this.adaptToValidationResult(
          resource,
          ['kind'],
          'VAP002',
          message ?? 'Admission policy failed to evaluate expression',
          level
        ),
      ].filter(isDefined);
    }

    return [
      this.adaptToValidationResult(
        resource,
        ['kind'],
        'VAP001',
        message ?? 'Admission policy conditions violated',
        level
      ),
    ].filter(isDefined);
  }

  private getPolicies(resources: Resource[]): Resource[] {
    return resources.filter(r => r.kind === 'ValidatingAdmissionPolicy');
  }

  private getPoliciesBindings(resources: Resource[]): Resource[] {
    return resources.filter(r => r.kind === 'ValidatingAdmissionPolicyBinding');
  }

  private getResourcesToBeValidated(resources: Resource[]): PolicyExpressionsAndFilteredResources {
    let filteredResources = resources.filter(r => !isKustomizationPatch(r) && !isKustomizationResource(r));

    const policyResources = this.getPolicies(resources);

    return this.policyFilter(policyResources, this.policyBindingFilter(filteredResources));
  }

  private policyBindingFilter(resources: Resource[]): PolicyBindingFilterResponse {
    const policyFilteredResources: PolicyBindingFilterResponse = {};

    const policiesBindings = this.getPoliciesBindings(resources);

    for (const policyBinding of policiesBindings) {
      const policyName = policyBinding.content?.spec?.policyName;

      if (!policyName) continue;

      const namespaceMatchLabels: Record<string, string> =
        policyBinding.content?.spec?.matchResources?.namespaceSelector?.matchLabels;

      let filteredResources: Resource[] = [];

      if (!namespaceMatchLabels) {
        filteredResources = resources;
      } else {
        const namespacesResources = resources.filter(r => r.kind === 'Namespace');

        const filteredNamespaces = namespacesResources.filter(n => {
          for (const key of Object.keys(namespaceMatchLabels)) {
            if (n.content?.metadata?.labels?.[key] !== namespaceMatchLabels[key]) {
              return false;
            }
          }

          return true;
        });

        filteredResources = resources.filter(r => filteredNamespaces.find(n => n.name === r.namespace));
      }

      if (!filteredResources.length) continue;

      policyFilteredResources[policyName] = {
        resources: filteredResources,
        level: policyBinding.content?.spec?.validationActions?.includes('Deny') ? 'error' : 'warning',
        paramRef: policyBinding.content?.spec?.paramRef,
      };
    }

    return policyFilteredResources;
  }

  private policyFilter(
    policies: Resource[],
    policyFilteredResources: PolicyBindingFilterResponse
  ): PolicyExpressionsAndFilteredResources {
    const filteredResourcesWithExpressions: PolicyExpressionsAndFilteredResources = {};

    for (const [policyName, {resources, level, paramRef}] of Object.entries(policyFilteredResources)) {
      const policy = policies.find(p => p.name === policyName);

      if (!policy) continue;

      const validations = policy.content?.spec?.validations;

      if (!validations?.length) continue;

      const policyResourceRules = policy.content?.spec?.matchConstraints?.resourceRules;

      if (!policyResourceRules?.length) continue;

      const filteredResourcesByPolicy = resources.filter(r => {
        for (const resourceRule of policyResourceRules) {
          const {apiGroups, apiVersions, resources: policyResources} = resourceRule;

          const [resourceApiGroup, resourceApiVersion] = r.apiVersion.split('/');

          if (apiGroups?.length) {
            if (!apiGroups.includes(resourceApiGroup)) {
              return false;
            }
          }

          if (apiVersions?.length) {
            if (!apiVersions.includes(resourceApiVersion)) {
              return false;
            }
          }

          if (policyResources?.length) {
            if (!policyResources.includes(KNOWN_RESOURCE_KINDS_PLURAL[r.kind])) {
              return false;
            }
          }
        }

        return true;
      });

      if (!filteredResourcesByPolicy.length) continue;

      let params: any;

      const paramKind = policy.content?.spec?.paramKind;

      if (paramKind && paramRef) {
        const paramResource = resources.find(
          r =>
            r.kind === paramKind?.kind &&
            r.apiVersion === paramKind?.apiVersion &&
            r.content?.metadata?.name === paramRef.name &&
            r.content?.metadata?.namespace === paramRef.namespace
        );

        if (paramResource) {
          params = paramResource.content;
        }
      }

      filteredResourcesWithExpressions[policy.name] = {
        resources: filteredResourcesByPolicy,
        expressions: validations.map((v: any) => ({
          expression: v.expression,
          message: v.message,
        })),
        level,
        params,
      };
    }

    return filteredResourcesWithExpressions;
  }

  private adaptToValidationResult(
    resource: Resource,
    path: string[],
    ruleId: string,
    errText: string,
    level: RuleLevel
  ) {
    const {parsedDoc} = this.resourceParser.parse(resource);

    const valueNode = findJsonPointerNode(parsedDoc, path);

    const region = this.resourceParser.parseErrorRegion(resource, valueNode.range);

    const locations = createLocations(resource, region);

    return this.createValidationResult(ruleId, {
      message: {
        text: errText,
      },
      locations,
      level,
    });
  }
}
