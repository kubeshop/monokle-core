import { ResizableColumnsPanelType, ResizableRowsPanelType } from "./types";

export const AllColumnsArgs: ResizableColumnsPanelType = {
  left: <div style={{ background: "#002B7F", height: "100%", color: "#fff" }}>Left Panel</div>,
  center: <div style={{ background: "#FCD116", height: "100%" }}>Center Panel</div>,
  right: <div style={{ background: "#CE1126", height: "100%" }}>Right Panel</div>,
  height: 500,
  width: 1500,
  layout: {
    left: 0.3,
    center: 0.2,
    right: 0.5,
  },
};

export const AllRowsArgs: ResizableRowsPanelType = {
  top: <div style={{ background: "#0057B7", height: "100%", color: "#fff" }}>Top Panel</div>,
  bottom: <div style={{ background: "#FFDD00", height: "100%" }}>Bottom Panel</div>,
  height: 700,
  width: 1000,
  layout: {
    top: 0.5,
    bottom: 0.5,
  },
};

export const ClosableLeftColumnArgs: ResizableColumnsPanelType = {
  left: <div style={{ background: "#002B7F", height: "100%", color: "#fff", padding: 15 }}>Left Panel</div>,
  center: <div style={{ background: "#FCD116", height: "100%", padding: 15 }}>Center Panel</div>,
  right: <div style={{ background: "#CE1126", height: "100%", padding: 15 }}>Right Panel</div>,
  height: 500,
  width: 1500,
  layout: {
    left: 0.3,
    center: 0.2,
    right: 0.5,
  },
  leftClosable: true,
};

export const WithoutBottomRowArgs: ResizableRowsPanelType = {
  top: <div style={{ background: "#0057B7", height: "100%", color: "#fff" }}>Top Panel</div>,
  height: 800,
  width: 1000,
  layout: {
    top: 1,
  },
};

export const WithoutLeftColumnArgs: ResizableColumnsPanelType = {
  center: <div style={{ background: "#FCD116", height: "100%" }}>Center Panel</div>,
  right: <div style={{ background: "#CE1126", height: "100%" }}>Right Panel</div>,
  height: 500,
  width: 1500,
  layout: { center: 0.3, right: 0.7 },
};
