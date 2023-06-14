import {Icon} from '@/atoms';
import {Colors} from '@/styles/Colors';

export const DEFAULT_FILTERS_VALUE = {'tool-component': undefined, type: undefined};

export const iconMap: Record<string, JSX.Element> = {
  'kubernetes-schema': <Icon name="validation-k8s-schema" style={{fontSize: '13px', color: Colors.grey8}} />,
  'open-policy-agent': <Icon name="validation-opa" style={{fontSize: '13px', color: Colors.grey8}} />,
  'resource-links': <Icon name="validation-resource-links" style={{fontSize: '13px', color: Colors.grey8}} />,
  'yaml-syntax': <Icon name="validation-yaml-syntax" style={{fontSize: '13px', color: Colors.grey8}} />,
};

export const newErrorsTextMap: Record<string, string> = {
  'k8s-schema': 'K8s Schema changed.',
  rule: 'Rule changed.',
};

export const CORE_PLUGINS = [
  'pod-security-standards',
  'practices',
  'kubernetes-schema',
  'yaml-syntax',
  'resource-links',
  'open-policy-agent',
];
