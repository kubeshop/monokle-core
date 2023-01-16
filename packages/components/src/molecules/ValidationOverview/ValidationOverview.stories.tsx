import { ComponentMeta, ComponentStory } from "@storybook/react";
import ValidationOverview from "./ValidationOverview";

export default {
  title: "Molecules/ValidationOverview",
  component: ValidationOverview,
} as ComponentMeta<typeof ValidationOverview>;

const Template: ComponentStory<typeof ValidationOverview> = (args) => <ValidationOverview {...args} />;

export const MainValidationOverview = Template.bind({});
MainValidationOverview.args = {};
