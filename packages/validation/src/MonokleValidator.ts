import {v4} from 'uuid';
import clone from 'lodash/clone.js';
import difference from 'lodash/difference.js';
import isEqual from 'lodash/isEqual.js';
import {ResourceParser} from './common/resourceParser.js';
import type {Suppression, Tool, ValidationResponse, ValidationResult, ValidationRun} from './common/sarif.js';
import type {CustomSchema, Plugin, Resource} from './common/types.js';
import {Config} from './config/parse.js';
import {CIS_TAXONOMY, NSA_TAXONOMY} from './taxonomies/index.js';
import {PluginMetadataWithConfig, PluginName, RuleMetadataWithConfig, ValidateParams, Validator} from './types.js';
import {nextTick, throwIfAborted} from './utils/abort.js';
import {extractSchema, findDefaultVersion} from './utils/customResourceDefinitions.js';
import {PluginLoadError} from './utils/error.js';
import invariant from './utils/invariant.js';
import {isDefined} from './utils/isDefined.js';
import {Fixer, Suppressor} from './sarif/index.js';
import {SuppressEngine} from './sarif/suppressions/engine.js';
import {SchemaLoader} from './validators/index.js';
import {PluginLoader} from './pluginLoaders/PluginLoader.js';
import {ValidationConfig} from '@monokle/types';
import {PluginContext} from './pluginLoaders/types.js';

export type ValidatorInit = {
  loader: PluginLoader;
  parser: ResourceParser;
  suppressors: Suppressor[];
  fixer: Fixer;
  schemaLoader: SchemaLoader;
};

export class MonokleValidator implements Validator {
  _config: Config = {};
  _abortController: AbortController = new AbortController();
  _loading?: Promise<void>;
  _pluginContext: PluginContext;
  _loader: PluginLoader;
  _previousPluginsInit?: Record<string, boolean>;
  _plugins: Plugin[] = [];
  _failedPlugins: string[] = [];
  _customSchemas: Set<string> = new Set();
  _suppressions: Suppression[] = [];
  private _suppressor: SuppressEngine;

  constructor(init: ValidatorInit, config?: ValidationConfig) {
    this._loader = init.loader;
    this._pluginContext = {
      parser: init.parser,
      fixer: init.fixer,
      schemaLoader: init.schemaLoader,
    };
    this._suppressor = new SuppressEngine(init.suppressors ?? []);
    if (config) this.preload(config).catch(() => {});
  }

  get config(): Config {
    return this._config;
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
   * Whether the plugin is loaded.
   *
   * @params name - The plugin name.
   * @example "open-policy-agent"
   */
  private isPluginLoaded(name: string): boolean {
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
   * @param suppressions - a list with suppression requests.
   */
  async preload(config?: Config, suppressions?: Suppression[]): Promise<void> {
    this._config = config ?? {};
    this._suppressions = suppressions ?? [];
    return this.load();
  }

  /**
   * Load the plugin and prepare it.
   * Afterward plugin and rule metadata are available.
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
            return await this._loader.load(p, this._pluginContext, config.settings?.[p]);
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
    await Promise.allSettled([
      ...this._plugins.map(p =>
        p.configure({
          rules: config.rules,
          settings: config.settings,
        })
      ),
      this._suppressor.preload(this._suppressions),
    ]);
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
    baseline,
    abortSignal: externalAbortSignal,
  }: ValidateParams): Promise<ValidationResponse> {
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

    validators.forEach((v, index) => (v.toolComponentIndex = index));

    await nextTick();
    throwIfAborted(loadAbortSignal, externalAbortSignal);

    this.preprocessCustomResourceDefinitions(resources);

    const allRuns = await Promise.allSettled(validators.map(v => v.validate(resources, {incremental})));
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
      automationDetails: {guid: v4()},
      tool,
      results,
      taxonomies: [NSA_TAXONOMY, CIS_TAXONOMY],
    };

    const result: ValidationResponse = {
      $schema: 'https://json.schemastore.org/sarif-2.1.0.json',
      version: '2.1.0',
      runs: [run],
    };

    if (baseline) {
      this.compareWithBaseline(result, baseline);
    }

    return this.applySuppressions(result, resources);
  }

  async applySuppressions(result: ValidationResponse, resources: Resource[], suppressions?: Suppression[]) {
    if (suppressions) {
      this._suppressions = suppressions;
      await this._suppressor.preload(suppressions);
    }
    await this._suppressor.suppress(result, resources, {
      noInSourceSuppressions: this._config?.settings?.noInSourceSuppressions,
      noExternalSuppressions: this._config?.settings?.noExternalSuppressions,
    });

    return result;
  }

  /**
   * Compares the validation result with a baseline.
   *
   * @remarks comparison uses fingerprints.
   * @remark enhances the result with baseline guid & state.
   */
  private compareWithBaseline(result: ValidationResponse, baseline: ValidationResponse): void {
    for (const run of result.runs) {
      const baselineRun = baseline.runs.find(r => r.tool.driver.name === run.tool.driver.name);
      if (!baselineRun) continue;
      this.compareRunWithBaseline(run, baselineRun);
    }
  }

  private compareRunWithBaseline(run: ValidationRun, baseline: ValidationRun): void {
    run.baselineGuid = baseline.automationDetails.guid;

    const hashmap = new Map<string, ValidationResult | undefined>();
    for (const result of baseline.results) {
      const fingerprint = result.fingerprints?.['monokleHash/v1'];
      if (!fingerprint) continue;
      hashmap.set(fingerprint, result);
    }

    for (const result of run.results) {
      const fingerprint = result.fingerprints?.['monokleHash/v1'];
      if (!fingerprint) continue;
      if (hashmap.has(fingerprint)) {
        result.baselineState = 'unchanged';
        hashmap.set(fingerprint, undefined);
      } else {
        result.baselineState = 'new';
      }
    }

    for (const result of hashmap.values()) {
      if (!result) continue;
      run.results.push({...result, baselineState: 'absent'});
    }
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
   * Unloads the Monokle Validator, so it can be used as new.
   */
  async unload(): Promise<void> {
    this.cancelLoad('unload');
    for (const schema of this._customSchemas) {
      const [apiVersion, kind] = schema.split('-');
      await this.unregisterCustomSchema({apiVersion, kind});
    }

    const pluginNames = this.getPlugins().map(p => p.metadata.name);
    await this.doUnload(pluginNames);
    this._config = {};
    this._failedPlugins = [];
  }

  private debug(msg: string, details?: any) {
    if (!this.config.settings?.debug) return;
    console.debug('[validation]', msg, details);
  }
}
