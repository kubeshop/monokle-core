import { ComponentMeta, ComponentStory } from "@storybook/react";
import ResizableColumnsPanel from "./ResizableColumnsPanel";

export default {
  title: "Molecules/ResizableColumnsPanel",
  component: ResizableColumnsPanel,
} as ComponentMeta<typeof ResizableColumnsPanel>;

const Template: ComponentStory<typeof ResizableColumnsPanel> = (args) => <ResizableColumnsPanel {...args} />;

export const AllPanels = Template.bind({});
AllPanels.args = {
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
  onStopResize: (position, flex) => {},
};

export const WithoutLeftPanel = Template.bind({});
WithoutLeftPanel.args = {
  center: <div style={{ background: "#FCD116", height: "100%" }}>Center Panel</div>,
  right: <div style={{ background: "#CE1126", height: "100%" }}>Right Panel</div>,
  height: 500,
  width: 1500,
  layout: {
    center: 0.3,
    right: 0.7,
  },
  onStopResize: (position, flex) => {},
};
