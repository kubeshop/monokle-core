import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import ResizableColumnsPanel from "./ResizableColumnsPanel";

const meta: ComponentMeta<typeof ResizableColumnsPanel> = {
  title: "Molecules/ResizableColumnsPanel",
  component: ResizableColumnsPanel,
};
export default meta;

export const Primary: ComponentStoryObj<typeof ResizableColumnsPanel> = {
  args: {
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
    onStopResize: (position, flex) => {
      console.log("Position:", position);
      console.log("Flex:", flex);
    },
  },
};
