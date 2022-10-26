import React from "react";

export type ResizableColumnsPanelLayout = {
  left?: number;
  center: number;
  right: number;
};

export type ResizableRowsPanelLayout = {
  top: number;
  bottom?: number;
};

export type ResizableColumnsPanelType = {
  center: React.ReactNode;
  right: React.ReactNode;
  layout?: ResizableColumnsPanelLayout;
  left?: React.ReactNode;
  height?: number;
  width?: number;
  onStopResize?: (position: "left" | "center" | "right", flex: number) => void;
};

export type ResizableRowsPanelType = {
  top: React.ReactNode;
  bottom?: React.ReactNode;
  layout?: ResizableRowsPanelLayout;
  height?: number;
  width?: number;
  splitterStyle?: React.CSSProperties;
  topElementStyle?: React.CSSProperties;
  bottomElementStyle?: React.CSSProperties;
  onStopResize?: (position: "top" | "bottom", flex: number) => void;
};
