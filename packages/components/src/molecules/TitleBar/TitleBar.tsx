import { TitleBarType } from "..";
import * as S from "./TitleBar.styled";

const TitleBar: React.FC<TitleBarType> = (props) => {
  const { actions, expandable = false, isOpen = false, title, type = "primary" } = props;

  return (
    <>
      <S.HeaderContainer $expandable={expandable} $isOpen={isOpen} $type={type}>
        <S.Title $expandable={expandable} $isOpen={isOpen}>
          {title}
        </S.Title>

        <S.ActionsContainer>{actions}</S.ActionsContainer>
      </S.HeaderContainer>
    </>
  );
};

export default TitleBar;
