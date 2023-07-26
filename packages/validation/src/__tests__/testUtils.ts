import {v5} from 'uuid';
import {parse} from 'path';
import glob from 'tiny-glob';
import {readFile as readFileFromFs} from 'fs/promises';
import chunkArray from 'lodash/chunk.js';
import {LineCounter, parseAllDocuments, parseDocument} from 'yaml';
import {Resource, ValidationResult} from '../index.js';
import {expect} from 'vitest';

export const KUSTOMIZATION_KIND = 'Kustomization';
export const KUSTOMIZATION_API_GROUP = 'kustomize.config.k8s.io';

/**
 * This is all copied from cli/src/utils - need to be moved to their own shared package
 * so they can be reused across both cli and validator - see https://github.com/kubeshop/monokle-core/issues/63
 */

export type File = {
  id: string;
  path: string;
  content: string;
};

export function extractK8sResources(files: File[]): Resource[] {
  const resources: Resource[] = [];

  for (const file of files) {
    const lineCounter = new LineCounter();
    const documents = parseAllYamlDocuments(file.content, lineCounter);

    for (const document of documents) {
      const content = document.toJS();

      if (document.errors.length) {
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
      } else if (content && typeof content.kind === 'string') {
        // Load K8s schemas only with no apiVersion present for testing purposes.
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
      }
    }
  }

  return resources;
}

type KubernetesLike = {
  apiVersion: string;
  kind: string;
  metadata?: {
    name: string;
    namespace?: string;
  };
  spec?: {
    names?: {
      kind?: string;
    };
  };
};

function isKubernetesLike(content: any): content is KubernetesLike {
  return content && typeof content.apiVersion === 'string' && typeof content.kind === 'string';
}

// some (older) kustomization yamls don't contain kind/group properties to identify them as such
// they are identified only by their name
function isUntypedKustomizationFile(filePath = ''): boolean {
  return /kustomization*.yaml/.test(filePath.toLowerCase().trim());
}

export function isYamlFile(file: File): boolean {
  return file.path.endsWith('.yml') || file.path.endsWith('.yaml');
}
export function parseYamlDocument(text: string, lineCounter?: LineCounter) {
  return parseDocument(text, {lineCounter, uniqueKeys: false, strict: false});
}

/**
 * Wrapper that ensures consistent options
 */

export function parseAllYamlDocuments(text: string, lineCounter?: LineCounter) {
  return parseAllDocuments(text, {
    lineCounter,
    uniqueKeys: false,
    strict: false,
  });
}

function extractNamespace(content: any) {
  // namespace could be an object if it's a helm template value...
  return content.metadata?.namespace && typeof content.metadata.namespace === 'string'
    ? content.metadata.namespace
    : undefined;
}

const RESOURCE_UUID_NAMESPACE = '6fa71997-8aa8-4b89-b987-cec4fd3de770';

export const createResourceId = (fileId: string, name: string, kind: string, namespace?: string | null): string => {
  return v5(`${fileId}${kind}${name}${namespace || ''}`, RESOURCE_UUID_NAMESPACE);
};

export function createResourceName(filePath: string, content: any, kind: string): string {
  const parsedPath = parse(filePath);

  // dirname for kustomizations
  // if (
  //   kind === KUSTOMIZATION_KIND &&
  //   (!content?.apiVersion ||
  //     content.apiVersion.startsWith(KUSTOMIZATION_API_GROUP))
  // ) {
  //   return parsedPath.dir.replace(/^\/*/, '');
  // }

  try {
    //  metadata name
    return typeof content.metadata.name === 'string'
      ? content.metadata.name.trim()
      : JSON.stringify(content.metadata.name).trim();
  } catch (error) {
    // filename
    return parsedPath.name;
  }
}

export function getResourcesForPath(filePath: string, resources: Resource[] | undefined) {
  return resources ? resources.filter(resource => resource.filePath === filePath) : [];
}

export async function readDirectory(directoryPath: string): Promise<File[]> {
  const filePaths = await glob(`${directoryPath}/**/*.{yaml,yml}`);
  const files: File[] = [];

  for (const chunk of chunkArray(filePaths, 5)) {
    const promise = await Promise.allSettled(
      chunk.map(path => {
        return readFileFromFs(path, 'utf8').then((content): File => ({id: path, path, content}));
      })
    );

    for (const result of promise) {
      if (result.status === 'rejected') {
        continue;
      }
      files.push(result.value);
    }
  }

  return files;
}

export function expectResult(result: ValidationResult, ruleId: string, level: string, resource: string) {
  expect(result.ruleId).toBe(ruleId);
  expect(result.level).toBe(level);
  expect(result.message.text).toContain(resource);
}

export const PRACTICES_ALL_DISABLED = {
  'practices/no-latest-image': false,
  'practices/no-sys-admin': false,
  'practices/no-mounted-docker-sock': false,
  'practices/no-writable-fs': false,
  'practices/drop-capabilities': false,
  'practices/no-low-user-id': false,
  'practices/no-low-group-id': false,
  'practices/no-automounted-service-account-token': false,
  'practices/no-pod-create': false,
  'practices/no-pod-execute': false,
  'practices/no-root-group': false,
};
