import {Icon} from '@/atoms';
import {Colors} from '@/styles/Colors';
import {ValidationFiltersValueType} from './types';

export const DEFAULT_FILTERS_VALUE: ValidationFiltersValueType = {
  showSuppressed: true,
  showUnsuppressed: true,
  'tool-component': undefined,
  type: undefined,
};

export const iconMap: Record<string, JSX.Element> = {
  'kubernetes-schema': <Icon name="validation-k8s-schema" style={{fontSize: '13px'}} />,
  'open-policy-agent': <Icon name="validation-opa" style={{fontSize: '13px'}} />,
  'resource-links': <Icon name="validation-resource-links" style={{fontSize: '13px'}} />,
  'yaml-syntax': <Icon name="validation-yaml-syntax" style={{fontSize: '13px'}} />,
};

export const newErrorsTextMap: Record<string, string> = {
  'k8s-schema': 'K8s Schema changed.',
  rule: 'Rule changed.',
};
