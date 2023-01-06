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
import { MonokleService } from "./validation/validationService.js";

const DEFAULT_SCHEMA_VERSION = "1.26.0";

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
      const resource = validator.getResource(uri);

      if (!resource) {
        const response = await fetch(uri);
        if (!response.ok) {
          throw new Error(`Schema request failed for ${uri}`);
        }
        return response.text();
      }

      const version =
        settings.validation?.settings?.["kubernetes-schema"]?.[
          "schemaVersion"
        ] ?? DEFAULT_SCHEMA_VERSION;

      const schema = await loader.getResourceSchema(version, resource);
      if (!schema) throw new Error(`Schema not found for ${uri}`);
      const schemaString = JSON.stringify(schema.schema);
      return schemaString;
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
    // TODO: support multi-resource YAML models.
    // Currently, this only works for single-resource YAML models where
    // the uri maps exactly to a one resource. To support multi-
    // resource files we should parse the model here to generate
    // a URL that identifies all the resource kinds. The schema
    // request service can then interpret the URL to fetch and stitch a proper
    // oneOf schema to validate. This requires a refactor of the SchemaLoader.
    // @example kubernetes://io.k8s.api.apps.v1.Deployment+io.argoproj.v1alpha1.Application
    return Promise.resolve(uri);
  });

  const getTextDocument = (uri: string): TextDocument | undefined => {
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
    return undefined;
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
      validator.sync(getAllTextDocuments());
      const document = getTextDocument(uri);

      if (document) {
        return validator.doValidation(document);
      }

      return [];
    },

    doComplete(uri, position) {
      const document = getTextDocument(uri);
      if (!document) return { isIncomplete: false, items: [] };
      return languageService.doComplete(document, position, true);
    },

    doDefinition(uri, position) {
      validator.sync(getAllTextDocuments());
      const document = getTextDocument(uri);
      if (!document) return [];
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
      if (!document) return undefined;
      return languageService.doHover(document, position);
    },

    format(uri, options) {
      const document = getTextDocument(uri);
      if (!document) return [];
      return languageService.doFormat(document, options);
    },

    resetSchema(uri) {
      return languageService.resetSchema(uri);
    },

    findDocumentSymbols(uri) {
      const document = getTextDocument(uri);
      if (!document) return [];
      return languageService.findDocumentSymbols2(document, {});
    },

    findLinks(uri) {
      const document = getTextDocument(uri);
      if (!document) return [];
      return languageService.findLinks(document);
    },

    getCodeAction(uri, range, diagnostics) {
      const document = getTextDocument(uri);
      if (!document) return [];
      return languageService.getCodeAction(document, {
        range,
        textDocument: { uri },
        context: { diagnostics },
      });
    },
  };
});
