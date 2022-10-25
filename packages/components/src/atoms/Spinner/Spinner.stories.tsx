import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import Spinner from './Spinner';

const meta: ComponentMeta<typeof Spinner> = {
    title: 'Atoms/Spinner',
    component: Spinner,
};
export default meta;

export const Small: ComponentStoryObj<typeof Spinner> = {
    args: {
        isSpinning: true,
        size: 'small'
    },
};

export const Default: ComponentStoryObj<typeof Spinner> = {
    args: {
        isSpinning: true,
        size: 'default'
    },
};

export const Large: ComponentStoryObj<typeof Spinner> = {
    args: {
        isSpinning: true,
        size: 'large'
    },
};