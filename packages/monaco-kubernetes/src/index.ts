import {
  Emitter,
  IEvent,
  languages,
} from "monaco-editor/esm/vs/editor/editor.api.js";
import { languageId } from "./constants.js";
import { setupMode } from "./kubernetesMode.js";
import type { ValidationLanguageSettings } from "./validation/types.js";

export type LanguageSettings = ValidationLanguageSettings;

/**
 * Configure monaco-kubernetes
 */
export function configure(settings: LanguageSettings = {}): void {
  SETTINGS.set(settings);
}

export const SETTINGS = createLanguageSettingsContainer({
  validation: {
    plugins: {
      "open-policy-agent": true,
      "yaml-syntax": true,
      "kubernetes-schema": true,
      argo: true,
    },
    settings: {
      "open-policy-agent": {
        wasmSrc:
          "https://plugins.monokle.com/validation/open-policy-agent/trivy.wasm",
      },
    },
  },
});

languages.register({
  id: languageId,
  extensions: [".yaml", ".yml"],
  aliases: ["YAML", "yaml", "YML", "yml"],
  mimetypes: ["application/x-yaml"],
});

languages.onLanguage("yaml", () => {
  setupMode(SETTINGS);
});

export type LanguageSettingsContainer = {
  get(): LanguageSettings;
  set(settings: LanguageSettings): void;
  onChange: IEvent<LanguageSettings>;
};

function createLanguageSettingsContainer(
  defaultSettings: LanguageSettings
): LanguageSettingsContainer {
  let settings = defaultSettings;
  const emitter = new Emitter<LanguageSettings>();

  return {
    get() {
      return settings;
    },
    set(newSettings) {
      settings = newSettings;
      emitter.fire(settings);
    },
    onChange: emitter.event,
  };
}
