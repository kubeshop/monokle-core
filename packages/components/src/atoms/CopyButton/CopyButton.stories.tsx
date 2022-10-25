import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import CopyButton from './CopyButton';

const meta: ComponentMeta<typeof CopyButton> = {
    title: 'Atoms/CopyButton',
    component: CopyButton,
};
export default meta;

export const Primary: ComponentStoryObj<typeof CopyButton> = {
    args: {
        content: 'Hello',
    },
};
