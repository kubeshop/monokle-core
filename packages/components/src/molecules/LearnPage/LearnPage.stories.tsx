import { ComponentMeta, ComponentStory } from "@storybook/react";
import LearnPage from "./LearnPage";

export default {
	title: "Molecules/LearnPage",
	component: LearnPage,
} as ComponentMeta<typeof LearnPage>;

const Template: ComponentStory<typeof LearnPage> = (args) => (
	<LearnPage {...args} />
);

export const MainLearnPage = Template.bind({});
