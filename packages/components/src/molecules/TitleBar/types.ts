import React from "react";

export type TitleBarType = {
  title: React.ReactNode;
  actions?: React.ReactNode;
  description?: React.ReactNode;
  expandable?: boolean;
  isOpen?: boolean;
  type?: "primary" | "secondary";
  onExpand?: () => void;
};
