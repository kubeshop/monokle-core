import React from 'react';
import * as S from './LearnCard.styled';
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
    <S.LearnCardContainer
      tabIndex={0}
      role="button"
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <S.IconContainer>{icon}</S.IconContainer>
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
    </S.LearnCardContainer>
  );
};

export default LearnCard;
