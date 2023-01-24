import {ComponentMeta, ComponentStory} from '@storybook/react';
import WalkThrough from './WalkThrough';

export default {
  title: 'Molecules/WalkThrough',
  component: WalkThrough,
} as ComponentMeta<typeof WalkThrough>;

const Template: ComponentStory<typeof WalkThrough> = args => (
  <WalkThrough {...args} />
);

export const WalkThroughPage = Template.bind({});
