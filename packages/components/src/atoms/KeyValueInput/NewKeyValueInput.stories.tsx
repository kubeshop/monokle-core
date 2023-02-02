import {ComponentMeta, ComponentStory} from '@storybook/react';
import {NewKeyValueInput} from './NewKeyValueInput';

export default {
  title: 'Atoms/NewKeyValueInput',
  component: NewKeyValueInput,
} as ComponentMeta<typeof NewKeyValueInput>;

const Template: ComponentStory<typeof NewKeyValueInput> = args => <NewKeyValueInput {...args} />;

export const NewKeyValueComponent = Template.bind({});
NewKeyValueComponent.args = {
  keyOptions: [{value: 'demo'}, {value: 'api'}, {value: 'app'}],
};
