import {Colors} from '@/styles/Colors';
import {Button, ButtonProps} from 'antd';

import styled from 'styled-components';

export const IconButton = styled((props: ButtonProps) => <Button {...props} />).attrs({
  className: 'icon-button',
})<{
  $size?: 'small' | 'medium' | 'large';
}>`
  border-radius: 50%;
  padding: ${({$size}) =>
    $size === 'small' ? '2px 4px' : $size === 'medium' || !$size ? '4px 8px 3px 8px' : '3px 8px'};
  border: none;
  background-color: ${Colors.dark70};
  font-size: ${({$size}) => ($size === 'small' ? '12' : $size === 'medium' || !$size ? '14' : '16')}px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${Colors.dark70};
    color: ${Colors.buttonHover};
  }

  &:active,
  &:focus {
    background-color: ${Colors.dark70};
  }
`;
