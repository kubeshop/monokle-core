import {Region} from './common/sarif.js';

export const NOT_CONFIGURED_ERR_MSG = (name: string) =>
  `Cannot validate resources. The ${name} validator must first be configured.`;
export const NOT_FOUND_ERR_MSG = (name: string) => `Cannot find validator: ${name}.`;

export const REF_PATH_SEPARATOR = '#';
export const NAME_REFNODE_PATH = `metadata${REF_PATH_SEPARATOR}name`;
export const NO_HELP_AVAILABLE = 'No help available.';

export const FALLBACK_REGION: Region = {
  startLine: 1,
  startColumn: 1,
  endLine: 1,
  endColumn: 1,
};

export const KUSTOMIZATION_KIND = 'Kustomization';
export const KUSTOMIZATION_COMPONENT_KIND = 'Component';
export const KUSTOMIZATION_API_GROUP = 'kustomize.config.k8s.io';
export const CORE_PLUGINS = [
  'pod-security-standards',
  'practices',
  'kubernetes-schema',
  'yaml-syntax',
  'resource-links',
  'open-policy-agent',
  'metadata',
] as const;

export const PLUGINS_CDN_BASE_URL = 'https://plugins.monokle.com/validation';
