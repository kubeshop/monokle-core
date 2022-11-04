import cloneDeep from "lodash/cloneDeep.js";
import { JsonObject } from "type-fest";
import { ResourceParser } from "../../common/resourceParser.js";
import { ValidationRule, ValidationRun } from "../../common/sarif.js";
import {
  Incremental,
  Plugin,
  PluginMetadata,
  Resource,
} from "../../common/types.js";
import { RuleMap } from "../../config/parse.js";
import { DEV_MODE_TOKEN } from "./constants.js";
import { SimpleCustomValidator } from "./simpleValidator.js";

const DEFAULT_METADATA: PluginMetadata = {
  id: "DEV",
  name: DEV_MODE_TOKEN,
  displayName: "Developer mode",
  icon: "k8s-schema",
  description: "Develop custom validators in minutes.",
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
    settings?: JsonObject | undefined;
  };

  constructor(private parser: ResourceParser) {
    this.hmr();
  }

  onReload(callback: (hash: String) => void) {
    this._handleReload = callback;
  }

  private hmr() {
    this._source = new EventSource("http://localhost:33030/");

    this._source.onerror = (err) => {
      console.error(err);
    };

    this._source.onmessage = (event) => {
      try {
        const bundle: { code: string; hash: string } = JSON.parse(event.data);
        if (this._currentHash === bundle.hash) {
          return;
        }
        this._currentHash = bundle.hash;
        const encodedSource = btoa(bundle.code);
        const dataUrl = `data:text/javascript;base64,${encodedSource}`;
        import(/* @vite-ignore */ dataUrl).then((module) => {
          const pluginInit = module.default;
          const validator = new SimpleCustomValidator(pluginInit, this.parser);
          this._currentValidator = validator;
          if (this._lastConfig) {
            validator
              .configure(this._lastConfig)
              .then(() => this._handleReload?.(bundle.hash));
          } else {
            this._handleReload?.(bundle.hash);
          }
        });
      } catch (err) {
        console.error(err);
      }
    };
  }

  get name(): string {
    return DEFAULT_METADATA.name;
  }

  get metadata(): PluginMetadata {
    if (!this._currentValidator) {
      return DEFAULT_METADATA;
    }
    const metadata = cloneDeep(this._currentValidator.metadata);
    metadata.dev = true;
    metadata.name = DEFAULT_METADATA.name;
    return metadata;
  }

  get rules(): ValidationRule<{}>[] {
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
    const r = rule.replace(
      DEV_MODE_TOKEN,
      this._currentValidator.metadata.name
    );
    return this._currentValidator.hasRule(r);
  }

  isRuleEnabled(rule: string): boolean {
    if (!this._currentValidator) {
      return false;
    }
    const r = rule.replace(
      DEV_MODE_TOKEN,
      this._currentValidator.metadata.name
    );
    return this._currentValidator.isRuleEnabled(r);
  }

  configure(config: {
    rules?: RuleMap | undefined;
    settings?: JsonObject | undefined;
  }): Promise<void> {
    if (!this._currentValidator) {
      this._lastConfig = config;
      return Promise.resolve();
    }
    const entries = Object.entries(config.rules ?? {}).map(([key, value]) => {
      return [
        key.replace(DEV_MODE_TOKEN, this._currentValidator!.metadata.name),
        value,
      ];
    });
    const rules = Object.fromEntries(entries);
    return this._currentValidator.configure({
      rules,
      settings: config.settings,
    });
  }

  validate(
    resources: Resource[],
    incremental?: Incremental | undefined
  ): Promise<ValidationRun> {
    if (!this._currentValidator) {
      return Promise.resolve({
        tool: {
          driver: {
            name: "developer mode",
            rules: [],
          },
        },
        results: [],
      });
    }
    return this._currentValidator?.validate(resources, incremental);
  }

  clear(): Promise<void> {
    if (!this._currentValidator) {
      return Promise.resolve();
    }
    return this._currentValidator.clear();
  }

  unload(): Promise<void> {
    if (!this._currentValidator) {
      return Promise.resolve();
    }
    return this._currentValidator.unload();
  }
}
