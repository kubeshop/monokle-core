import { ResourceParser, SchemaLoader } from "@monokle/validation";
import { initialize } from "monaco-worker-manager/worker";
import { TextDocument } from "vscode-languageserver-textdocument";
import {
  CodeAction,
  CompletionList,
  Diagnostic,
  DocumentLink,
  DocumentSymbol,
  Hover,
  LocationLink,
  Position,
  Range,
  TextEdit,
} from "vscode-languageserver-types";
import {
  CustomFormatterOptions,
  getLanguageService,
} from "yaml-language-server/lib/esm/languageservice/yamlLanguageService.js";

import { languageId } from "./constants.js";
import type { LanguageSettings } from "./index.js";
import { loadSchema } from "./schemas/loadSchema.js";
import { MonokleService } from "./validation/validationService.js";

export type CreateData = LanguageSettings;

export interface KubernetesWorker {
  reconfigure(newSettings: LanguageSettings): void;

  doValidation: (uri: string) => Diagnostic[];

  doComplete: (uri: string, position: Position) => CompletionList;

  doDefinition: (uri: string, position: Position) => LocationLink[];

  doHover: (uri: string, position: Position) => Hover;

  format: (uri: string, options: CustomFormatterOptions) => TextEdit[];

  resetSchema: (uri: string) => boolean;

  findDocumentSymbols: (uri: string) => DocumentSymbol[];

  findLinks: (uri: string) => DocumentLink[];

  getCodeAction: (
    uri: string,
    range: Range,
    diagnostics: Diagnostic[]
  ) => CodeAction[];
}

initialize<KubernetesWorker, CreateData>((ctx, settings) => {
  const parser = new ResourceParser();
  const loader = new SchemaLoader();
  const validator = new MonokleService(parser, loader);

  validator.configure(settings);

  const languageService = getLanguageService(
    async (uri: string): Promise<string> => {
      console.log("getSchemaContent - schema URI:", uri);
      if (!uri.startsWith("kubernetes://")) {
        const response = await fetch(uri);
        console.log("schema requested", { uri });
        if (response.ok) {
          return response.text();
        }
        throw new Error(`Schema request failed for ${uri}`);
      }

      // Parse magic URI
      // example: ['io.k8s.api.apps.v1.Deployment'];
      const schemaIds = uri.replace(/^kubernetes:\/\//, "").split("+");

      // Load schema
      // loader.getResourceSchema(schemaIds[0]) // Continue here: rework schema loader to accept ids as above.
      const schema = loadSchema(schemaIds[0]);

      if (!schema) {
        return undefined;
      }

      // Stitch (for multi-schemas)
      // {
      //   oneOf: [
      //     {
      //       $ref: '_argo.json#',
      //     },
      //     etc...
      //   ],
      // };
      const stitchedSchema = schema;

      return JSON.stringify(stitchedSchema);
    },
    null,
    null,
    null,
    null
  );

  languageService.configure({
    isKubernetes: true,
    format: true,
    completion: true,
    hover: true,
    validate: false,
    yamlVersion: "1.2",
    customTags: [],
    schemas: [],
  });

  languageService.registerCustomSchemaProvider((uri) => {
    console.log("getSchemaUri - model URI:", uri);
    // Fetch model
    const model = getTextDocument(uri);

    // Parse document
    // nyi

    // Make magic URL
    // nyi

    // HACK: use ResourceParser to do this properly!
    const content = model.getText();
    if (content.includes("kind: Deployment")) {
      return Promise.resolve("kubernetes://io.k8s.api.apps.v1.Deployment");
    } else if (content.includes("kind: Application")) {
      return Promise.resolve("kubernetes://io.argoproj.v1alpha1.Application");
    } else {
      // fallback
      return Promise.resolve("kubernetes://io.k8s.api.apps.v1.Deployment");
    }
  });

  const getTextDocument = (uri: string): TextDocument => {
    const models = ctx.getMirrorModels();
    for (const model of models) {
      if (String(model.uri) === uri) {
        return TextDocument.create(
          uri,
          languageId,
          model.version,
          model.getValue()
        );
      }
    }
  };

  const getAllTextDocuments = (): TextDocument[] => {
    const models = ctx.getMirrorModels();
    const documents: TextDocument[] = [];
    for (const model of models) {
      const document = TextDocument.create(
        String(model.uri),
        languageId,
        model.version,
        model.getValue()
      );
      documents.push(document);
    }
    return documents;
  };

  return {
    reconfigure(newSettings) {
      return validator.configure(newSettings);
    },

    doValidation(uri) {
      console.log("worker.doValidation", uri);
      validator.sync(getAllTextDocuments());
      const document = getTextDocument(uri);

      if (document) {
        return validator.doValidation(document);
      }

      return [];
    },

    doComplete(uri, position) {
      const document = getTextDocument(uri);
      return languageService.doComplete(document, position, true);
    },

    doDefinition(uri, position) {
      validator.sync(getAllTextDocuments());
      const document = getTextDocument(uri);
      const monacoLinks = validator.doDefinition(document, {
        position,
        textDocument: { uri },
      });
      const yamlLinks =
        languageService.doDefinition(document, {
          position,
          textDocument: { uri },
        }) ?? [];
      return [...monacoLinks, ...yamlLinks];
    },

    doHover(uri, position) {
      const document = getTextDocument(uri);
      return languageService.doHover(document, position);
    },

    format(uri, options) {
      const document = getTextDocument(uri);
      return languageService.doFormat(document, options);
    },

    resetSchema(uri) {
      return languageService.resetSchema(uri);
    },

    findDocumentSymbols(uri) {
      const document = getTextDocument(uri);
      return languageService.findDocumentSymbols2(document, {});
    },

    findLinks(uri) {
      const document = getTextDocument(uri);
      return languageService.findLinks(document);
    },

    getCodeAction(uri, range, diagnostics) {
      const document = getTextDocument(uri);
      return languageService.getCodeAction(document, {
        range,
        textDocument: { uri },
        context: { diagnostics },
      });
    },
  };
});
