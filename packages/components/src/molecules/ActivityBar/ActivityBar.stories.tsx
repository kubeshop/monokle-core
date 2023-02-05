import {ComponentMeta, ComponentStory} from '@storybook/react';
import ActivityBar from './ActivityBar';

import {ExtraActivityBarArgs, HiddenOptionsActivityBarArgs, MainActivityBarArgs} from './args';

export default {
  title: 'Molecules/ActivityBar',
  component: ActivityBar,
} as ComponentMeta<typeof ActivityBar>;

const Template: ComponentStory<typeof ActivityBar> = args => <ActivityBar {...args} />;

export const MainActivityBar = Template.bind({});
MainActivityBar.args = MainActivityBarArgs;

export const ExtraActivityBar = Template.bind({});
ExtraActivityBar.args = ExtraActivityBarArgs;

export const HiddenOptionsActivityBar = Template.bind({});
HiddenOptionsActivityBar.args = HiddenOptionsActivityBarArgs;
