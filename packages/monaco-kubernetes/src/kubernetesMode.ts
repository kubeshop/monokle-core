import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";
import { registerMarkerDataProvider } from "monaco-marker-data-provider";
import { createWorkerManager } from "monaco-worker-manager";

import { LANGUAGE_ID } from "./constants.js";
import { LanguageSettingsContainer } from "./index.js";
import { CreateData, KubernetesWorker } from "./kubernetes.worker.js";
import {
  createCodeActionProvider,
  createCompletionItemProvider,
  createDefinitionProvider,
  createDocumentFormattingEditProvider,
  createDocumentSymbolProvider,
  createHoverProvider,
  createLinkProvider,
  createMarkerDataProvider,
} from "./languageFeatures.js";
import { YAML_CONFIG } from "./yamlLanguage.js";


export function setupMode(settings: LanguageSettingsContainer): void {
  monaco.languages.setLanguageConfiguration(LANGUAGE_ID, YAML_CONFIG);


  const wm = createWorkerManager<KubernetesWorker, CreateData>(monaco, {
    label: LANGUAGE_ID,
    moduleId: "monaco-kubernetes/kubernetes.worker",
    createData: settings.get(),
  });

  monaco.languages.registerCompletionItemProvider(
    LANGUAGE_ID,
    createCompletionItemProvider(wm.getWorker)
  );
  monaco.languages.registerHoverProvider(
    LANGUAGE_ID,
    createHoverProvider(wm.getWorker)
  );
  monaco.languages.registerDefinitionProvider(
    LANGUAGE_ID,
    createDefinitionProvider(wm.getWorker)
  );
  monaco.languages.registerDocumentSymbolProvider(
    LANGUAGE_ID,
    createDocumentSymbolProvider(wm.getWorker)
  );
  monaco.languages.registerDocumentFormattingEditProvider(
    LANGUAGE_ID,
    createDocumentFormattingEditProvider(wm.getWorker)
  );
  monaco.languages.registerLinkProvider(
    LANGUAGE_ID,
    createLinkProvider(wm.getWorker)
  );
  monaco.languages.registerCodeActionProvider(
    LANGUAGE_ID,
    createCodeActionProvider(wm.getWorker)
  );

  let markerDataProvider = registerMarkerDataProvider(
    monaco,
    LANGUAGE_ID,
    createMarkerDataProvider(wm.getWorker)
  );

  settings.onChange(async (newSettings) => {
    const worker = await wm.getWorker();
    await worker.reconfigure(newSettings);
    markerDataProvider.dispose();
    markerDataProvider = registerMarkerDataProvider(
      monaco,
      LANGUAGE_ID,
      createMarkerDataProvider(wm.getWorker)
    );
  });
}
