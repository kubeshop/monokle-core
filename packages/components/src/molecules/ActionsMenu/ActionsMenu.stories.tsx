import {ComponentMeta, ComponentStory} from '@storybook/react';
import ActionsMenu from './ActionsMenu';
import {MainActionsMenuArgs} from './ActionsMenu.stories.args';

export default {
  title: 'Molecules/ActionsMenu',
  component: ActionsMenu,
} as ComponentMeta<typeof ActionsMenu>;

const Template: ComponentStory<typeof ActionsMenu> = args => <ActionsMenu {...args} />;

export const MainActionsMenu = Template.bind({});
MainActionsMenu.args = MainActionsMenuArgs;
