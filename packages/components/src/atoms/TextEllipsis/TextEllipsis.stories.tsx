import {ComponentMeta, ComponentStory} from '@storybook/react';
import TextEllipsis from './TextEllipsis';

export default {
  title: 'Atoms/TextEllipsis',
  component: TextEllipsis,
} as ComponentMeta<typeof TextEllipsis>;

const Template: ComponentStory<typeof TextEllipsis> = args => <TextEllipsis {...args} />;

export const DefaultComponent = Template.bind({});
DefaultComponent.args = {
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
};
