import invariant from "tiny-invariant";
import { ResourceParser } from "./common/resourceParser.js";
import { ValidationResponse } from "./common/sarif.js";
import {
  Incremental,
  Resource,
  Validator,
  ValidatorConstructor,
} from "./common/types.js";
import { isDefined } from "./utils/isDefined.js";
import { LabelsValidatorConfig } from "./validators/labels/validator.js";
import { OpenPolicyAgentConfig } from "./validators/open-policy-agent/validator.js";

type Config = {
  debug?: boolean;
  parser?: ResourceParser;
};

type ValidatorConfig = LabelsValidatorConfig | OpenPolicyAgentConfig;

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

  async configure(config: ValidatorConfig): Promise<void> {
    const validator = this.#validators.find((v) => v.name === config.tool);
    invariant(validator, "validator not found");
    await validator.load(config);
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
