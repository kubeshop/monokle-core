import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Select} from 'antd';
import {Filter} from './Filter';
import {FilterField} from './FilterForm';

export default {
  title: 'Atoms/Filter',
  component: Filter,
} as ComponentMeta<typeof Filter>;

const Template: ComponentStory<typeof Filter> = args => (
  <Filter {...args}>
    <FilterField name="Kind">
      <Select
        mode="tags"
        value={[]}
        placeholder="Select one or more kinds.."
        options={[{value: 'deployment'}]}
        onChange={() => {}}
        onClear={() => {}}
        style={{width: '100%'}}
      />
    </FilterField>

    <FilterField name="Namespace">
      <Select
        style={{width: '100%'}}
        placeholder="Select one or more namespaces.."
        value={[]}
        options={[{value: 'default'}]}
        onChange={() => {}}
        onClear={() => {}}
        allowClear
      />
    </FilterField>
  </Filter>
);

export const FilterComponent = Template.bind({});

FilterComponent.args = {
  height: 224,
  active: true,
};
