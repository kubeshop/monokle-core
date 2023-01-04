import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";
import { registerMarkerDataProvider } from "monaco-marker-data-provider";
import { createWorkerManager } from "monaco-worker-manager";

import { languageId } from "./constants.js";
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

export function setupMode(): void {
  const worker = createWorkerManager<KubernetesWorker, CreateData>(monaco, {
    label: "yaml",
    moduleId: "monaco-kubernetes/kubernetes.worker",
    createData: {},
  });

  monaco.languages.registerCompletionItemProvider(
    languageId,
    createCompletionItemProvider(worker.getWorker)
  );
  monaco.languages.registerHoverProvider(
    languageId,
    createHoverProvider(worker.getWorker)
  );
  monaco.languages.registerDefinitionProvider(
    languageId,
    createDefinitionProvider(worker.getWorker)
  );
  monaco.languages.registerDocumentSymbolProvider(
    languageId,
    createDocumentSymbolProvider(worker.getWorker)
  );
  monaco.languages.registerDocumentFormattingEditProvider(
    languageId,
    createDocumentFormattingEditProvider(worker.getWorker)
  );
  monaco.languages.registerLinkProvider(
    languageId,
    createLinkProvider(worker.getWorker)
  );
  monaco.languages.registerCodeActionProvider(
    languageId,
    createCodeActionProvider(worker.getWorker)
  );
  monaco.languages.setLanguageConfiguration(languageId, richEditConfiguration);

  registerMarkerDataProvider(
    monaco,
    languageId,
    createMarkerDataProvider(worker.getWorker)
  );
}
