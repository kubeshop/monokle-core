import { Resource } from '@monokle/validation';
import { LineCounter, parseAllDocuments, parseDocument } from 'yaml';

export const KUSTOMIZATION_KIND = 'Kustomization';
export const KUSTOMIZATION_API_GROUP = 'kustomize.config.k8s.io';

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
        text: document.toString({ directives: false }),
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

// Some (older) kustomization yamls don't contain kind/group properties to identify them as such
// they are identified only by their name
function isUntypedKustomizationFile(filePath = ''): boolean {
  return /kustomization*.yaml/.test(filePath.toLowerCase().trim());
}

export function isYamlFile(file: File): boolean {
  return file.path.endsWith('.yml') || file.path.endsWith('.yaml');
}
export function parseYamlDocument(text: string, lineCounter?: LineCounter) {
  return parseDocument(text, { lineCounter, uniqueKeys: false, strict: false });
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

function extractNamespace(content: any): string | undefined {
  const namespace = content.metadata?.namespace;

  return namespace && typeof namespace === 'string' ? namespace : undefined;
}

export const createResourceId = (
  fileId: string,
  name: string,
  kind: string,
  namespace?: string | null,
): string => {
  return murmurHash(`${fileId}${kind}${name}${namespace || ''}`);
};

export function createResourceName(filePath: string, content: any, kind: string): string {
  try {
    //  metadata name
    return typeof content.metadata.name === 'string'
      ? content.metadata.name.trim()
      : JSON.stringify(content.metadata.name).trim();
  } catch (error) {
    // filename
    return filePath;
  }
}

export function getResourcesForPath(filePath: string, resources: Resource[] | undefined) {
  return resources ? resources.filter((resource) => resource.filePath === filePath) : [];
}

/**
 * Fast, non-cryptographic hash function.
 *
 * All credits go to Perezd's node-murmurhash.
 *
 * @see https://en.wikipedia.org/wiki/MurmurHash
 * @see https://github.com/perezd/node-murmurhash
 */
export function murmurHash(key: string | Uint8Array, seed: number = 1337): string {
  if (typeof key === 'string') key = new TextEncoder().encode(key);

  const remainder = key.length & 3;
  const bytes = key.length - remainder;
  const c1 = 0xcc9e2d51;
  const c2 = 0x1b873593;

  let i = 0;
  let h1 = seed;
  let k1, h1b;

  while (i < bytes) {
    k1 =
      (key[i] & 0xff) |
      ((key[++i] & 0xff) << 8) |
      ((key[++i] & 0xff) << 16) |
      ((key[++i] & 0xff) << 24);
    ++i;

    k1 = ((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
    k1 = (k1 << 15) | (k1 >>> 17);
    k1 = ((k1 & 0xffff) * c2 + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;

    h1 ^= k1;
    h1 = (h1 << 13) | (h1 >>> 19);
    h1b = ((h1 & 0xffff) * 5 + ((((h1 >>> 16) * 5) & 0xffff) << 16)) & 0xffffffff;
    h1 = (h1b & 0xffff) + 0x6b64 + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16);
  }

  k1 = 0;

  switch (remainder) {
    case 3:
      k1 ^= (key[i + 2] & 0xff) << 16;
    case 2:
      k1 ^= (key[i + 1] & 0xff) << 8;
    case 1:
      k1 ^= key[i] & 0xff;

      k1 = ((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
      k1 = (k1 << 15) | (k1 >>> 17);
      k1 = ((k1 & 0xffff) * c2 + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
      h1 ^= k1;
  }

  h1 ^= key.length;

  h1 ^= h1 >>> 16;
  h1 = ((h1 & 0xffff) * 0x85ebca6b + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
  h1 ^= h1 >>> 13;
  h1 = ((h1 & 0xffff) * 0xc2b2ae35 + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16)) & 0xffffffff;
  h1 ^= h1 >>> 16;

  const r = h1 >>> 0;
  return String(r);
}
