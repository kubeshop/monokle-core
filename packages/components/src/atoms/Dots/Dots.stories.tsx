import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Dots } from "./Dots";

const meta: ComponentMeta<typeof Dots> = {
  title: "Atoms/Dots",
  component: Dots,
};
export default meta;

export const Default: ComponentStoryObj<typeof Dots> = {
  args: {},
};
