import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import MyButton from './MyButton';

const meta: ComponentMeta<typeof MyButton> = {
    title: 'Other Category/MyButton',
    component: MyButton,
};
export default meta;

export const Primary: ComponentStoryObj<typeof MyButton> = {
    args: {
        disabled: false,
        children: 'Hello',
    },
};
