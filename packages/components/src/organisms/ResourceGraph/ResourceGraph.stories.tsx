import {ComponentMeta, ComponentStory} from '@storybook/react';
import ResourceGraph from './ResourceGraph';
import {ResourceGraphArgs} from './ResourceGraph.stories.args';

export default {
  title: 'Organisms/ResourceGraph',
  component: ResourceGraph,
} as ComponentMeta<typeof ResourceGraph>;

const Template: ComponentStory<typeof ResourceGraph> = args => (
  <div style={{ height: '500px' }}>
    <ResourceGraph {...args} />
  </div>
);

export const MainResourceGraph = Template.bind({});
MainResourceGraph.args = ResourceGraphArgs;
