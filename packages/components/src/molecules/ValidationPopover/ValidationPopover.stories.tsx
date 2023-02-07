import {ComponentMeta, ComponentStory} from '@storybook/react';
import ValidationPopover from './ValidationPopover';
import {MainValidationPopoverArgs, MessageClickValidationPopoverArgs} from './ValidationPopover.stories.args';

export default {
  title: 'Molecules/ValidationPopover',
  component: ValidationPopover,
} as ComponentMeta<typeof ValidationPopover>;

const Template: ComponentStory<typeof ValidationPopover> = args => <ValidationPopover {...args} />;

export const MainValidationPopover = Template.bind({});
MainValidationPopover.args = MainValidationPopoverArgs;

export const MessageClickValidationPopover = Template.bind({});
MessageClickValidationPopover.args = MessageClickValidationPopoverArgs;
