import {Icon} from '@/atoms';

export const iconMap: Record<string, JSX.Element> = {
  'kubernetes-schema': <Icon name="validation-k8s-schema" />,
  'open-policy-agent': <Icon name="validation-opa" />,
  'resource-links': <Icon name="validation-resource-links" />,
  'yaml-syntax': <Icon name="validation-yaml-syntax" />,
};

export const newErrorsTextMap: Record<string, string> = {
  'k8s-schema': 'K8s Schema changed.',
  rule: 'Rule changed.',
};

export const showByFilterOptions = [
  {value: 'show-by-file', label: 'Show by file'},
  {value: 'show-by-resource', label: 'Show by resource'},
  {value: 'show-by-rule', label: 'Show by rule'},
];
