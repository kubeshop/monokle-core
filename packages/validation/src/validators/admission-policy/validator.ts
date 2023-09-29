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
        displayName: 'Admission Policy',
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

    const versions = crd.content?.spec?.versions;

    if (!versions?.length) return;

    const [, apiName] = schema.apiVersion.split('/');

    const version = versions.find((v: any) => v.name === apiName);

    if (!version) return;

    const validationExpressions = version.schema?.openAPIV3Schema?.properties?.spec?.['x-kubernetes-validation'];

    if (!validationExpressions?.length) return;

    const key = `${schema.apiVersion}#${schema.kind}`;

    this.crdExpressions = {...this.crdExpressions, [key]: []};

    for (const expression of validationExpressions) {
      this.crdExpressions[key].push({expression: expression.rule, message: expression.message});
    }

    console.log(this.crdExpressions);
  }

  async doValidate(resources: Resource[], options: ValidateOptions): Promise<ValidationResult[]> {
    const results: ValidationResult[] = [];
    console.log('Do validate:', this.crdExpressions);

    const resourcesToBeValidated = this.getResourcesToBeValidated(resources);

    for (const [policyName, {resources: filteredResources, expressions, level, params}] of Object.entries(
      resourcesToBeValidated
    )) {
      for (const resource of filteredResources) {
        for (const expression of expressions) {
          const errors = await this.validateResource(resource, expression, level, params);

          results.push(...errors);
        }
      }
    }

    return results;
  }

  private async validateResource(
    resource: Resource,
    {message, expression}: Expression,
    level: RuleLevel,
    params?: any
  ): Promise<ValidationResult[]> {
    const output = (globalThis as any).eval(expression, YAML.stringify({object: resource.content, params})).output;

    if (output === 'true' || output.includes('ERROR:')) {
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
