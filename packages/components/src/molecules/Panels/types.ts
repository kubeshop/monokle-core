import React from 'react';

export type ResizableColumnsPanelType = {
  right: React.ReactNode;
  middle?: React.ReactNode;
  defaultSizes?: number[];
  isLeftActive?: boolean;
  isMiddleActive?: boolean;
  left?: React.ReactNode;
  leftPaneTooltipTitle?: string;
  middlePaneTooltipTitle?: string;
  leftClosable?: boolean;
  middleClosable?: boolean;
  minPaneWidth?: number;
  paneCloseIconStyle?: React.CSSProperties;
  onCloseLeftPane?: () => void;
  onCloseMiddlePane?: () => void;
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
