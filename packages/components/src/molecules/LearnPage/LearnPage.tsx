import {Colors} from '@/styles/Colors';
import styled from 'styled-components';
import HelpfulResourceCard from './HelpfulResourceCard';
import {LearnPageType} from './types';

const LearnPage: React.FC<LearnPageType> = ({onHelpfulResourceCardClick, children}) => {
  return (
    <LearnPageContainer>
      <Description>
        Select in which stage of the K8s manifests management you are in (or from which one you want to learn more
        about) and let us show you how Monokle can help you.
      </Description>

      <LearnCardsContainer>{children}</LearnCardsContainer>

      <SubTitle>Helpful resources</SubTitle>

      <HelpfulResourcesContainer>
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
      </HelpfulResourcesContainer>
    </LearnPageContainer>
  );
};

export default LearnPage;

// Styled Components

const Description = styled.div`
  color: ${Colors.grey8};
  margin-bottom: 46px;
`;

const HelpfulResourcesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: 100px;
  grid-gap: 15px;
`;

const LearnCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: 180px;
  grid-column-gap: 30px;
  grid-row-gap: 28px;
`;

const LearnPageContainer = styled.div``;

const SubTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin: 56px 0px 36px 0px;
`;
