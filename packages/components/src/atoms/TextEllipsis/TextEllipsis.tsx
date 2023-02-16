import styled from 'styled-components';

export type TextEllipsisProps = {
  text: string;
  style?: React.CSSProperties;
};

const TextEllipsis: React.FC<TextEllipsisProps> = props => {
  const {style = {}, text} = props;

  return (
    <Container style={style}>
      <span>{text}</span>
    </Container>
  );
};

export default TextEllipsis;

// Styled Components

const Container = styled.div`
  width: 100%;
  position: relative;

  &:before {
    content: '&nbsp;';
    visibility: hidden;
  }

  & span {
    position: absolute;
    left: 0;
    right: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
