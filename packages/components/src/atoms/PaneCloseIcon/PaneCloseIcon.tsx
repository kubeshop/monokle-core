import React from "react";
import * as S from "./PaneCloseIcon.styled";

export type PaneCloseIconType = {
  onClick: () => void;
  containerId?: string;
  containerStyle?: React.CSSProperties;
  iconStyle?: React.CSSProperties;
};

const PaneCloseIcon: React.FC<PaneCloseIconType> = (props) => {
  const { containerId = "pane-close", containerStyle = {}, iconStyle = {}, onClick } = props;

  return (
    <S.PaneCloseIconContainer id={containerId} style={{ ...containerStyle }} onClick={onClick}>
      <S.DoubleLeftOutlined style={{ ...iconStyle }} />
    </S.PaneCloseIconContainer>
  );
};

export default PaneCloseIcon;
