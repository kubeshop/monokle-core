import React, {useMemo} from 'react';

import AntdIcon, {ExclamationCircleOutlined} from '@ant-design/icons';

import {IconNames} from './types';

import {
  AllProjects,
  Checked,
  ClusterDashboard,
  Collapse,
  Compare,
  CRDs,
  Document,
  Git,
  GitOps,
  GitRepository,
  Explorer,
  Helm,
  Images,
  IncomingRefs,
  K8sSchema,
  Kubernetes,
  Kustomize,
  OPAStatus,
  OpenPolicyAgent,
  OutgoingRefs,
  ProblemIcon,
  ProblemSplit,
  ResourceLinks,
  Search,
  SeverityHigh,
  SeverityLow,
  SeverityMedium,
  Shortcuts,
  SplitView,
  Terminal,
  Validation,
  ValidationOPA,
  ValidationK8sSchema,
  ValidationResourceLinks,
  ValidationSettings,
  ValidationYamlSyntax,
  Warning,
  YAMLSyntax,
  PullRequest,
  GlobeSearch,
  CompactNodes,
  Service,
  Kustomization,
  Deployment,
  DefaultResource,
  Role,
  Ingress,
  Namespace,
  Pod,
  Cluster,
  CustomResource,
  Secret,
  Image,
  PluginDefault,
  ClusterValidation,
  ClusterHelm,
  ClusterSettings,
  ClusterConnected,
  MagicWand,
} from './Icons';
import {Colors} from '@/styles/Colors';

type IconProps = {
  name: IconNames;
  color?: Colors;
  style?: React.CSSProperties;
  className?: string;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
};

const icons: Record<IconNames, React.ComponentType<any>> = {
  'all-projects': AllProjects,
  checked: Checked,
  'cluster-dashboard': ClusterDashboard,
  'cluster-connected': ClusterConnected,
  'cluster-validation': ClusterValidation,
  'cluster-helm': ClusterHelm,
  'cluster-settings': ClusterSettings,
  collapse: Collapse,
  compare: Compare,
  crds: CRDs,
  document: Document,
  error: ExclamationCircleOutlined,
  explorer: Explorer,
  git: Git,
  'git-ops': GitOps,
  'git-repository': GitRepository,
  helm: Helm,
  images: Images,
  incomingRefs: IncomingRefs,
  'k8s-schema': K8sSchema,
  kubernetes: Kubernetes,
  kustomize: Kustomize,
  'magic-wand': MagicWand,
  'opa-status': OPAStatus,
  'open-policy-agent': OpenPolicyAgent,
  outgoingRefs: OutgoingRefs,
  'plugin-default': PluginDefault,
  'problem-icon': ProblemIcon,
  'problem-split': ProblemSplit,
  'pull-request': PullRequest,
  'resource-links': ResourceLinks,
  search: Search,
  'severity-high': SeverityHigh,
  'severity-low': SeverityLow,
  'severity-medium': SeverityMedium,
  shortcuts: Shortcuts,
  'split-view': SplitView,
  terminal: Terminal,
  validation: Validation,
  'validation-opa': ValidationOPA,
  'validation-k8s-schema': ValidationK8sSchema,
  'validation-resource-links': ValidationResourceLinks,
  'validation-settings': ValidationSettings,
  'validation-yaml-syntax': ValidationYamlSyntax,
  warning: Warning,
  'yaml-syntax': YAMLSyntax,
  'globe-search': GlobeSearch,
  'compact-nodes': CompactNodes,
  service: Service,
  kustomization: Kustomization,
  deployment: Deployment,
  'default-resource': DefaultResource,
  role: Role,
  ingress: Ingress,
  namespace: Namespace,
  pod: Pod,
  cluster: Cluster,
  'custom-resource': CustomResource,
  secret: Secret,
  image: Image,
};

const Icon: React.FC<IconProps> = props => {
  const {name, style, color, onMouseEnter, onMouseLeave, className, onClick} = props;

  const finalStyle: React.CSSProperties = useMemo(() => {
    const customStyle = style || {};
    const customColor = color || customStyle?.color;
    return {
      ...customStyle,
      color: customColor,
    };
  }, [style, color]);

  return (
    <AntdIcon
      className={className}
      component={icons[name]}
      style={finalStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    />
  );
};

export default Icon;
