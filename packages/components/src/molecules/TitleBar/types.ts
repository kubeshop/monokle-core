import React from 'react';

export type TitleBarType = {
  title: React.ReactNode;
  actions?: React.ReactNode;
  description?: React.ReactNode;
  expandable?: boolean;
  descriptionStyle?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  isOpen?: boolean;
  type?: 'primary' | 'secondary';
  onExpand?: () => void;
};
