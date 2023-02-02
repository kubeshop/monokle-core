import {ComponentMeta, ComponentStory} from '@storybook/react';
import {IconButton} from './IconButton';
import {EllipsisOutlined} from '@ant-design/icons';

export default {
  title: 'Atoms/IconButton',
  component: IconButton,
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = args => <IconButton {...args} />;

export const LargeEllipsisIconButton = Template.bind({});
LargeEllipsisIconButton.args = {
  $size: 'large',
  children: <EllipsisOutlined />,
};

export const MediumEllipsisIconButton = Template.bind({});
MediumEllipsisIconButton.args = {
  $size: 'medium',
  children: <EllipsisOutlined />,
};

export const SmallEllipsisIconButton = Template.bind({});
SmallEllipsisIconButton.args = {
  $size: 'small',
  children: <EllipsisOutlined />,
};
