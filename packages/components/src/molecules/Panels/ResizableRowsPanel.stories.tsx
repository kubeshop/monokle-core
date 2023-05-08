import {ComponentMeta, ComponentStory} from '@storybook/react';
import {AllRowsArgs, WithoutBottomRowArgs} from './args';
import ResizableRowsPanel from './ResizableRowsPanel';

export default {
  title: 'Molecules/ResizableRowsPanel',
  component: ResizableRowsPanel,
} as ComponentMeta<typeof ResizableRowsPanel>;

const Template: ComponentStory<typeof ResizableRowsPanel> = args => (
  <div style={{height: 600, width: 1000}}>
    <ResizableRowsPanel {...args} />
  </div>
);

export const AllPanels = Template.bind({});
AllPanels.args = AllRowsArgs;

export const WithoutBottomPanel = Template.bind({});
WithoutBottomPanel.args = WithoutBottomRowArgs;
