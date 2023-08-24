import {v5} from 'uuid';
import {parse} from 'path';
import {ResourceRef} from './resourceRefs.js';
import {KUSTOMIZATION_API_GROUP, KUSTOMIZATION_KIND, RESOURCE_UUID_NAMESPACE} from './constants.js';

export type Resource = {
  id: string;
  fileId: string;
  filePath: string;
  /**
   * Offset of this resource's startLine within the parent file.
   */
  fileOffset: number;
  name: string;
  apiVersion: string;
  kind: string;
  namespace?: string;
  content?: any;
  text: string;
  refs?: ResourceRef[];
  range?: {
    start: number;
    length: number;
  };
};

export type ResourceMapType = {
  [id: string]: Resource | undefined;
};

export const createResourceId = (fileId: string, name: string, kind: string, namespace?: string | null): string => {
  return v5(`${fileId}${kind}${name}${namespace || ''}`, RESOURCE_UUID_NAMESPACE);
};

export function createResourceName(filePath: string, content: any, kind: string): string {
  const parsedPath = parse(filePath);

  // dirname for kustomizations
  if (kind === KUSTOMIZATION_KIND && (!content?.apiVersion || content.apiVersion.startsWith(KUSTOMIZATION_API_GROUP))) {
    return parsedPath.dir.replace(/^\/*/, '') || parsedPath.base;
  }

  try {
    //  metadata name
    return typeof content.metadata.name === 'string'
      ? content.metadata.name.trim()
      : JSON.stringify(content.metadata.name).trim();
  } catch (error) {
    try {
      return typeof content.metadata.generateName === 'string'
        ? content.metadata.generateName.trim()
        : JSON.stringify(content.metadata.generateName).trim();
    } catch (err) {
      // fallback to filename
      return parsedPath.name;
    }
  }
}

export function getResourcesForPath(filePath: string, resources: Resource[] | undefined) {
  return resources ? resources.filter(resource => resource.filePath === filePath) : [];
}
