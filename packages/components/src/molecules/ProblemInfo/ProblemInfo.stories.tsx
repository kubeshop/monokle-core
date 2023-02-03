import {ComponentMeta, ComponentStory} from '@storybook/react';
import ProblemInfo from './ProblemInfo';
import {LocationClickProblemInfoArgs, MainProblemInfoArgs} from './ProblemInfo.stories.args';

export default {
  title: 'Molecules/ErrorInfo',
  component: ProblemInfo,
} as ComponentMeta<typeof ProblemInfo>;

const Template: ComponentStory<typeof ProblemInfo> = args => <ProblemInfo {...args} />;

export const MainProblemInfo = Template.bind({});
MainProblemInfo.args = MainProblemInfoArgs;

export const LocationClickProblemInfo = Template.bind({});
LocationClickProblemInfo.args = LocationClickProblemInfoArgs;
