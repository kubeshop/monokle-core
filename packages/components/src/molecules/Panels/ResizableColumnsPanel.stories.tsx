import {ComponentMeta, ComponentStory} from '@storybook/react';
import ResizableColumnsPanel from './ResizableColumnsPanel';
import {AllColumnsArgs, ClosableLeftColumnArgs, WithoutLeftColumnArgs} from './args';

export default {
  title: 'Molecules/ResizableColumnsPanel',
  component: ResizableColumnsPanel,
} as ComponentMeta<typeof ResizableColumnsPanel>;

const Template: ComponentStory<typeof ResizableColumnsPanel> = args => (
  <div style={{width: '1500px', height: '800px'}}>
    <ResizableColumnsPanel {...args} />{' '}
  </div>
);

export const AllColumns = Template.bind({});
AllColumns.args = AllColumnsArgs;

export const WithoutLeftColumn = Template.bind({});
WithoutLeftColumn.args = WithoutLeftColumnArgs;

export const ClosableLeftColumn = Template.bind({});
ClosableLeftColumn.args = ClosableLeftColumnArgs;
