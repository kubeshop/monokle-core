import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AllColumnsArgs, ClosableLeftColumnArgs, WithoutLeftColumnArgs } from "./args";
import ResizableColumnsPanel from "./ResizableColumnsPanel";

export default {
  title: "Molecules/ResizableColumnsPanel",
  component: ResizableColumnsPanel,
} as ComponentMeta<typeof ResizableColumnsPanel>;

const Template: ComponentStory<typeof ResizableColumnsPanel> = (args) => <ResizableColumnsPanel {...args} />;

export const AllColumns = Template.bind({});
AllColumns.args = AllColumnsArgs;

export const WithoutLeftColumn = Template.bind({});
WithoutLeftColumn.args = WithoutLeftColumnArgs;

export const ClosableLeftColumn = Template.bind({});
ClosableLeftColumn.args = ClosableLeftColumnArgs;
