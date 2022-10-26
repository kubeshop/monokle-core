import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  ExpandableNotOpenTitleBarArgs,
  ExpandableOpenTitleBarArgs,
  SecondaryTitleBarArgs,
  TextDescriptionTitleBarArgs,
  TextTitleBarArgs,
} from "./args";
import TitleBar from "./TitleBar";

export default {
  title: "Molecules/TitleBar",
  component: TitleBar,
} as ComponentMeta<typeof TitleBar>;

const Template: ComponentStory<typeof TitleBar> = (args) => <TitleBar {...args} />;

export const TextTitleBar = Template.bind({});
TextTitleBar.args = TextTitleBarArgs;

export const TextDescriptionTitleBar = Template.bind({});
TextDescriptionTitleBar.args = TextDescriptionTitleBarArgs;

export const SecondaryTitleBar = Template.bind({});
SecondaryTitleBar.args = SecondaryTitleBarArgs;

export const ExpandableOpenTitleBar = Template.bind({});
ExpandableOpenTitleBar.args = ExpandableOpenTitleBarArgs;

export const ExpandableNotOpenTitleBar = Template.bind({});
ExpandableNotOpenTitleBar.args = ExpandableNotOpenTitleBarArgs;
