import { ComponentMeta, ComponentStory } from "@storybook/react";
import ResizableRowsPanel from "./ResizableRowsPanel";
import { ResizableRowsPanelType } from "./types";

export default {
  title: "Molecules/ResizableRowsPanel",
  component: ResizableRowsPanel,
} as ComponentMeta<typeof ResizableRowsPanel>;

const Template: ComponentStory<typeof ResizableRowsPanel> = (args) => <ResizableRowsPanel {...args} />;

export const AllPanelsArgs: ResizableRowsPanelType = {
  top: <div style={{ background: "#0057B7", height: "100%", color: "#fff" }}>Top Panel</div>,
  bottom: <div style={{ background: "#FFDD00", height: "100%" }}>Bottom Panel</div>,
  height: 700,
  width: 1000,
  layout: {
    top: 0.5,
    bottom: 0.5,
  },
};

export const AllPanels = Template.bind({});
AllPanels.args = AllPanelsArgs;

export const WithoutBottomPanelArgs: ResizableRowsPanelType = {
  top: <div style={{ background: "#0057B7", height: "100%", color: "#fff" }}>Top Panel</div>,
  height: 800,
  width: 1000,
  layout: {
    top: 1,
  },
};

export const WithoutBottomPanel = Template.bind({});
WithoutBottomPanel.args = WithoutBottomPanelArgs;
