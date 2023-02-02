import HelpfulResourceCard from './HelpfulResourceCard';
import * as S from './LearnPage.styled';
import {LearnPageType} from './types';

const LearnPage: React.FC<LearnPageType> = ({
  onHelpfulResourceCardClick,
  children
}) => {
  return (
    <S.LearnPageContainer>
      <S.Description>
        Select in which stage of the K8s manifests management you are in (or
        from which one you want to learn more about) and let us show you how
        Monokle can help you.
      </S.Description>

      <S.LearnCardsContainer>
        {children}
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
