import * as S from "./TitleBar.styled";

type Props = {
  title: string;
};

const TitleBar: React.FC<Props> = (props) => {
  const { title } = props;

  return (
    <S.Container>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
};

export default TitleBar;
