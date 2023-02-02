import {ComponentMeta, ComponentStory} from '@storybook/react';
import { LearnCardArgs } from './args';
import LearnCard from './LearnCard';

export default {
  title: 'Molecules/LearnCard',
  component: LearnCard,
} as ComponentMeta<typeof LearnCard>;

const Template: ComponentStory<typeof LearnCard> = args => (
  <div style={{ display: 'flex', minHeight: 180 }}>
    <LearnCard {...args} />
  </div>
);

export const MainLearnCard = Template.bind({});
MainLearnCard.args = LearnCardArgs
