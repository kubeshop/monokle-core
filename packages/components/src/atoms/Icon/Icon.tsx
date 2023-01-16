import React, { useMemo } from "react";

import AntdIcon, { ExclamationCircleOutlined } from "@ant-design/icons";

import { IconNames } from "./types";

import Colors from "@/styles/Colors";

import {
  AllProjects,
  ClusterDashboard,
  Collapse,
  Compare,
  Git,
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
  ResourceLinks,
  Search,
  SeverityHigh,
  SeverityLow,
  SeverityMedium,
  Shortcuts,
  Terminal,
  Validation,
  ValidationOPA,
  Warning,
  YAMLSyntax,
  ValidationK8sSchema,
} from "./Icons";

type IconProps = {
  name: IconNames;
  color?: Colors;
  style?: React.CSSProperties;
  className?: string;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
};

const icons: Record<IconNames, React.ComponentType<any>> = {
  "all-projects": AllProjects,
  "cluster-dashboard": ClusterDashboard,
  collapse: Collapse,
  compare: Compare,
  error: ExclamationCircleOutlined,
  explorer: Explorer,
  "git-ops": Git,
  helm: Helm,
  images: Images,
  incomingRefs: IncomingRefs,
  "k8s-schema": K8sSchema,
  kubernetes: Kubernetes,
  kustomize: Kustomize,
  "opa-status": OPAStatus,
  "open-policy-agent": OpenPolicyAgent,
  outgoingRefs: OutgoingRefs,
  "resource-links": ResourceLinks,
  search: Search,
  "severity-high": SeverityHigh,
  "severity-low": SeverityLow,
  "severity-medium": SeverityMedium,
  shortcuts: Shortcuts,
  terminal: Terminal,
  validation: Validation,
  "validation-opa": ValidationOPA,
  "validation-k8s-schema": ValidationK8sSchema,
  warning: Warning,
  "yaml-syntax": YAMLSyntax,
};

export const Icon: React.FC<IconProps> = (props) => {
  const { name, style, color, onMouseEnter, onMouseLeave, className } = props;

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
      // @ts-ignore */
      component={icons[name]}
      style={finalStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};
