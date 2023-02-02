import {ComponentMeta, ComponentStory} from '@storybook/react';
import {KeyValueInput} from './KeyValueInput';

export default {
  title: 'Atoms/KeyValueInput',
  component: KeyValueInput,
} as ComponentMeta<typeof KeyValueInput>;

const Template: ComponentStory<typeof KeyValueInput> = args => <KeyValueInput {...args} />;

export const IsExistOperatorComponent = Template.bind({});

IsExistOperatorComponent.args = {
  pair: ['label', ''],
};

export const IsEqualOperatorComponent = Template.bind({});

IsEqualOperatorComponent.args = {
  pair: ['label', 'demo'],
};
