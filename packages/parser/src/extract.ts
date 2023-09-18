import {LineCounter} from 'yaml';
import {parseAllYamlDocuments} from './parse.js';
import {Resource, createResourceId, createResourceName} from './resource.js';
import {BaseFile, isUntypedKustomizationFile, isYamlFile, hasHelmTemplateContent} from './file.js';
import {KUSTOMIZATION_API_GROUP, KUSTOMIZATION_KIND} from './constants.js';
import {isKubernetesLike} from './k8s.js';

export function extractK8sResources(files: BaseFile[], extractHelmLikeFiles?: boolean): Resource[] {
  const resources: Resource[] = [];

  for (const file of files) {
    if (!isYamlFile(file) || (!extractHelmLikeFiles && hasHelmTemplateContent(file))) {
      continue;
    }

    const lineCounter = new LineCounter();
    const documents = parseAllYamlDocuments(file.content, lineCounter);

    for (const document of documents) {
      const content = document.toJS();

      if (document.errors.length || !content) {
        continue;
      }

      const rawFileOffset = lineCounter.linePos(document.range[0]).line;
      const fileOffset = rawFileOffset === 1 ? 0 : rawFileOffset;

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
    }
  }

  return resources;
}

export function extractNamespace(content: any) {
  // namespace could be an object if it's a helm template value...
  return content.metadata?.namespace && typeof content.metadata.namespace === 'string'
    ? content.metadata.namespace
    : undefined;
}
