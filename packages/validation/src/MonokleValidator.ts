import isEqual from "lodash/isEqual.js";
import merge from "lodash/merge.js";
import { ResourceParser } from "./common/resourceParser.js";
import type { ValidationResponse } from "./common/sarif.js";
import type { Incremental, Resource, Validator } from "./common/types.js";
import { Config } from "./config/parse.js";
import { nextTick, throwIfAborted } from "./utils/abort.js";
import { isDefined } from "./utils/isDefined.js";
import { SchemaLoader } from "./validators/kubernetes-schema/schemaLoader.js";
import { KubernetesSchemaValidator } from "./validators/kubernetes-schema/validator.js";
import { LabelsValidator } from "./validators/labels/validator.js";
import { RemoteWasmLoader } from "./validators/open-policy-agent/index.js";
import { OpenPolicyAgentValidator } from "./validators/open-policy-agent/validator.js";
import { ResourceLinksValidator } from "./validators/resource-links/validator.js";
import { YamlValidator } from "./validators/yaml-syntax/validator.js";

export type PluginLoader = (name: string) => Promise<Validator>;

export function createMonokleValidator(
  loader: PluginLoader,
  defaultConfig?: Config
) {
  return new MonokleValidator(loader, defaultConfig);
}

export function createDefaultMonokleValidator(
  parser: ResourceParser = new ResourceParser(),
  schemaLoader: SchemaLoader = new SchemaLoader()
) {
  return new MonokleValidator(createDefaultPluginLoader(parser, schemaLoader), {
    plugins: {
      "open-policy-agent": true,
      "resource-links": true,
      "yaml-syntax": true,
      labels: true,
      "kubernetes-schema": true,
    },
  });
}

export function createDefaultPluginLoader(
  parser: ResourceParser = new ResourceParser(),
  schemaLoader: SchemaLoader = new SchemaLoader()
) {
  return async (pluginName: string) => {
    switch (pluginName) {
      case "open-policy-agent":
        const wasmLoader = new RemoteWasmLoader();
        return new OpenPolicyAgentValidator(parser, wasmLoader);
      case "resource-links":
        return new ResourceLinksValidator();
      case "yaml-syntax":
        return new YamlValidator(parser);
      case "labels":
        return new LabelsValidator(parser);
      case "kubernetes-schema":
        return new KubernetesSchemaValidator(parser, schemaLoader);
      default:
        throw new Error("validator_not_found");
    }
  };
}

export class MonokleValidator {
  #config: {
    default: Config;
    file?: Config;
    args?: Config;
    merged: Config;
  };

  #abortController: AbortController = new AbortController();
  #loading?: Promise<void>;
  #loader: PluginLoader;
  #previousPluginsInit?: Record<string, boolean>;
  #validators: Validator[] = [];

  constructor(loader: PluginLoader, defaultConfig: Config = {}) {
    this.#loader = loader;
    this.#config = {
      default: defaultConfig,
      merged: defaultConfig,
    };
  }

  get config() {
    return this.#config;
  }

  isRuleEnabled(rule: string) {
    return Boolean(this.#config.merged.rules?.[rule]);
  }

  isPluginEnabled(name: string): boolean {
    return Boolean(this.#config.merged.plugins?.[name]);
  }

  configureFile(config: Config | undefined) {
    this.#config.file = config;
    this.#config.merged = this.mergeConfiguration();
    this.cancelLoad("configuration-file-updated");
  }

  configureArgs(config: Config | undefined) {
    this.#config.args = config;
    this.#config.merged = this.mergeConfiguration();
    this.cancelLoad("args-updated");
  }

  private mergeConfiguration(): Config {
    return merge(this.#config.default, this.#config.file, this.#config.args);
  }

  get tools() {
    return this.#validators;
  }

  /**
   * Eagerly load and configure the validation plugins.
   *
   * @param config
   */
  async preload(config: { file?: Config; args?: Config } = {}): Promise<void> {
    if (config.file === undefined || typeof config.file === "object") {
      this.configureFile(config.file);
    }
    if (config.args === undefined || typeof config.args === "object") {
      this.configureArgs(config.args);
    }

    await this.load();
  }

  private async load() {
    this.#abortController.abort();
    this.#abortController = new AbortController();
    this.#loading = this.doLoad(this.#abortController.signal);
  }

  private cancelLoad(reason: string = "cancelled") {
    this.#abortController.abort(reason);
    this.#loading = undefined;
  }

  private async doLoad(signal: AbortSignal) {
    const config = this.#config.merged;
    const previousPlugins = this.#previousPluginsInit;

    if (!isEqual(config.plugins, previousPlugins)) {
      // Ensure all validators are loaded
      const plugins = config.plugins ?? {};

      for (const [name, value] of Object.entries(plugins)) {
        if (!value) continue;
        const hasValidator = this.#validators.find((v) => v.name === name);
        if (hasValidator) continue;
        const validator = await this.#loader(name);
        if (signal.aborted) return;
        this.#validators.push(validator);
      }

      // Toggle validators
      for (const validator of this.#validators) {
        const value = plugins[validator.name];
        validator.enabled = Boolean(value);
      }

      this.#previousPluginsInit = plugins;
    }

    // Configure validators
    for (const validator of this.#validators) {
      await validator.configure({
        rules: config.rules,
        settings: config.settings,
      });
      if (signal.aborted) return;
    }
  }

  /**
   * Validates the resources.
   */
  async validate({
    resources,
    incremental,
  }: {
    resources: Resource[];
    incremental?: Incremental;
  }): Promise<ValidationResponse> {
    if (this.#loading === undefined) {
      this.load();
    }
    await this.#loading;

    const validators = this.#validators.filter((v) => v.enabled);
    const abortSignal = this.#abortController.signal;

    await nextTick();
    throwIfAborted(abortSignal);

    const allRuns = await Promise.allSettled(
      validators.map((v) => v.validate(resources, incremental))
    );
    throwIfAborted(abortSignal);

    const runs = allRuns
      .map((run) => (run.status === "fulfilled" ? run.value : undefined))
      .filter(isDefined);

    if (this.#config.merged.settings?.debug && allRuns.length !== runs.length) {
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
  async clear(): Promise<void> {
    await Promise.all(this.#validators.map((v) => v.clear()));
  }

  async unload(): Promise<void> {
    this.cancelLoad("unload");
    this.configureFile(undefined);
    this.configureArgs(undefined);
  }
}
