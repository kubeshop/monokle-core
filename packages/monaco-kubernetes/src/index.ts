import {
  Emitter,
  IEvent,
  languages,
} from "monaco-editor/esm/vs/editor/editor.api.js";
import { LANGUAGE_ID } from "./constants.js";
import { setupMode } from "./kubernetesMode.js";
import type { ValidationLanguageSettings } from "./validation/types.js";
import { YAML_MONARCH } from "./yamlLanguage.js";

export type LanguageSettings = ValidationLanguageSettings & {
  telemetry?: boolean;
};

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
  },
});

languages.register({
  id: LANGUAGE_ID,
  extensions: [".yaml", ".yml"],
  aliases: ["k8s", "kube"],
  mimetypes: ["application/x-kubernetes"],
});

languages.registerTokensProviderFactory(LANGUAGE_ID, {
  create() {
    return YAML_MONARCH;
  },
});

languages.onLanguage("kubernetes", () => {
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
