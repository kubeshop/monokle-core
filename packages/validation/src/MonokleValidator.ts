import clone from 'lodash/clone.js';
import difference from 'lodash/difference.js';
import isEqual from 'react-fast-compare';
import type {Tool, ValidationResponse, ValidationRun} from './common/sarif.js';
import type {CustomSchema, Incremental, Plugin, Resource} from './common/types.js';
import {Config, PluginMap} from './config/parse.js';
import {PluginMetadataWithConfig, PluginName, RuleMetadataWithConfig, Validator} from './types.js';
import {nextTick, throwIfAborted} from './utils/abort.js';
import {extractSchema, findDefaultVersion} from './utils/customResourceDefinitions.js';
import {PluginLoadError} from './utils/error.js';
import invariant from './utils/invariant.js';
import {isDefined} from './utils/isDefined.js';
import {NSA_TAXONOMY} from './taxonomies/nsa.js';
import {CIS_TAXONOMY} from './taxonomies/cis.js';

export type PluginLoader = (name: string) => Promise<Plugin>;

export function createMonokleValidator(loader: PluginLoader, fallback?: PluginMap) {
  return new MonokleValidator(loader, fallback);
}

/**
 * The plugins that will be loaded by default.
 */
const DEFAULT_PLUGIN_MAP = {
  'open-policy-agent': true,
  'resource-links': true,
  'yaml-syntax': true,
  'kubernetes-schema': true,
};

export class MonokleValidator implements Validator {
  /**
   * The user configuration of this validator.
   */
  _config?: Config;

  /**
   * The fallback configuration of this validator.
   *
   * This is here for sane defaults, but the moment you
   * set configuration it's not taken into consideration
   * to make it easier to reason about what you get.
   */
  _fallback: Config;

  _abortController: AbortController = new AbortController();
  _loading?: Promise<void>;
  _loader: PluginLoader;
  _previousPluginsInit?: Record<string, boolean>;
  _plugins: Plugin[] = [];
  _failedPlugins: string[] = [];
  _customSchemas: Set<string> = new Set();

  constructor(loader: PluginLoader, fallback: PluginMap = DEFAULT_PLUGIN_MAP) {
    this._loader = loader;
    this._fallback = {plugins: fallback};
    this._config = this._fallback;
  }

  get config(): Config {
    return this._config ?? this._fallback;
  }

  get metadata(): Record<PluginName, PluginMetadataWithConfig> {
    const entries = this._plugins.map(p => [p.metadata.name, p.metadata]);
    return Object.fromEntries(entries);
  }

  get rules(): Record<PluginName, RuleMetadataWithConfig[]> {
    const entries = this._plugins.map(p => [p.metadata.name, p.rules]);
    return Object.fromEntries(entries);
  }

  /**
   * Whether the rule exists in some plugin.
   *
   * @params - Either the rule identifier or display name.
   * @example "KSV013" or "open-policy-agent/no-latest-image"
   */
  hasRule(rule: string): boolean {
    return this._plugins.some(p => p.hasRule(rule));
  }

  /**
   * Whether the rule is enabled in some plugin.
   *
   * @params rule - Either the rule identifier or display name.
   * @example "KSV013" or "open-policy-agent/no-latest-image"
   */
  isRuleEnabled(rule: string) {
    return this._plugins.some(p => p.isRuleEnabled(rule));
  }

  /**
   * Whether the plugin is loaded.
   *
   * @params name - The plugin name.
   * @example "open-policy-agent"
   */
  isPluginLoaded(name: string): boolean {
    return this._plugins.some(p => p.metadata.name === name);
  }

  /**
   * The plugins that are loaded in this validator.
   */
  getPlugins(): Plugin[] {
    return this._plugins;
  }

  /**
   * The plugins that failed to load in this validator.
   */
  getFailedPlugins(): string[] {
    return this._failedPlugins;
  }

  /**
   * The plugin with the given name.
   *
   * @params name - The plugin name
   */
  getPlugin(name: string): Plugin | undefined {
    return this._plugins.find(p => p.metadata.name === name);
  }

  /**
   * Eagerly load and configure the validation plugins.
   *
   * @param config - the new configuration of the validator.
   */
  async preload(config?: Config): Promise<void> {
    this._config = config;
    return this.load();
  }

  /**
   * Load the plugin and prepare it.
   * Afterwards plugin and rule metadata are available.
   *
   * @see config.plugins
   */
  private load() {
    this._abortController.abort();
    this._abortController = new AbortController();
    this._loading = this.doLoad(this._abortController.signal);
    return this._loading;
  }

  private cancelLoad(reason: string = 'cancelled') {
    this._abortController.abort(reason);
    this._loading = undefined;
  }

  private async doLoad(signal: AbortSignal) {
    const config = this.config;
    const previousPlugins = this._previousPluginsInit;
    this._failedPlugins = [];

    if (!isEqual(config.plugins, previousPlugins)) {
      // All validators found in configuration are loaded.
      // That way the plugin and rule metadata becomes available.
      const pluginsConfig = config.plugins ?? {};
      const newPluginNames = Object.keys(pluginsConfig ?? {});

      // Unload stale plugins
      const previousPluginNames = Object.keys(this._previousPluginsInit ?? {});
      const stalePlugins = difference(previousPluginNames, newPluginNames);

      await this.doUnload(stalePlugins);

      // Load new plugins
      const missingPlugins = newPluginNames.filter(p => !this.isPluginLoaded(p));

      const loading = await Promise.allSettled(
        missingPlugins.map(async p => {
          try {
            const validator = await this._loader(p);
            return validator;
          } catch (err) {
            const msg = err instanceof Error ? err.message : 'reason unknown';
            throw new PluginLoadError(p, msg);
          }
        })
      );

      if (signal.aborted) {
        return;
      }

      loading.forEach(pluginPromise => {
        if (pluginPromise.status === 'fulfilled') {
          this._plugins.push(pluginPromise.value);
        } else {
          invariant(pluginPromise.reason instanceof PluginLoadError);
          this._failedPlugins.push(pluginPromise.reason.name);
          if (config.settings?.['debug']) {
            console.error(`[validator] ${pluginPromise.reason.message}`);
          }
        }
      });

      // Toggle validators
      for (const validator of this._plugins) {
        const value = pluginsConfig[validator.metadata.name];
        validator.enabled = Boolean(value);
      }

      this._previousPluginsInit = clone(pluginsConfig);
    }

    // Configure validators
    await Promise.allSettled(
      this._plugins.map(p =>
        p.configure({
          rules: config.rules,
          settings: config.settings,
        })
      )
    );
  }

  private async doUnload(plugins: string[]) {
    for (const pluginName of plugins) {
      const plugin = this.getPlugin(pluginName);
      if (!plugin) continue;
      await plugin.unload();
      this._plugins = this._plugins.filter(p => p.metadata.name !== pluginName);
    }
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
    if (this._loading === undefined) {
      this.load();
    }
    const loadAbortSignal = this._abortController.signal;
    await this._loading;
    throwIfAborted(loadAbortSignal, externalAbortSignal);

    const validators = this._plugins.filter(v => v.enabled);
    const tool: Tool = {
      driver: {name: 'monokle'},
      extensions: validators.map(v => v.toolComponent),
    };

    await nextTick();
    throwIfAborted(loadAbortSignal, externalAbortSignal);

    this.preprocessCustomResourceDefinitions(resources);

    const allRuns = await Promise.allSettled(validators.map(v => v.validate(resources, incremental)));
    throwIfAborted(loadAbortSignal, externalAbortSignal);

    const results = allRuns
      .map(run => (run.status === 'fulfilled' ? run.value : undefined))
      .filter(isDefined)
      .flat();

    const failedRuns = allRuns.filter(r => r.status === 'rejected');
    if (this.config.settings?.debug && failedRuns.length > 0) {
      this.debug('skipped failed tool extension', failedRuns);
    }

    const run: ValidationRun = {
      tool,
      results,
      taxonomies: [NSA_TAXONOMY, CIS_TAXONOMY],
    };

    return {
      $schema: 'https://json.schemastore.org/sarif-2.1.0.json',
      version: '2.1.0',
      runs: [run],
    };
  }

  private preprocessCustomResourceDefinitions(resources: Resource[]) {
    const crds = resources.filter(r => r.kind === 'CustomResourceDefinition');

    for (const crd of crds) {
      const spec = crd.content.spec;
      const kind = spec?.names?.kind;
      const apiVersion = findDefaultVersion(crd.content);

      if (!apiVersion) {
        continue;
      }

      const schema = extractSchema(crd.content, apiVersion);

      if (!schema) {
        continue;
      }

      this.registerCustomSchema({kind, apiVersion, schema});
    }
  }

  async registerCustomSchema(schema: CustomSchema) {
    if (!this.isPluginLoaded('kubernetes-schema')) {
      this.debug('Cannot register custom schema.', {
        reason: 'Kubernetes Schema plugin must be loaded.',
      });
      return;
    }

    const key = `${schema.apiVersion}-${schema.kind}`;
    if (this._customSchemas.has(key)) {
      this.debug('Cannot register custom schema.', {
        reason: 'The schema is already registered.',
      });
      return;
    }

    // Let's put K8s schema first as it first adds the schema to the shared SchemaLoader.
    const kubernetesSchemaPlugin = this.getPlugin('kubernetes-schema');
    const otherPlugins = this.getPlugins().filter(p => p.metadata.name !== 'kubernetes-schema');

    for (const plugin of [kubernetesSchemaPlugin, ...otherPlugins]) {
      await plugin?.registerCustomSchema(schema);
    }

    this._customSchemas.add(key);
  }

  async unregisterCustomSchema(schema: Omit<CustomSchema, 'schema'>) {
    if (!this.isPluginLoaded('kubernetes-schema')) {
      this.debug('Cannot unregister custom schema.', {
        reason: 'Kubernetes Schema plugin must be loaded.',
      });
      return;
    }

    const key = `${schema.apiVersion}-${schema.kind}`;
    if (this._customSchemas.has(key)) {
      this.debug('Cannot register custom schema.', {
        reason: 'The schema is not registered.',
      });
      return;
    }

    // Let's put K8s schema first as it first removes the schema from the shared SchemaLoader.
    const kubernetesSchemaPlugin = this.getPlugin('kubernetes-schema');
    const otherPlugins = this.getPlugins().filter(p => p.metadata.name !== 'kubernetes-schema');

    for (const plugin of [kubernetesSchemaPlugin, ...otherPlugins]) {
      await plugin?.unregisterCustomSchema(schema);
    }

    this._customSchemas.delete(key);
  }

  /**
   * Clear the incremental caches.
   */
  async clear(): Promise<void> {
    await Promise.all(this._plugins.map(v => v.clear()));
  }

  /**
   * Unloads the Monokle Validator so it can be used as new.
   */
  async unload(): Promise<void> {
    this.cancelLoad('unload');
    for (const schema of this._customSchemas) {
      const [apiVersion, kind] = schema.split('-');
      await this.unregisterCustomSchema({apiVersion, kind});
    }

    const pluginNames = this.getPlugins().map(p => p.metadata.name);
    await this.doUnload(pluginNames);
    this._config = undefined;
    this._failedPlugins = [];
  }

  private debug(msg: string, details?: any) {
    if (!this.config.settings?.debug) return;
    console.debug('[validation]', msg, details);
  }
}
