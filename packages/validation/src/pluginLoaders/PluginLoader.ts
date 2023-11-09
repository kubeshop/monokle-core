import {Plugin} from '../common/types.js';
import kbpPlugin from '../validators/practices/plugin.js';
import pssPlugin from '../validators/pod-security-standards/plugin.js';
import {PLUGINS_CDN_BASE_URL} from '../constants.js';
import {dynamicImportCustomPluginLoader} from './dynamicImportLoader.js';
import {
  DEV_MODE_TOKEN,
  DevCustomValidator,
  KubernetesSchemaValidator,
  MetadataValidator,
  OpenPolicyAgentValidator,
  ResourceLinksValidator,
  SchemaLoader,
  SimpleCustomValidator,
  YamlValidator,
} from '../validators/index.js';
import {PluginContext} from './types.js';
import {RemoteWasmLoader} from '../validators/open-policy-agent/wasmLoader/RemoteWasmLoader.browser.js';
import {AdmissionPolicyValidator} from '../validators/admission-policy/validator.js';

export interface PluginLoader {
  load(plugin: string, ctx: PluginContext, settings?: Record<string, any>): Plugin | Promise<Plugin>;
}

type PluginLoadFn = (ctx: PluginContext, settings?: Record<string, any>) => Plugin | Promise<Plugin>;

export class DefaultPluginLoader implements PluginLoader {
  private _registry: Record<string, PluginLoadFn> = {};

  constructor() {
    this.registerCorePlugins();
  }

  protected registerCorePlugins() {
    this.register('pod-security-standards', ({parser, fixer}) => {
      return new SimpleCustomValidator(pssPlugin, parser, fixer);
    });

    this.register('practices', ({parser, fixer}) => {
      return new SimpleCustomValidator(kbpPlugin, parser, fixer);
    });

    this.register('resource-links', () => {
      return new ResourceLinksValidator();
    });

    this.register('yaml-syntax', ({parser}) => {
      return new YamlValidator(parser);
    });

    this.register('kubernetes-schema', ({parser, schemaLoader}) => {
      return new KubernetesSchemaValidator(parser, schemaLoader ?? new SchemaLoader());
    });

    this.register('metadata', ({parser}) => {
      return new MetadataValidator(parser);
    });

    this.register('open-policy-agent', ({parser}) => {
      const wasmLoader = new RemoteWasmLoader();
      return new OpenPolicyAgentValidator(parser, wasmLoader);
    });

    this.register('admission-policy', ({parser}) => {
      return new AdmissionPolicyValidator(parser);
    });

    this.register(DEV_MODE_TOKEN, ({parser, fixer}) => {
      return new DevCustomValidator(parser, fixer);
    });
  }

  register(plugin: string, callback: PluginLoadFn) {
    this._registry[plugin] = callback;
  }

  unregister(plugin: string) {
    delete this._registry[plugin];
  }

  async load(plugin: string, ctx: PluginContext, settings?: Record<string, any>) {
    const loader = this._registry[plugin];

    if (!loader) {
      throw new Error('plugin_not_found');
    }

    return loader(ctx, settings);
  }
}

export class RemotePluginLoader extends DefaultPluginLoader {
  constructor(private bundleLoader = dynamicImportCustomPluginLoader) {
    super();
  }

  async load(plugin: string, ctx: PluginContext, settings?: Record<string, any>) {
    try {
      return await super.load(plugin, ctx, settings);
    } catch (err) {
      if (err instanceof Error && err.message !== 'plugin_not_found') {
        throw err;
      }

      return await this.loadRemote(plugin, ctx, settings);
    }
  }

  private async loadRemote(plugin: string, {parser, fixer}: PluginContext, settings?: Record<string, any>) {
    try {
      let nameOrUrl;

      if (settings?.pluginUrl) {
        nameOrUrl = settings.pluginUrl;
      } else if (settings?.ref) {
        nameOrUrl = `${PLUGINS_CDN_BASE_URL}/${settings.ref}/plugin.js`;
      } else {
        nameOrUrl = `${PLUGINS_CDN_BASE_URL}/${plugin}/latest.js`;
      }

      return await this.bundleLoader(nameOrUrl, parser, fixer);
    } catch (err) {
      throw new Error(err instanceof Error ? `plugin_not_found: ${err.message}` : `plugin_not_found: ${String(err)}`);
    }
  }
}
