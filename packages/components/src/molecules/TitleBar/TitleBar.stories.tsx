import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TextTitleBarArgs } from "./args";
import TitleBar from "./TitleBar";

export default {
  title: "Molecules/TitleBar",
  component: TitleBar,
} as ComponentMeta<typeof TitleBar>;

const Template: ComponentStory<typeof TitleBar> = (args) => <TitleBar {...args} />;

export const TextTitleBar = Template.bind({});
TextTitleBar.args = TextTitleBarArgs;
