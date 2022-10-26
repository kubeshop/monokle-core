import React from "react";

export type TitleBarType = {
  title: string;
  actions?: React.ReactNode;
  description?: React.ReactNode;
  expandable?: boolean;
  isOpen?: boolean;
  type?: "primary" | "secondary";
  onExpand?: () => void;
};
