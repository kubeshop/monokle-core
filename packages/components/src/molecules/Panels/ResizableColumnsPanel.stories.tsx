import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AllColumnsArgs, WithoutLeftColumnArgs } from "./args";
import ResizableColumnsPanel from "./ResizableColumnsPanel";

export default {
  title: "Molecules/ResizableColumnsPanel",
  component: ResizableColumnsPanel,
} as ComponentMeta<typeof ResizableColumnsPanel>;

const Template: ComponentStory<typeof ResizableColumnsPanel> = (args) => <ResizableColumnsPanel {...args} />;

export const AllPanels = Template.bind({});
AllPanels.args = AllColumnsArgs;

export const WithoutLeftPanel = Template.bind({});
WithoutLeftPanel.args = WithoutLeftColumnArgs;
