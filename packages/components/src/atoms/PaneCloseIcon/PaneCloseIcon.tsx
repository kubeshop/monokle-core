import {Colors} from '@/styles/Colors';
import React from 'react';
import styled from 'styled-components';

import {LeftOutlined} from '@ant-design/icons';
import {Tooltip} from 'antd';
import {TOOLTIP_DELAY} from '@/constants';

export type PaneCloseIconType = {
  onClick: () => void;
  containerClassName?: string;
  containerId?: string;
  containerStyle?: React.CSSProperties;
  iconClassName?: string;
  iconStyle?: React.CSSProperties;
  tooltipTitle?: string;
};

const PaneCloseIcon: React.FC<PaneCloseIconType> = props => {
  const {containerId = 'pane-close', containerStyle = {}, iconStyle = {}, onClick} = props;
  const {containerClassName = '', iconClassName = '', tooltipTitle} = props;

  return (
    <Tooltip mouseEnterDelay={TOOLTIP_DELAY} title={tooltipTitle} placement="right">
      <StyledPaneCloseIconContainer
        className={containerClassName}
        id={containerId}
        style={{...containerStyle}}
        onClick={onClick}
      >
        <StyledLeftOutlined className={iconClassName} style={{...iconStyle}} />
      </StyledPaneCloseIconContainer>
    </Tooltip>
  );
};

export default PaneCloseIcon;

// Styled Components

const StyledLeftOutlined = styled(LeftOutlined)`
  font-size: 8px;
  color: ${Colors.backgroundGrey};
`;

const StyledPaneCloseIconContainer = styled.div`
  background-color: ${Colors.grey7};
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
