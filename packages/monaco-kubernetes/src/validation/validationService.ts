import {
  getFileLocation,
  KubernetesSchemaValidator,
  MonokleValidator,
  OpenPolicyAgentValidator,
  processRefs,
  RefPosition,
  RemoteWasmLoader,
  Resource,
  ResourceLinksValidator,
  ResourceParser,
  SchemaLoader,
  SimpleCustomValidator,
  YamlValidator,
} from '@monokle/validation';
import { DefinitionParams } from 'vscode-languageserver-protocol';
import { TextDocument } from 'vscode-languageserver-textdocument';
import {
  Diagnostic,
  DiagnosticSeverity,
  LocationLink,
  Position,
  Range,
} from 'vscode-languageserver-types';
import { ARGO_PLUGIN } from './argo.plugin.js';

import { extractK8sResources, File } from './parse.js';
import { MonokleLanguageService, ValidationLanguageSettings } from './types.js';

export class MonokleService implements MonokleLanguageService {
  private _parser: ResourceParser;
  private _validator: MonokleValidator;

  private _resources: Resource[] = [];

  constructor(parser: ResourceParser, loader: SchemaLoader) {
    this._parser = parser;
    this._validator = new MonokleValidator(async (pluginName: string) => {
      switch (pluginName) {
        case 'open-policy-agent':
          const wasmLoader = new RemoteWasmLoader();
          return new OpenPolicyAgentValidator(parser, wasmLoader);
        case 'resource-links':
          return new ResourceLinksValidator();
        case 'yaml-syntax':
          return new YamlValidator(parser);
        case 'kubernetes-schema':
          return new KubernetesSchemaValidator(parser, loader);
        case 'argo':
          return new SimpleCustomValidator(ARGO_PLUGIN, parser);
        default:
          throw new Error('plugin_not_found');
      }
    });
  }

  sync(documents: TextDocument[]): void {
    const files: File[] = documents.map((document) => {
      return { id: document.uri, path: document.uri, content: document.getText() };
    });
    const resources = extractK8sResources(files);
    this._resources = resources;
    processRefs(resources, this._parser);
  }

  configure(settings: ValidationLanguageSettings): void {
    this._validator.preload(settings.validation);
  }

  async doValidation(document: TextDocument): Promise<Diagnostic[]> {
    const resources = this._resources;
    const response = await this._validator.validate({ resources });

    const diagnostics: Diagnostic[] = response.runs
      .flatMap((run) => {
        return run.results.map((result) => {
          const location = getFileLocation(result);
          if (location.physicalLocation.artifactLocation.uri !== document.uri) {
            return;
          }

          const region = location.physicalLocation.region;
          if (!region) return;

          // For some reason Monaco YAML does a +1 to all of these values.
          // To be investigated what goes wrong in yaml-language-server.
          // See src/languageFeatures.ts:48
          const range: Range = {
            start: {
              line: region.startLine - 1,
              character: region.startColumn - 1,
            },
            end: {
              line: region.endLine - 1,
              character: region.endColumn - 1,
            },
          };
          const severity =
            result.level === 'error' ? DiagnosticSeverity.Error : DiagnosticSeverity.Warning;

          return Diagnostic.create(range, result.message.text, severity);
        });
      })
      .filter((x) => x !== undefined);

    return diagnostics;
  }

  doDefinition(document: TextDocument, params: DefinitionParams): LocationLink[] {
    const position: Position = {
      character: params.position.character,
      line: params.position.line + 1, // There is an odd off by one error in all positions..
    };
    const resource = this._resources.find((r) => r.fileId === document.uri);
    const refs = resource.refs.filter((ref) => includesPosition(ref.position, position));
    const links = [];
    console.log(document.uri, position.line, resource.refs);

    for (const ref of refs) {
      if (ref.position && ref.target.type === 'resource') {
        const resourceId = ref.target.resourceId;
        const resource = this._resources.find((r) => r.id === resourceId);
        const targetUri = resource.fileId;
        const targetRange = createTargetRange(ref.position);

        const link = LocationLink.create(targetUri, targetRange, targetRange);
        links.push(link);
      }
    }

    return links;
  }
}

function includesPosition(range: RefPosition | undefined, position: Position) {
  if (!range) return false;
  if (position.line < range.line) return false;
  if (position.character < range.column) return false;

  if (range.endLine === undefined) {
    const endLine = range.line;
    const endColumn = range.column + range.length;
    if (position.line > endLine) return false;
    if (position.character > endColumn) return false;
    return true;
  } else {
    if (position.line > range.endLine) return false;
    if (position.character > range.endColumn) return false;
    return true;
  }
}

function createTargetRange(position: RefPosition) {
  if (position.endLine === undefined) {
    return Range.create(
      { line: position.line - 1, character: position.column - 1 },
      { line: position.line - 1, character: position.column - 1 + position.length },
    );
  }
  return Range.create(
    { line: position.line - 1, character: position.column - 1 },
    { line: position.endLine - 1, character: position.endColumn - 1 },
  );
}
