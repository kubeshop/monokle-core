import {ResourceParser} from '../../common/resourceParser.js';
import {ToolPlugin, ValidationResult, ValidationRun} from '../../common/sarif.js';
import {CustomSchema, Incremental, Plugin, PluginMetadata, Resource, ValidateOptions} from '../../common/types.js';
import {RuleMap} from '../../config/parse.js';
import {Fixer} from '../../sarif/fix/index.js';
import {Suppressor} from '../../sarif/suppressions/index.js';
import {PluginMetadataWithConfig, RuleMetadataWithConfig} from '../../types.js';
import {DEV_MODE_TOKEN} from './constants.js';
import {SimpleCustomValidator} from './simpleValidator.js';

const DEFAULT_METADATA: PluginMetadata = {
  id: 'DEV',
  name: DEV_MODE_TOKEN,
  displayName: 'Developer mode',
  learnMoreUrl: 'https://github.com/kubeshop/monokle-community-plugins#readme',
  description:
    "Develop community plugins in minutes. Enable your plugin's development server to get started. HMR will show your latest code directly in the browser.",
  dev: true,
};

/**
 * Validator for developing custom policies.
 */
export class DevCustomValidator implements Plugin {
  private _source?: EventSource;
  private _currentHash?: string;
  private _currentValidator?: SimpleCustomValidator = undefined;
  private _handleReload?: (hash: string) => void;
  private _lastConfig?: {
    rules?: RuleMap | undefined;
    settings?: any;
  };
  private _debug: boolean = false;
  protected _toolComponentIndex: number = -1;

  constructor(private parser: ResourceParser, private fixer: Fixer | undefined) {
    this.hmr();
  }

  onReload(callback: (hash: String) => void) {
    this._handleReload = callback;
  }

  private hmr() {
    this._source = new EventSource('http://localhost:33030/');

    this._source.onerror = err => {
      if (this._debug) {
        console.log('[validator-dev] event source failed', err);
      }
    };

    this._source.onmessage = event => {
      try {
        const bundle: {code: string; hash: string} = JSON.parse(event.data);
        if (this._currentHash === bundle.hash) {
          return;
        }
        if (this._debug) {
          console.log('[validator-dev] bundle received', bundle.hash);
        }
        this._currentHash = bundle.hash;
        const encodedSource = btoa(bundle.code);
        const dataUrl = `data:text/javascript;base64,${encodedSource}`;
        import(/* @vite-ignore */ dataUrl).then(module => {
          const pluginInit = module.default;
          const validator = new SimpleCustomValidator(pluginInit, this.parser, this.fixer);
          this._currentValidator = validator;
          if (this._lastConfig) {
            const entries = Object.entries(this._lastConfig.rules ?? {}).map(([key, value]) => {
              return [key.replace(DEV_MODE_TOKEN, this._currentValidator!.metadata.name), value];
            });
            const rules = Object.fromEntries(entries);

            validator
              .configure({
                rules,
                settings: this._lastConfig.settings,
              })
              .then(() => {
                if (this._debug) console.log('[validator-dev] bundle loaded');
                this._handleReload?.(bundle.hash);
              })
              .catch(err => {
                if (this._debug)
                  console.log(
                    '[validator-dev] bundle load failed',
                    err instanceof Error ? err.message : 'reason unknown'
                  );
              });
          } else {
            if (this._debug) console.log('[validator-dev] bundle loaded');
            this._handleReload?.(bundle.hash);
          }
        });
      } catch (err) {
        if (this._debug) {
          console.error('[validator-dev] bundle failure', err instanceof Error ? err.message : 'reason unknown');
        }
      }
    };
  }

  get name(): string {
    return DEFAULT_METADATA.name;
  }

  get metadata(): PluginMetadataWithConfig {
    if (!this._currentValidator) {
      return {...DEFAULT_METADATA, configuration: {enabled: false}};
    }
    return {
      ...this._currentValidator.metadata,
      dev: true,
      name: DEFAULT_METADATA.name,
    };
  }

  get toolComponent(): ToolPlugin {
    if (!this._currentValidator) {
      return {
        name: 'developer mode',
        rules: [],
      };
    }

    return this._currentValidator.toolComponent;
  }

  get toolComponentIndex(): number {
    return this._toolComponentIndex;
  }

  set toolComponentIndex(value: number) {
    this._toolComponentIndex = value;
  }

  get rules(): RuleMetadataWithConfig[] {
    if (!this._currentValidator) {
      return [];
    }
    return this._currentValidator.rules;
  }

  get enabled(): boolean {
    if (!this._currentValidator) {
      return false;
    }
    return this._currentValidator.enabled;
  }

  set enabled(value: boolean) {
    if (!this._currentValidator) {
      return;
    }
    this._currentValidator.enabled = value;
  }

  hasRule(rule: string): boolean {
    if (!this._currentValidator) {
      return false;
    }
    const r = rule.replace(DEV_MODE_TOKEN, this._currentValidator.metadata.name);
    return this._currentValidator.hasRule(r);
  }

  isRuleEnabled(rule: string): boolean {
    if (!this._currentValidator) {
      return false;
    }
    const r = rule.replace(DEV_MODE_TOKEN, this._currentValidator.metadata.name);
    return this._currentValidator.isRuleEnabled(r);
  }

  configure(config: {rules?: RuleMap | undefined; settings?: any | undefined}): Promise<void> {
    this._debug = Boolean(config?.settings?.debug);
    this._lastConfig = config;
    if (!this._currentValidator) {
      return Promise.resolve();
    }
    const entries = Object.entries(config.rules ?? {}).map(([key, value]) => {
      return [key.replace(DEV_MODE_TOKEN, this._currentValidator!.metadata.name), value];
    });
    const rules = Object.fromEntries(entries);
    return this._currentValidator.configure({
      rules,
      settings: config.settings,
    });
  }
  validate(resources: Resource[], options: ValidateOptions): Promise<ValidationResult[]> {
    if (!this._currentValidator) {
      return Promise.resolve([]);
    }
    return this._currentValidator?.validate(resources, options);
  }

  clear(): Promise<void> {
    if (!this._currentValidator) {
      return Promise.resolve();
    }
    return this._currentValidator.clear();
  }

  registerCustomSchema(schema: CustomSchema): void | Promise<void> {
    if (!this._currentValidator) {
      return;
    }
    return this._currentValidator.registerCustomSchema(schema);
  }

  unregisterCustomSchema(schema: Omit<CustomSchema, 'schema'>): void | Promise<void> {
    if (!this._currentValidator) {
      return;
    }
    return this._currentValidator.unregisterCustomSchema(schema);
  }

  unload(): Promise<void> {
    this._source?.close();
    this._handleReload = undefined;

    if (!this._currentValidator) {
      return Promise.resolve();
    }
    return this._currentValidator.unload();
  }
}
