import * as S from './HelpfulResourceCard.styled';
import {HelpfulResourceCardType} from './types';

const HelpfulResourceCard: React.FC<HelpfulResourceCardType> = props => {
  const {description, title, onClick} = props;

  return (
    <S.HelpfulResourceCardContainer onClick={onClick}>
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
    </S.HelpfulResourceCardContainer>
  );
};

export default HelpfulResourceCard;
