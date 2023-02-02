import {ComponentMeta, ComponentStory} from '@storybook/react';
import {AppButton} from './AppButtons';
import {EllipsisOutlined} from '@ant-design/icons';

export default {
  title: 'Atoms/AppButtons',
  component: AppButton,
} as ComponentMeta<typeof AppButton>;

const Template: ComponentStory<typeof AppButton> = args => <AppButton {...args} />;

export const PrimaryAppButton = Template.bind({});
PrimaryAppButton.args = {
  type: 'primary',
  children: 'Primary Button',
};

export const SecondaryAppButton = Template.bind({});
SecondaryAppButton.args = {
  $disableHover: false,
  children: 'Secondary Button',
};

export const DisabledSecondaryAppButton = Template.bind({});
DisabledSecondaryAppButton.args = {
  $disableHover: true,
  children: 'Secondary Button',
};
