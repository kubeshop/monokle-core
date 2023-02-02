import {Button as AntButton, ButtonProps} from 'antd';

import styled, {css} from 'styled-components';
import {rgba} from 'polished';
import {Colors} from '@/styles/Colors';

export const AppButton = styled((props: ButtonProps) => <AntButton {...props} />).attrs({
  className: 'app-button',
})<{
  $disableHover?: boolean;
}>`
  border-radius: 4px;
  padding: 0px 14px;
  font-weight: 600;
  border: none;

  ${({type, $disableHover}) => {
    if (type === 'primary') {
      return css`
        &.ant-btn-link {
          padding: 0px 6px;
        }
      `;
    }

    if (!type || type === 'default') {
      return css`
        color: ${Colors.blue6};
        background-color: ${Colors.grey3b};
        &:hover {
          color: ${$disableHover ? Colors.blue6 : Colors.buttonHover};
          background-color: ${$disableHover ? Colors.grey3b : rgba(Colors.grey3b, 0.8)};
        }
      `;
    }
  }}
`;
