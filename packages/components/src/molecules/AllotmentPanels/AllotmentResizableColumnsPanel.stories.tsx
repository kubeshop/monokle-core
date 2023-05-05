import {ComponentMeta, ComponentStory} from '@storybook/react';
import AllotmentResizableColumnsPanel from './AllotmentResizableColumnsPanel';
import {AllColumnsArgs, ClosableLeftColumnArgs, WithoutLeftColumnArgs} from './args';

export default {
  title: 'Molecules/AllotmentResizableColumnsPanel',
  component: AllotmentResizableColumnsPanel,
} as ComponentMeta<typeof AllotmentResizableColumnsPanel>;

const Template: ComponentStory<typeof AllotmentResizableColumnsPanel> = args => (
  <AllotmentResizableColumnsPanel {...args} />
);

export const AllColumns = Template.bind({});
AllColumns.args = AllColumnsArgs;

export const WithoutLeftColumn = Template.bind({});
WithoutLeftColumn.args = WithoutLeftColumnArgs;

export const ClosableLeftColumn = Template.bind({});
ClosableLeftColumn.args = ClosableLeftColumnArgs;
