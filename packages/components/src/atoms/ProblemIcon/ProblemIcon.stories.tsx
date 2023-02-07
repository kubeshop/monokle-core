import {ComponentMeta, ComponentStory} from '@storybook/react';
import ProblemIcon from './ProblemIcon';

export default {
  title: 'Atoms/ProblemIcon',
  component: ProblemIcon,
} as ComponentMeta<typeof ProblemIcon>;

const Template: ComponentStory<typeof ProblemIcon> = args => <ProblemIcon {...args} />;

export const DefaultComponent = Template.bind({});
DefaultComponent.args = {
  level: 'both',
};
