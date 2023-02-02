import {ComponentMeta, ComponentStory} from '@storybook/react';
import WalkThroughCard from './WalkThroughCard';
import { WalkThoughCardArgs } from './args';

export default {
  title: 'Molecules/WalkThroughCard',
  component: WalkThroughCard,
} as ComponentMeta<typeof WalkThroughCard>;

const Template: ComponentStory<typeof WalkThroughCard> = args => (
  <WalkThroughCard
    {...args}
  />
);

export const MainWalkThroughCard = Template.bind({});
MainWalkThroughCard.args = WalkThoughCardArgs;
