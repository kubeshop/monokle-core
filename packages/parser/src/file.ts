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

export function hasHelmTemplateContent(file: BaseFile) {
  return isHelmTemplateLike(file) || isHelmValuesLike(file);
}

function isHelmTemplateLike(file: BaseFile): boolean {
  return file.path.includes('/templates/') ||
    file.path.includes('\\templates\\') ||
    file.path.startsWith('templates/') ||
    file.path.startsWith('templates\\')
}

const HELM_VALUES_REGEX = /values[^\/|\\]*.(yaml|yml)/;

function isHelmValuesLike(file: BaseFile): boolean {
  return HELM_VALUES_REGEX.test(file.path.toLocaleLowerCase());
}