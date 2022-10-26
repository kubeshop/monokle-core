import { ComponentMeta, ComponentStory } from "@storybook/react";
import ResizableColumnsPanel from "./ResizableColumnsPanel";

export default {
  title: "Molecules/ResizableColumnsPanel",
  component: ResizableColumnsPanel,
} as ComponentMeta<typeof ResizableColumnsPanel>;

const Template: ComponentStory<typeof ResizableColumnsPanel> = (args) => <ResizableColumnsPanel {...args} />;

export const AllPanels = Template.bind({});
AllPanels.args = {
  left: <div style={{ background: "blue", height: "100%" }}>Left Panel</div>,
  center: <div style={{ background: "yellow", height: "100%" }}>Center Panel</div>,
  right: <div style={{ background: "red", height: "100%" }}>Right Panel</div>,
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
  center: <div style={{ background: "yellow", height: "100%" }}>Center Panel</div>,
  right: <div style={{ background: "red", height: "100%" }}>Right Panel</div>,
  height: 500,
  width: 1500,
  layout: {
    left: 0.3,
    center: 0.3,
    right: 0.4,
  },
  onStopResize: (position, flex) => {},
};
