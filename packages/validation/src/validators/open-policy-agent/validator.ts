// @ts-ignore
import {loadPolicy} from '@open-policy-agent/opa-wasm';
import {isNode, Node} from 'yaml';

import get from 'lodash/get.js';

import {z} from 'zod';
import {AbstractPlugin} from '../../common/AbstractPlugin.js';
import {ResourceParser} from '../../common/resourceParser.js';
import {Region, ValidationResult, RuleMetadata} from '../../common/sarif.js';
import {Resource, ValidateOptions, YamlPath} from '../../common/types.js';
import {createLocations} from '../../utils/createLocations.js';
import {isDefined} from '../../utils/isDefined.js';
import {OPEN_POLICY_AGENT_RULES} from './rules.js';
import {LoadedPolicy, OpaProperties, PolicyError} from './types.js';
import {WasmLoader} from './wasmLoader/WasmLoader.js';
import {isKustomizationResource} from '../../references/utils/kustomizeRefs.js';
import invariant from '../../utils/invariant.js';
import {CUSTOM_PLUGINS_URL_BASE} from '../../constants.js';

type Settings = z.infer<typeof Settings>;

const Settings = z.object({
  wasmSrc: z.string().default(`${CUSTOM_PLUGINS_URL_BASE}/open-policy-agent/trivy.wasm`),
});

const CONTROLLER_KINDS = ['Deployment', 'StatefulSet', 'Job', 'DaemonSet', 'ReplicaSet', 'ReplicationController'];

export class OpenPolicyAgentValidator extends AbstractPlugin {
  static toolName = 'open-policy-agent';

  private _settings!: Settings;
  private validator: LoadedPolicy | undefined;

  constructor(private resourceParser: ResourceParser, private wasmLoader: WasmLoader) {
    super(
      {
        id: 'KSV',
        name: 'open-policy-agent',
        displayName: 'Security Policies (OPA)',
        description:
          'Security policies using Open Policy Agent (OPA). Flexible, fine-grained control for administrators across the stack.',
        icon: 'open-policy-agent',
        learnMoreUrl: 'https://github.com/open-policy-agent/opa',
      },
      OPEN_POLICY_AGENT_RULES
    );
  }

  override async configurePlugin(settings: any = {}): Promise<void> {
    if (this.validator) return;
    this._settings = Settings.parse(settings['open-policy-agent'] ?? {});
    const wasmSrc = this._settings.wasmSrc;
    const wasm = await this.wasmLoader.load(wasmSrc);
    this.validator = await loadPolicy(wasm);
  }

  async doValidate(resources: Resource[], {incremental}: ValidateOptions): Promise<ValidationResult[]> {
    const results: ValidationResult[] = [];

    const dirtyResources = incremental ? resources.filter(r => incremental.resourceIds.includes(r.id)) : resources;

    for (const resource of dirtyResources) {
      const resourceErrors = await this.validateResource(resource);
      results.push(...resourceErrors);
    }

    return results;
  }

  private async validateResource(resource: Resource): Promise<ValidationResult[]> {
    if (isManagedByKustomize(resource)) {
      return [];
    }

    const enabledRules = this.rules.filter(r => this.isRuleEnabled(r.id));

    const errors = enabledRules.flatMap(rule => {
      return this.validatePolicyRule(resource, rule as RuleMetadata<OpaProperties>);
    });

    return errors;
  }

  private validatePolicyRule(resource: Resource, rule: RuleMetadata<OpaProperties>): ValidationResult[] {
    const entrypoint = rule.properties?.entrypoint;
    invariant(entrypoint, "Validator's rule misconfigured");
    invariant(this.validator, 'Validator has not been configured properly');
    const evaluation = this.validator.evaluate(resource.content, entrypoint);

    const violations: PolicyError[] = evaluation[0]?.result ?? [];
    const errors = violations.map(err => this.adaptToValidationResult(resource, rule, err)).filter(isDefined);

    return errors;
  }

  private adaptToValidationResult(resource: Resource, rule: RuleMetadata<OpaProperties>, err: PolicyError) {
    const regexMatch = err.msg?.match(/Container '([A-Za-z-]*)'/);
    const container = regexMatch ? regexMatch[1] : undefined;
    const description = container
      ? `${rule.shortDescription.text} on container "${container}".`
      : rule.shortDescription.text;
    // const property = rule.properties.path?.replace(/\./g, '/') ?? resource.name;

    const pathHint = rule.properties?.path;
    const region = this.determineErrorRegion(resource, pathHint, container);
    const locations = createLocations(resource, region);

    return this.createValidationResult(rule.id, {
      message: {
        text: description,
      },
      locations,
    });
  }

  private determineErrorRegion(resource: Resource, pathHint?: string, container?: string): Region {
    if (!pathHint) {
      return this.createRefPositionFallback(resource);
    }

    const path = pathHint.split('.');
    const isContainer = path[0] === '$container';

    if (isContainer && !container) {
      return this.createRefPositionFallback(resource);
    }

    if (isContainer) path.shift(); // drop $container keyword
    const prefix = isContainer && container ? this.determineContainerPrefix(resource, container) : [];
    const node = this.determineClosestErrorNode(resource, path, prefix);
    return this.createRefPosition(resource, node);
  }

  /**
   * Ref position fallback is the resource kind to ensure VSC shows proper highlight.
   */
  private createRefPositionFallback(resource: Resource): Region {
    const node = this.determineClosestErrorNode(resource, ['kind']);
    return this.createRefPosition(resource, node);
  }

  private createRefPosition(resource: Resource, node: Node | undefined): Region {
    if (!node || !node.range) {
      return {startLine: 1, startColumn: 1, endColumn: 1, endLine: 1};
    }

    return this.resourceParser.parseErrorRegion(resource, node.range);
  }

  private determineContainerPrefix(resource: Resource, container: string): YamlPath {
    if (CONTROLLER_KINDS.includes(resource.kind)) {
      const prefix: YamlPath = ['spec', 'template', 'spec'];
      const containerIndex = this.determineContainerIndex(resource, container, prefix, [
        'initContainers',
        'containers',
      ]);
      return prefix.concat(containerIndex);
    }
    if (resource.kind === 'CronJob') {
      const prefix: YamlPath = ['spec', 'jobTemplate', 'spec', 'template', 'spec'];
      const containerIndex = this.determineContainerIndex(resource, container, prefix, ['containers']);
      return prefix.concat(containerIndex);
    }
    if (resource.kind === 'Pod') {
      const prefix: YamlPath = ['spec'];
      const containerIndex = this.determineContainerIndex(resource, container, prefix, ['containers']);
      return prefix.concat(containerIndex);
    }
    return [];
  }

  private determineContainerIndex(
    resource: Resource,
    container: string,
    prefix: YamlPath,
    properties: string[]
  ): YamlPath {
    for (let i = 0; i < properties.length; i += 1) {
      const property = properties[i];
      const containers: {name: string}[] = get(resource.content, prefix.concat(property), []) ?? [];
      const containerIndex = containers.findIndex(c => c.name === container);
      if (containerIndex !== -1) {
        return [property, containerIndex];
      }
    }
    return [];
  }

  /**
   * Use a path hint to determine the node of the error or closest parent.
   *
   * Example:
   * - Hint: $container.securityContext.readOnlyRootFilesystem and desired value is `true`.
   * - When $container specifies `securityContext.readOnlyRootFilesystem` then it underlines the incorrect `false` value.
   * - When $container specifies `securityContext` then it underlines whole context object.
   * - When $container does not specify `securityContext` then it underlines whole container object.
   */
  private determineClosestErrorNode(resource: Resource, path: YamlPath, prefix: YamlPath = []): Node | undefined {
    const {parsedDoc} = this.resourceParser.parse(resource);

    const currentPath = prefix.concat(path);
    while (currentPath.length > prefix.length) {
      const node = parsedDoc.getIn(currentPath, true);

      if (isNode(node)) {
        return node;
      }

      currentPath.pop();
    }

    const node = parsedDoc.getIn(currentPath, true);
    return isNode(node) ? node : undefined;
  }
}

function isManagedByKustomize(resource: Resource): boolean {
  if (isKustomizationResource(resource)) {
    return true;
  }

  if (resource.name.startsWith('Patch: ')) {
    return true;
  }

  return false;
}
