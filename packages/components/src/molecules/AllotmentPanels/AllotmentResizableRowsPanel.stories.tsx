import {ComponentMeta, ComponentStory} from '@storybook/react';
import {AllRowsArgs, WithoutBottomRowArgs} from './args';
import AllotmentResizableRowsPanel from './AllotmentResizableRowsPanel';

export default {
  title: 'Molecules/AllotmentResizableRowsPanel',
  component: AllotmentResizableRowsPanel,
} as ComponentMeta<typeof AllotmentResizableRowsPanel>;

const Template: ComponentStory<typeof AllotmentResizableRowsPanel> = args => <AllotmentResizableRowsPanel {...args} />;

export const AllPanels = Template.bind({});
AllPanels.args = AllRowsArgs;

export const WithoutBottomPanel = Template.bind({});
WithoutBottomPanel.args = WithoutBottomRowArgs;
