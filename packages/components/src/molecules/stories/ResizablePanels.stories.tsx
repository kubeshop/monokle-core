import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ResizableColumnsPanel, ResizableRowsPanel } from "../Panels";
import { AllColumnsArgs } from "../Panels/args";

export default {
  title: "Organisms/ResizablePanels",
  component: ResizableRowsPanel,
} as ComponentMeta<typeof ResizableRowsPanel>;

export const ResizablePanels: ComponentStory<typeof ResizableRowsPanel> = () => (
  <>
    <ResizableRowsPanel
      top={<ResizableColumnsPanel {...AllColumnsArgs} height={undefined} />}
      bottom={<div style={{ background: "#FF9933", height: "100%" }}>Bottom Panel</div>}
      height={700}
      width={1500}
      layout={{ top: 0.8, bottom: 0.2 }}
    />
  </>
);