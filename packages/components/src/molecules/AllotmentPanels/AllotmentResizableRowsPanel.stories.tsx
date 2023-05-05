import {ComponentMeta, ComponentStory} from '@storybook/react';
import {AllRowsArgs, WithoutBottomRowArgs} from './args';
import AllotmentResizableRowsPanel from './AllotmentResizableRowsPanel';

export default {
  title: 'Molecules/AllotmentResizableRowsPanel',
  component: AllotmentResizableRowsPanel,
} as ComponentMeta<typeof AllotmentResizableRowsPanel>;

const Template: ComponentStory<typeof AllotmentResizableRowsPanel> = args => (
  <div style={{height: 600, width: 1000}}>
    <AllotmentResizableRowsPanel {...args} />
  </div>
);

export const AllPanels = Template.bind({});
AllPanels.args = AllRowsArgs;

export const WithoutBottomPanel = Template.bind({});
WithoutBottomPanel.args = WithoutBottomRowArgs;
