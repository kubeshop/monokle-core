import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import ImageIcon from './ImageIcon';

const meta: ComponentMeta<typeof ImageIcon> = {
    title: 'Atoms/ImageIcon',
    component: ImageIcon,
};
export default meta;

export const Primary: ComponentStoryObj<typeof ImageIcon> = {
    args: {
        src: '', 
        width: 48,
        height: 50,
        altText: 'Test',
        fallback: ''
    },
};
