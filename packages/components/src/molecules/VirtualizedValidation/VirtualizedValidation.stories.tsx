import {ComponentMeta, ComponentStory} from '@storybook/react';
import VirtualizedValidation from './VirtualizedValidation';
import {MainValidationOverviewArgs} from './ValidationOverview.stories.args';

export default {
  title: 'Molecules/VirtualizedValidation',
  component: VirtualizedValidation,
} as ComponentMeta<typeof VirtualizedValidation>;

const Template: ComponentStory<typeof VirtualizedValidation> = args => <VirtualizedValidation {...args} />;

export const MainValidationOverview = Template.bind({});
MainValidationOverview.args = MainValidationOverviewArgs;
