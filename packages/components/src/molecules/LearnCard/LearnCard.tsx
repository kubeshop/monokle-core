import {AnimationDurations} from '@/styles/Animations';
import {Colors} from '@/styles/Colors';
import React from 'react';
import styled from 'styled-components';
import {LearnCardType} from './types';

const LearnCard: React.FC<LearnCardType> = props => {
  const {description, icon, title, onClick} = props;

  const onKeyDown = (event: React.KeyboardEvent) => {
    event.preventDefault();
    if (event.key === 'Enter' || event.key === ' ') {
      onClick();
    }
  };

  return (
    <LearnCardContainer tabIndex={0} role="button" onClick={onClick} onKeyDown={onKeyDown}>
      <IconContainer>{icon}</IconContainer>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </LearnCardContainer>
  );
};

export default LearnCard;

// Styled Components

const Description = styled.div`
  color: ${Colors.grey8};
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  color: ${Colors.geekblue7};
  background-color: ${Colors.iconBG};
`;

const LearnCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  border-radius: 4px;
  transition: background ${AnimationDurations.base};

  background-color: ${Colors.cardBG};
  padding: 0px 30px;
  cursor: pointer;

  :hover {
    background-color: ${Colors.geekblue5};
  }
`;

const Title = styled.div`
  font-weight: 700;
  color: ${Colors.grey9};
`;
