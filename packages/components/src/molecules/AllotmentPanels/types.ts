export type AllotmentResizableColumnsPanelType = {
  right: React.ReactNode;
  center?: React.ReactNode;
  defaultSizes?: number[];
  left?: React.ReactNode;
  leftClosable?: boolean;
  minPaneWidth?: number;
  paneCloseIconStyle?: React.CSSProperties;
  onCloseLeftPane?: () => void;
  onDragEnd?: (sizes: number[]) => void;
};
