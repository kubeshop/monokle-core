import {ComponentMeta, ComponentStory} from '@storybook/react';
import PaneCloseIcon from './PaneCloseIcon';

export default {
  title: 'Atoms/PaneCloseIcon',
  component: PaneCloseIcon,
} as ComponentMeta<typeof PaneCloseIcon>;

const Template: ComponentStory<typeof PaneCloseIcon> = args => <PaneCloseIcon {...args} />;

export const DefaultComponent = Template.bind({});
DefaultComponent.args = {
  containerStyle: {
    backgroundColor: 'red',
  },
  onClick: () => {},
};
