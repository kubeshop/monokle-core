import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";
import { registerMarkerDataProvider } from "monaco-marker-data-provider";
import { createWorkerManager } from "monaco-worker-manager";

import { languageId } from "./constants.js";
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

const richEditConfiguration: monaco.languages.LanguageConfiguration = {
  comments: {
    lineComment: "#",
  },
  brackets: [
    ["{", "}"],
    ["[", "]"],
    ["(", ")"],
  ],
  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
  ],

  onEnterRules: [
    {
      beforeText: /:\s*$/,
      action: { indentAction: monaco.languages.IndentAction.Indent },
    },
  ],
};

export function setupMode(settings: LanguageSettingsContainer): void {
  const wm = createWorkerManager<KubernetesWorker, CreateData>(monaco, {
    label: "yaml",
    moduleId: "monaco-kubernetes/kubernetes.worker",
    createData: settings.get(),
  });

  monaco.languages.registerCompletionItemProvider(
    languageId,
    createCompletionItemProvider(wm.getWorker)
  );
  monaco.languages.registerHoverProvider(
    languageId,
    createHoverProvider(wm.getWorker)
  );
  monaco.languages.registerDefinitionProvider(
    languageId,
    createDefinitionProvider(wm.getWorker)
  );
  monaco.languages.registerDocumentSymbolProvider(
    languageId,
    createDocumentSymbolProvider(wm.getWorker)
  );
  monaco.languages.registerDocumentFormattingEditProvider(
    languageId,
    createDocumentFormattingEditProvider(wm.getWorker)
  );
  monaco.languages.registerLinkProvider(
    languageId,
    createLinkProvider(wm.getWorker)
  );
  monaco.languages.registerCodeActionProvider(
    languageId,
    createCodeActionProvider(wm.getWorker)
  );
  monaco.languages.setLanguageConfiguration(languageId, richEditConfiguration);

  let markerDataProvider = registerMarkerDataProvider(
    monaco,
    languageId,
    createMarkerDataProvider(wm.getWorker)
  );

  settings.onChange(async (newSettings) => {
    const worker = await wm.getWorker();
    await worker.reconfigure(newSettings);
    markerDataProvider.dispose();
    markerDataProvider = registerMarkerDataProvider(
      monaco,
      languageId,
      createMarkerDataProvider(wm.getWorker)
    );
  });
}
