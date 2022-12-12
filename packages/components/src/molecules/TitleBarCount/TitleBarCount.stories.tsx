import { ComponentMeta, ComponentStory } from "@storybook/react";
import TitleBar from "../TitleBar/TitleBar";
import { ActiveTitleBarCountArgs, InactiveTitleBarCountArgs } from "./args";
import TitleBarCount from "./TitleBarCount";

export default {
  title: "Molecules/TitleBarCount",
  component: TitleBarCount,
} as ComponentMeta<typeof TitleBarCount>;

const Template: ComponentStory<typeof TitleBarCount> = (args) => (
  <TitleBar
    expandable
    isOpen={args.isActive}
    title={'Example'}
    actions={<TitleBarCount {...args} />}
  />
);

export const ActiveTitleBarCount = Template.bind({});
ActiveTitleBarCount.args = ActiveTitleBarCountArgs

export const InactiveTitleBarCount = Template.bind({});
InactiveTitleBarCount.args = InactiveTitleBarCountArgs

