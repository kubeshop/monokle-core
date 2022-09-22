export const UNLOADED_ERR_MSG = (name: string) =>
  `Cannot validate resources. The ${name} validator must first be loaded.`;
export const NOT_FOUND_ERR_MSG = (name: string) =>
  `Cannot find validator: ${name}.`;

export const REF_PATH_SEPARATOR = "#";
export const NAME_REFNODE_PATH = `metadata${REF_PATH_SEPARATOR}name`;
