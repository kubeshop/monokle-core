import Colors from "@/styles/Colors";
import React from "react";
import styled from "styled-components";

import { DoubleLeftOutlined as RawDoubleLeftOutlined } from "@ant-design/icons";

export type PaneCloseIconType = {
  onClick: () => void;
  containerId?: string;
  containerStyle?: React.CSSProperties;
  iconStyle?: React.CSSProperties;
};

export const PaneCloseIcon: React.FC<PaneCloseIconType> = (props) => {
  const { containerId = "pane-close", containerStyle = {}, iconStyle = {}, onClick } = props;

  return (
    <StyledPaneCloseIconContainer id={containerId} style={{ ...containerStyle }} onClick={onClick}>
      <StyledDoubleLeftOutlined style={{ ...iconStyle }} />
    </StyledPaneCloseIconContainer>
  );
};

// Styled Components

const StyledDoubleLeftOutlined = styled(RawDoubleLeftOutlined)`
  font-size: 12px;
  color: ${Colors.grey2};
`;

const StyledPaneCloseIconContainer = styled.div`
  background-color: ${Colors.whitePure};
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;