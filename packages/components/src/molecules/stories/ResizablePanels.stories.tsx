import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ResizableColumnsPanel, ResizableRowsPanel} from '../Panels';
import {AllColumnsArgs} from '../Panels/args';

export default {
  title: 'Organisms/ResizablePanels',
  component: ResizableRowsPanel,
} as ComponentMeta<typeof ResizableRowsPanel>;

export const ResizablePanels: ComponentStory<typeof ResizableRowsPanel> = () => (
  <div style={{height: 700, width: 1500}}>
    <ResizableRowsPanel
      defaultSizes={[500, 200]}
      top={<ResizableColumnsPanel {...AllColumnsArgs} />}
      bottom={<div style={{background: '#FF9933', height: '100%'}}>Bottom Panel</div>}
    />
  </div>
);
