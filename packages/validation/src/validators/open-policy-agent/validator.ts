import { loadPolicy } from "@open-policy-agent/opa-wasm";
import { isNode, Node } from "yaml";

import get from "lodash/get.js";

import invariant from "tiny-invariant";
import { AbstractValidator } from "../../common/AbstractValidator.js";
import { ResourceParser } from "../../common/resourceParser.js";
import {
  Region,
  ValidationResult,
  ValidationRule,
} from "../../common/sarif.js";
import { Incremental, Resource, ValidatorConfig } from "../../common/types.js";
import { createLocations } from "../../utils/createLocations.js";
import { isDefined } from "../../utils/isDefined.js";
import { OPEN_POLICY_AGENT_RULES } from "./rules.js";
import { LoadedPolicy, OpaProperties, PolicyError } from "./types";
import { WasmLoader } from "./wasmLoader/WasmLoader.js";

export type OpenPolicyAgentConfig = ValidatorConfig<"open-policy-agent"> & {
  plugin: {
    id: "trivy";
    wasmSrc: string; // Either a URL or file path, respectively for web and NodeJs.
    enabled: boolean;
    enabledRules?: string[];
  };
};

const CONTROLLER_KINDS = [
  "Deployment",
  "StatefulSet",
  "Job",
  "DaemonSet",
  "ReplicaSet",
  "ReplicationController",
];

type YamlPath = Array<string | number>;

export class OpenPolicyAgentValidator extends AbstractValidator<
  OpenPolicyAgentConfig,
  OpaProperties
> {
  private validator!: LoadedPolicy;

  constructor(
    private resourceParser: ResourceParser,
    private wasmLoader: WasmLoader
  ) {
    super("open-policy-agent", OPEN_POLICY_AGENT_RULES);
  }

  override async doLoad(config: OpenPolicyAgentConfig): Promise<void> {
    const wasmSrc = config.plugin.wasmSrc;
    const wasm = await this.wasmLoader.load(wasmSrc);
    this.validator = await loadPolicy(wasm);
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

  protected override isRuleEnabled(ruleId: string): boolean {
    const isLegacyEnabled =
      this.config?.plugin.enabledRules?.includes(ruleId) ?? false;
    return super.isRuleEnabled(ruleId) || isLegacyEnabled;
  }

  private async validateResource(
    resource: Resource
  ): Promise<ValidationResult[]> {
    if (isManagedByKustomize(resource)) {
      return [];
    }

    const enabledRules = this.rules.filter((r) => this.isRuleEnabled(r.id));

    const errors = enabledRules.flatMap((rule) => {
      return this.validatePolicyRule(resource, rule);
    });

    return errors;
  }

  private validatePolicyRule(
    resource: Resource,
    rule: ValidationRule<OpaProperties>
  ): ValidationResult[] {
    const entrypoint = rule.properties?.entrypoint;
    invariant(entrypoint, "Validator's rule misconfigured");
    const evaluation = this.validator.evaluate(resource.content, entrypoint);

    const violations: PolicyError[] = evaluation[0]?.result ?? [];
    const errors = violations
      .map((err) => this.adaptToValidationResult(resource, rule, err))
      .filter(isDefined);

    return errors;
  }

  private adaptToValidationResult(
    resource: Resource,
    rule: ValidationRule<OpaProperties>,
    err: PolicyError
  ) {
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

  private determineErrorRegion(
    resource: Resource,
    pathHint?: string,
    container?: string
  ): Region {
    if (!pathHint) {
      return this.createRefPositionFallback(resource);
    }

    const path = pathHint.split(".");
    const isContainer = path[0] === "$container";

    if (isContainer && !container) {
      return this.createRefPositionFallback(resource);
    }

    if (isContainer) path.shift(); // drop $container keyword
    const prefix =
      isContainer && container
        ? this.determineContainerPrefix(resource, container)
        : [];
    const node = this.determineClosestErrorNode(resource, path, prefix);
    return this.createRefPosition(resource, node);
  }

  /**
   * Ref position fallback is the resource kind to ensure VSC shows proper highlight.
   */
  private createRefPositionFallback(resource: Resource): Region {
    const node = this.determineClosestErrorNode(resource, ["kind"]);
    return this.createRefPosition(resource, node);
  }

  private createRefPosition(
    resource: Resource,
    node: Node | undefined
  ): Region {
    if (!node || !node.range) {
      return { startLine: 1, startColumn: 1, endColumn: 1, endLine: 1 };
    }

    return this.resourceParser.parseErrorRegion(resource, node.range);
  }

  private determineContainerPrefix(
    resource: Resource,
    container: string
  ): YamlPath {
    if (CONTROLLER_KINDS.includes(resource.kind)) {
      const prefix: YamlPath = ["spec", "template", "spec"];
      const containerIndex = this.determineContainerIndex(
        resource,
        container,
        prefix,
        ["initContainers", "containers"]
      );
      return prefix.concat(containerIndex);
    }
    if (resource.kind === "CronJob") {
      const prefix: YamlPath = [
        "spec",
        "jobTemplate",
        "spec",
        "template",
        "spec",
      ];
      const containerIndex = this.determineContainerIndex(
        resource,
        container,
        prefix,
        ["containers"]
      );
      return prefix.concat(containerIndex);
    }
    if (resource.kind === "Pod") {
      const prefix: YamlPath = ["spec"];
      const containerIndex = this.determineContainerIndex(
        resource,
        container,
        prefix,
        ["containers"]
      );
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
      const containers: { name: string }[] =
        get(resource.content, prefix.concat(property), []) ?? [];
      const containerIndex = containers.findIndex((c) => c.name === container);
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
  private determineClosestErrorNode(
    resource: Resource,
    path: YamlPath,
    prefix: YamlPath = []
  ): Node | undefined {
    const { parsedDoc } = this.resourceParser.parse(resource);

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
  if (resource.kind === "Kustomization") {
    return true;
  }

  if (resource.name.startsWith("Patch: ")) {
    return true;
  }

  return false;
}
