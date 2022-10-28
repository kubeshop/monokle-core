import clone from "lodash/clone.js";
import isEqual from "lodash/isEqual.js";
import merge from "lodash/merge.js";
import { ResourceParser } from "./common/resourceParser.js";
import type { ValidationResponse } from "./common/sarif.js";
import type { Incremental, Resource, Plugin } from "./common/types.js";
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

export type PluginLoader = (name: string) => Promise<Plugin>;

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
  #plugins: Plugin[] = [];

  constructor(
    loader: PluginLoader,
    defaultConfig: Pick<Config, "plugins"> = {}
  ) {
    this.#loader = loader;
    this.#config = {
      default: defaultConfig,
      merged: defaultConfig,
    };
  }

  get config() {
    return this.#config;
  }

  /**
   * Whether the rule exists in some plugin.
   *
   * @rule Either the rule identifier or display name.
   * @example "KSV013" or "open-policy-agent/no-latest-image"
   */
  hasRule(rule: string): boolean {
    return this.#plugins.some((p) => p.hasRule(rule));
  }

  /**
   * Whether the rule is enabled in some plugin.
   *
   * @rule Either the rule identifier or display name.
   * @example "KSV013" or "open-policy-agent/no-latest-image"
   */
  isRuleEnabled(rule: string) {
    return this.#plugins.some((p) => p.isRuleEnabled(rule));
  }

  isPluginLoaded(name: string): boolean {
    return this.#plugins.some((p) => p.name === name);
  }

  getPlugins() {
    return this.#plugins;
  }

  getPlugin(name: string) {
    return this.#plugins.find((p) => p.name === name);
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

    return this.load();
  }

  /**
   * Load the plugin and prepare it.
   * Afterwards plugin and rule metadata are available.
   *
   * @see config.plugins
   */
  private load() {
    this.#abortController.abort();
    this.#abortController = new AbortController();
    this.#loading = this.doLoad(this.#abortController.signal);
    return this.#loading;
  }

  private cancelLoad(reason: string = "cancelled") {
    this.#abortController.abort(reason);
    this.#loading = undefined;
  }

  private async doLoad(signal: AbortSignal) {
    const config = this.#config.merged;
    const previousPlugins = this.#previousPluginsInit;

    if (!isEqual(config.plugins, previousPlugins)) {
      // All validators found in configuration are loaded.
      // That way the plugin and rule metadata becomes available.
      const pluginsConfig = config.plugins ?? {};

      for (const name of Object.keys(pluginsConfig)) {
        if (this.isPluginLoaded(name)) continue;
        const validator = await this.#loader(name);
        if (signal.aborted) return;
        this.#plugins.push(validator);
      }

      // Toggle validators
      for (const validator of this.#plugins) {
        const value = pluginsConfig[validator.name];
        validator.enabled = Boolean(value);
      }

      this.#previousPluginsInit = clone(pluginsConfig);
    }

    // Configure validators
    await Promise.allSettled(
      this.#plugins.map((p) =>
        p.configure({
          rules: config.rules,
          settings: config.settings,
        })
      )
    );
  }

  /**
   * Validates the resources.
   */
  async validate({
    resources,
    incremental,
    abortSignal: externalAbortSignal,
  }: {
    resources: Resource[];
    incremental?: Incremental;
    abortSignal?: AbortSignal;
  }): Promise<ValidationResponse> {
    if (this.#loading === undefined) {
      this.load();
    }
    const loadAbortSignal = this.#abortController.signal;
    await this.#loading;
    throwIfAborted(loadAbortSignal, externalAbortSignal);

    const validators = this.#plugins.filter((v) => v.enabled);

    await nextTick();
    throwIfAborted(loadAbortSignal, externalAbortSignal);

    const allRuns = await Promise.allSettled(
      validators.map((v) => v.validate(resources, incremental))
    );
    throwIfAborted(loadAbortSignal, externalAbortSignal);

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
    await Promise.all(this.#plugins.map((v) => v.clear()));
  }

  async unload(): Promise<void> {
    this.cancelLoad("unload");
    this.configureFile(undefined);
    this.configureArgs(undefined);
  }
}
