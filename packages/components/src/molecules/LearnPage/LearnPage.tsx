import {CheckOutlined, UnorderedListOutlined} from '@ant-design/icons';

import {Icon} from '@/atoms/Icon';
import {HelpTopic, LearnTopic} from './types';

import HelpfulResourceCard from './HelpfulResourceCard';
import LearnCard from './LearnCard';
import * as S from './LearnPage.styled';

interface IProps {
  onLearnCardClick: (topic: LearnTopic) => void;
  onHelpfulResourceCardClick: (topic: HelpTopic) => void;
}

const LearnPage: React.FC<IProps> = ({
  onLearnCardClick,
  onHelpfulResourceCardClick,
}) => {
  return (
    <S.LearnPageContainer>
      <S.Description>
        Select in which stage of the K8s manifests management you are in (or
        from which one you want to learn more about) and let us show you how
        Monokle can help you.
      </S.Description>

      <S.LearnCardsContainer>
        <LearnCard
          description="Configure your resources workspace, whereas it's local, on a Git, a cluster or from scratch."
          icon={<UnorderedListOutlined />}
          title="Explore"
          onClick={() => onLearnCardClick('explore')}
        />

        <LearnCard
          description="Fix errors in your resources, compare them, learn about yaml best practices and much more."
          icon={<Icon name="terminal" style={{fontSize: '16px'}} />}
          title="Edit"
          onClick={() => onLearnCardClick('edit')}
        />

        <LearnCard
          description="Configure your policies & validation rules, create your own. See & fix validation errors."
          icon={<CheckOutlined />}
          title="Validate"
          onClick={() => onLearnCardClick('validate')}
        />

        <LearnCard
          description="Save locally, get into Git (Github, Gitlab), create PRs, deploy to a cluster..."
          icon={<S.CloudUploadOutlined />}
          title="Publish"
          onClick={() => onLearnCardClick('publish')}
        />
      </S.LearnCardsContainer>

      <S.SubTitle>Helpful resources</S.SubTitle>

      <S.HelpfulResourcesContainer>
        <HelpfulResourceCard
          description="Everything you need to know"
          title="Documentation"
          onClick={() => onHelpfulResourceCardClick('documentation')}
        />

        <HelpfulResourceCard
          description="To learn the basics"
          title="3-minute Video Tutorial"
          onClick={() => onHelpfulResourceCardClick('video-tutorial')}
        />

        <HelpfulResourceCard
          description="Join the conversation"
          title="Discord"
          onClick={() => onHelpfulResourceCardClick('discord')}
        />
      </S.HelpfulResourcesContainer>
    </S.LearnPageContainer>
  );
};

export default LearnPage;
