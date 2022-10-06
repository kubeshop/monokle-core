import isArray from "lodash/isArray.js";
import invariant from "tiny-invariant";
import { ResourceParser } from "./common/resourceParser.js";
import type { ValidationResponse } from "./common/sarif.js";
import type {
  Incremental,
  Resource,
  Validator,
  ValidatorConstructor,
} from "./common/types.js";
import { NOT_FOUND_ERR_MSG } from "./constants.js";
import { isDefined } from "./utils/isDefined.js";
import type { KubernetesSchemaConfig } from "./validators/kubernetes-schema/validator.js";
import type { LabelsValidatorConfig } from "./validators/labels/validator.js";
import type { OpenPolicyAgentConfig } from "./validators/open-policy-agent/validator.js";
import type { ResourceLinksValidatorConfig } from "./validators/resource-links/validator.js";
import type { YamlValidatorConfig } from "./validators/yaml-syntax/validator.js";
import type { ToolConfig } from "./common/types.js";

type Config = {
  debug?: boolean;
  parser?: ResourceParser;
};

export type ValidatorConfig =
  | LabelsValidatorConfig
  | KubernetesSchemaConfig
  | YamlValidatorConfig
  | OpenPolicyAgentConfig
  | ResourceLinksValidatorConfig
  | ToolConfig;

export class MonokleValidator {
  #validators: Validator[];

  constructor(
    validators: (Validator | ValidatorConstructor)[],
    private config: Config = {}
  ) {
    const parser = config.parser ?? new ResourceParser();
    this.#validators = validators.map((v) =>
      typeof v === "function" ? new v(parser) : v
    );
  }

  get tools() {
    return this.#validators;
  }

  async configure(config: ValidatorConfig | ValidatorConfig[]): Promise<void> {
    const normalizedConfig = isArray(config) ? config : [config];

    await Promise.all(
      normalizedConfig.map((c) => {
        const validator = this.#validators.find((v) => v.name === c.tool);
        invariant(validator, NOT_FOUND_ERR_MSG(c.tool));
        return validator.load(c);
      })
    );
  }

  /**
   * Validates the resources.
   */
  async validate(
    resources: Resource[],
    incremental?: Incremental
  ): Promise<ValidationResponse> {
    const validators = this.#validators.filter((v) => v.enabled);

    const allRuns = await Promise.allSettled(
      validators.map((v) => v.validate(resources, incremental))
    );

    const runs = allRuns
      .map((run) => (run.status === "fulfilled" ? run.value : undefined))
      .filter(isDefined);

    if (this.config.debug && allRuns.length !== runs.length) {
      const failedRuns = allRuns.filter((r) => r.status === "rejected");
      // eslint-disable-next-line no-console
      console.warn("skipped failed validators", failedRuns);
    }

    return {
      $schema: "https://json.schemastore.org/sarif-2.1.0.json",
      version: "2.1.0",
      runs,
    };
  }

  /**
   * Clear the incremental caches.
   */
  async clear(): Promise<void> {}
}
