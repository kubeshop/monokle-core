import React from 'react';

export type ResizableColumnsPanelType = {
  right: React.ReactNode;
  center?: React.ReactNode;
  defaultSizes?: number[];
  isLeftActive?: boolean;
  left?: React.ReactNode;
  leftClosable?: boolean;
  minPaneWidth?: number;
  paneCloseIconStyle?: React.CSSProperties;
  onCloseLeftPane?: () => void;
  onDragEnd?: (sizes: number[]) => void;
};

export type ResizableRowsPanelType = {
  top: React.ReactNode;
  bottom?: React.ReactNode;
  defaultSizes?: number[];
  bottomPaneMinSize?: number;
  bottomPaneMaxSize?: number;
  isBottomVisible?: boolean;
  onDragEnd?: (sizes: number[]) => void;
};
