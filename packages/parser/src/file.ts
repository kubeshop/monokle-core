export type BaseFile = {
  id: string;
  path: string;
  content: string;
};

export function isYamlFile(file: BaseFile): boolean {
  return file.path.endsWith('.yml') || file.path.endsWith('.yaml');
}

// some (older) kustomization yamls don't contain kind/group properties to identify them as such
// they are identified only by their name
export function isUntypedKustomizationFile(filePath = ''): boolean {
  return /kustomization*.yaml/.test(filePath.toLowerCase().trim());
}

const HELM_TEMPLATE_CONTENT_REGEX = /{{[^}]*}}/;

export function hasHelmTemplateContent(file: BaseFile) {
  return HELM_TEMPLATE_CONTENT_REGEX.test(file.content || '');
}
