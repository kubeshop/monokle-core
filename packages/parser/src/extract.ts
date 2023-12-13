import {LineCounter} from 'yaml';
import {parseAllYamlDocuments} from './parse.js';
import {Resource, createResourceId, createResourceName} from './resource.js';
import {BaseFile, isUntypedKustomizationFile, isYamlFile, hasHelmTemplateContent} from './file.js';
import {KUSTOMIZATION_API_GROUP, KUSTOMIZATION_KIND} from './constants.js';
import {isKubernetesLike} from './k8s.js';

export function extractK8sResources(files: BaseFile[], extractHelmLikeFiles?: boolean, guessResources?: boolean): Resource[] {
  const resources: Resource[] = [];

  for (const file of files) {
    if (!isYamlFile(file) || (!extractHelmLikeFiles && hasHelmTemplateContent(file))) {
      continue;
    }

    const lineCounter = new LineCounter();
    const documents = parseAllYamlDocuments(file.content, lineCounter);

    documents.forEach((document, index) => {
      const content = document.toJS();

      const rawFileOffset = lineCounter.linePos(document.range[0]).line;
      const fileOffset = rawFileOffset === 1 ? 0 : rawFileOffset;

      if (document.errors.length || !content) {
        if (guessResources) {
          const guess = guessResource(file.content, index);

          if (guess) {
            const resource = {
              id: `${file.id}-${index}`,
              fileId: file.id,
              filePath: file.path,
              fileOffset,
              fileIndex: index,
              text: guess.text,
              apiVersion: guess.apiVersion,
              kind: guess.kind,
              name: guess.name,
              content: undefined,
              namespace: undefined,
            };
            resources.push(resource);
          }
        }

        return;
      }

      const resourceBase = {
        apiVersion: content.apiVersion,
        kind: content.kind,
        content,
        fileId: file.id,
        filePath: file.path,
        fileOffset,
        text: document.toString({directives: false}),
      };

      if (isKubernetesLike(content)) {
        const name = createResourceName(file.path, content, content.kind);
        const id = createResourceId(file.id, content.kind, name, content.metadata?.namespace);
        const namespace = extractNamespace(content);
        const resource = {
          ...resourceBase,
          id,
          name,
          namespace,
        };

        resources.push(resource);
      } else if (content && isUntypedKustomizationFile(file.path) && documents.length === 1) {
        const name = createResourceName(file.path, content, KUSTOMIZATION_KIND);
        const id = createResourceId(file.id, name, KUSTOMIZATION_KIND);
        const resource = {
          ...resourceBase,
          kind: KUSTOMIZATION_KIND,
          apiVersion: KUSTOMIZATION_API_GROUP,
          id,
          name,
        };

        resources.push(resource);
      }
    });
  }

  return resources;
}

export function extractNamespace(content: any) {
  // namespace could be an object if it's a helm template value...
  return content.metadata?.namespace && typeof content.metadata.namespace === 'string'
    ? content.metadata.namespace
    : undefined;
}

const GUESS_API_REGEX = /^apiVersion: ([^\s]+).*$/m;
const GUESS_KIND_REGEX = /^kind: ([^\s]+).*$/m;
const GUESS_NAME_REGEX = /^ {2}name: ([^\s]+).*$/m;
const GUESS_API_FALLBACK = 'unknown.monokle.io/v1';
const GUESS_KIND_FALLBACK = 'Unknown';
const GUESS_NAME_FALLBACK = 'unknown';

function guessResource(content: string, index: number) {
  const text = content.split('---').at(index);

  if (!text) {
    return undefined;
  }

  const apiVersion = GUESS_API_REGEX.exec(text)?.at(1) ?? GUESS_API_FALLBACK;
  const kind = GUESS_KIND_REGEX.exec(text)?.at(1) ?? GUESS_KIND_FALLBACK;
  const name = GUESS_NAME_REGEX.exec(text)?.at(1) ?? GUESS_NAME_FALLBACK;

  return { apiVersion, kind, name, text };
}
