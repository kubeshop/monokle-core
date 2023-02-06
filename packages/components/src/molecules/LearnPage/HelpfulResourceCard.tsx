import {AnimationDurations} from '@/styles/Animations';
import {Colors} from '@/styles/Colors';
import styled from 'styled-components';
import {HelpfulResourceCardType} from './types';
import {rgba} from 'polished';

const HelpfulResourceCard: React.FC<HelpfulResourceCardType> = props => {
  const {description, title, onClick} = props;

  return (
    <HelpfulResourceCardContainer onClick={onClick}>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </HelpfulResourceCardContainer>
  );
};

export default HelpfulResourceCard;

// Styled Components

const Description = styled.div`
  color: ${Colors.grey8};
`;

const HelpfulResourceCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #191f21;
  border-radius: 4px;
  padding: 0px 20px;
  transition: background ${AnimationDurations.base};
  cursor: pointer;

  &:hover {
    background-color: ${rgba('#191f21', 0.75)};
  }
`;

const Title = styled.div`
  margin-bottom: 4px;
  color: ${Colors.blue7};
`;
