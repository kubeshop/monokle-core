import { Button } from "antd";
import { TitleBarType } from "./types";

export const TextTitleBarArgs: TitleBarType = {
  actions: (
    <Button type="primary" size="small">
      Some action
    </Button>
  ),
  title: "Resources",
};

export const TextDescriptionTitleBarArgs: TitleBarType = {
  actions: (
    <Button type="primary" size="small">
      Some action
    </Button>
  ),
  description: <div>Some description...</div>,
  title: "Some title",
};

export const SecondaryTitleBarArgs: TitleBarType = {
  actions: (
    <Button type="primary" size="small">
      Action button
    </Button>
  ),
  description: <div>Some description...</div>,
  title: "Secondary",
  type: "secondary",
};

export const ExpandableOpenTitleBarArgs: TitleBarType = {
  actions: <div style={{ color: "#fff" }}>150 files</div>,
  description: <div>C:\Users\some-user\argo-cd-master</div>,
  expandable: true,
  isOpen: true,
  title: "Files",
};

export const ExpandableNotOpenTitleBarArgs: TitleBarType = {
  actions: <div style={{ color: "#3C9AE8" }}>28 files</div>,
  expandable: true,
  title: "Kustomization",
};
