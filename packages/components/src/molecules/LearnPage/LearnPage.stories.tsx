import {ComponentMeta, ComponentStory} from '@storybook/react';
import {CheckOutlined, CloudUploadOutlined, UnorderedListOutlined} from '@ant-design/icons';
import {Icon} from '@/atoms/Icon';
import {LearnCard} from '@/molecules/LearnCard';
import LearnPage from './LearnPage';

export default {
  title: 'Molecules/LearnPage',
  component: LearnPage,
} as ComponentMeta<typeof LearnPage>;

const Template: ComponentStory<typeof LearnPage> = args => (
  <LearnPage {...args}>
    <LearnCard
      description="Configure your resources workspace, whereas it's local, on a Git, a cluster or from scratch."
      icon={<UnorderedListOutlined />}
      title="Explore"
      onClick={() => {}}
    />

    <LearnCard
      description="Fix errors in your resources, compare them, learn about yaml best practices and much more."
      icon={<Icon name="terminal" style={{fontSize: '16px'}} />}
      title="Edit"
      onClick={() => {}}
    />

    <LearnCard
      description="Configure your policies & validation rules, create your own. See & fix validation errors."
      icon={<CheckOutlined />}
      title="Validate"
      onClick={() => {}}
    />

    <LearnCard
      description="Save locally, get into Git (Github, Gitlab), create PRs, deploy to a cluster..."
      icon={<CloudUploadOutlined />}
      title="Publish"
      onClick={() => {}}
    />
  </LearnPage>
);

export const MainLearnPage = Template.bind({});
