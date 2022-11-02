import difference from "lodash/difference.js";
import clone from "lodash/clone.js";
import isEqual from "lodash/isEqual.js";
import { ResourceParser } from "./common/resourceParser.js";
import type { ValidationResponse } from "./common/sarif.js";
import type { Incremental, Resource, Plugin } from "./common/types.js";
import { Config, PluginMap } from "./config/parse.js";
import { nextTick, throwIfAborted } from "./utils/abort.js";
import { isDefined } from "./utils/isDefined.js";
import { SimpleCustomValidator } from "./validators/custom/simpleValidator.js";
import { SchemaLoader } from "./validators/kubernetes-schema/schemaLoader.js";
import { KubernetesSchemaValidator } from "./validators/kubernetes-schema/validator.js";
import { RemoteWasmLoader } from "./validators/open-policy-agent/index.js";
import { OpenPolicyAgentValidator } from "./validators/open-policy-agent/validator.js";
import { ResourceLinksValidator } from "./validators/resource-links/validator.js";
import { YamlValidator } from "./validators/yaml-syntax/validator.js";
import plugin from "./validators/labels/plugin.js";

export type PluginLoader = (name: string) => Promise<Plugin>;

export function createMonokleValidator(
  loader: PluginLoader,
  fallback?: PluginMap
) {
  return new MonokleValidator(loader, fallback);
}

/**
 * Creates a Monokle validator that can dynamically fetch custom plugins.
 *
 * @remark NodeJs does not yet support ESM HTTP URLs. Instead use `createExtensibleNodeMonokleValidator`.
 */
export function createExtensibleMonokleValidator(
  parser: ResourceParser = new ResourceParser(),
  schemaLoader: SchemaLoader = new SchemaLoader()
) {
  return new MonokleValidator(async (pluginName: string) => {
    switch (pluginName) {
      case "open-policy-agent":
        const wasmLoader = new RemoteWasmLoader();
        return new OpenPolicyAgentValidator(parser, wasmLoader);
      case "resource-links":
        return new ResourceLinksValidator();
      case "yaml-syntax":
        return new YamlValidator(parser);
      case "labels":
        const labelPlugin = await import("./validators/labels/plugin.js");
        return new SimpleCustomValidator(labelPlugin.default, parser);
      case "kubernetes-schema":
        return new KubernetesSchemaValidator(parser, schemaLoader);
      default:
        try {
          const customPlugin = await import(
            "http://localhost:4111/plugin.js" as unknown as any
          );
          return new SimpleCustomValidator(customPlugin.default, parser);
        } catch (err) {
          const msg = err instanceof Error ? err.message : "unknown reason";
          throw new Error(`plugin_not_found: ${msg}`);
        }
    }
  });
}

export function createDefaultMonokleValidator(
  parser: ResourceParser = new ResourceParser(),
  schemaLoader: SchemaLoader = new SchemaLoader()
) {
  return new MonokleValidator(createDefaultPluginLoader(parser, schemaLoader));
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
        const labelPlugin = await import("./validators/labels/plugin.js");
        return new SimpleCustomValidator(labelPlugin.default, parser);
      case "kubernetes-schema":
        return new KubernetesSchemaValidator(parser, schemaLoader);
      default:
        throw new Error("plugin_not_found");
    }
  };
}

/**
 * The plugins that will be loaded by default.
 */
const DEFAULT_PLUGIN_MAP = {
  "open-policy-agent": true,
  "resource-links": true,
  "yaml-syntax": true,
  "kubernetes-schema": true,
};

export class MonokleValidator {
  /**
   * The configuration of this validator.
   */
  #config?: Config;

  /**
   * The fallback configuration of this validator.
   *
   * This is here for sane defaults, but the moment you
   * set configuration it's not taken into consideration
   * to make it easier to reason about what you get.
   */
  #fallback: Config;

  #abortController: AbortController = new AbortController();
  #loading?: Promise<void>;
  #loader: PluginLoader;
  #previousPluginsInit?: Record<string, boolean>;
  #plugins: Plugin[] = [];
  #failedPlugins: string[] = [];

  constructor(loader: PluginLoader, fallback: PluginMap = DEFAULT_PLUGIN_MAP) {
    this.#loader = loader;
    this.#fallback = { plugins: fallback };
    this.#config = this.#fallback;
  }

  get config(): Config {
    return this.#config ?? this.#fallback;
  }

  set config(value: Config | undefined) {
    this.#config = value;
    this.cancelLoad("reconfigured");
  }

  /**
   * Whether the rule exists in some plugin.
   *
   * @params - Either the rule identifier or display name.
   * @example "KSV013" or "open-policy-agent/no-latest-image"
   */
  hasRule(rule: string): boolean {
    return this.#plugins.some((p) => p.hasRule(rule));
  }

  /**
   * Whether the rule is enabled in some plugin.
   *
   * @params rule - Either the rule identifier or display name.
   * @example "KSV013" or "open-policy-agent/no-latest-image"
   */
  isRuleEnabled(rule: string) {
    return this.#plugins.some((p) => p.isRuleEnabled(rule));
  }

  /**
   * Whether the plugin is loaded.
   *
   * @params name - The plugin name.
   * @example "open-policy-agent"
   */
  isPluginLoaded(name: string): boolean {
    return this.#plugins.some((p) => p.metadata.name === name);
  }

  /**
   * The plugins that are loaded in this validator.
   */
  getPlugins(): Plugin[] {
    return this.#plugins;
  }

  /**
   * The plugins that failed to load in this validator.
   */
  getFailedPlugins(): string[] {
    return this.#failedPlugins;
  }

  /**
   * The plugin with the given name.
   *
   * @params name - The plugin name
   */
  getPlugin(name: string): Plugin | undefined {
    return this.#plugins.find((p) => p.metadata.name === name);
  }

  /**
   * Eagerly load and configure the validation plugins.
   *
   * @param config - the new configuration of the validator.
   */
  async preload(config?: Config): Promise<void> {
    if (config) {
      this.config = config;
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
    const config = this.config;
    const previousPlugins = this.#previousPluginsInit;
    this.#failedPlugins = [];

    if (!isEqual(config.plugins, previousPlugins)) {
      // All validators found in configuration are loaded.
      // That way the plugin and rule metadata becomes available.
      const pluginsConfig = config.plugins ?? {};

      // Load new plugins
      const newPluginNames = Object.keys(pluginsConfig ?? {});

      for (const pluginName of newPluginNames) {
        if (this.isPluginLoaded(pluginName)) continue;
        try {
          const validator = await this.#loader(pluginName);
          if (signal.aborted) return;
          this.#plugins.push(validator);
        } catch (err) {
          this.#failedPlugins.push(pluginName);
          if (config.settings?.["debug"]) {
            console.error(err);
          }
        }
      }

      // Unload stale plugins
      const previousPluginNames = Object.keys(this.#previousPluginsInit ?? {});
      const stalePlugins = difference(previousPluginNames, newPluginNames);
      for (const pluginName of stalePlugins) {
        const plugin = this.getPlugin(pluginName);
        if (!plugin) continue;
        await plugin.unload();
        this.#plugins = this.#plugins.filter(
          (p) => p.metadata.name !== pluginName
        );
      }

      // Toggle validators
      for (const validator of this.#plugins) {
        const value = pluginsConfig[validator.metadata.name];
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

    if (this.config.settings?.debug && allRuns.length !== runs.length) {
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
    this.config = undefined;
  }
}
