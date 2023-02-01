import styled from 'styled-components';
import {Modal as RawModal} from 'antd';
import {MenuOutlined, SettingOutlined} from '@ant-design/icons';

import {Icon as RawIcon} from '@/atoms';

import {Colors} from '@/styles/Colors';

export const Modal = styled(RawModal).attrs({
  className: 'walkthrough-modal',
})`
  min-width: 950px;

  .ant-modal-content {
    background-color: ${Colors.grey9} !important;
    border-radius: 4px;
  }
`;

export const Icon = styled(RawIcon)<{
  $transparent?: boolean;
  $color?: string;
}>`
  background-color: ${({$transparent}) => ($transparent ? 'transparent' : Colors.grey4)};
  font-size: 14px;
  padding: 2px;
  margin: 0 4px;
  color: ${({$color}) => $color || Colors.grey9};
  border-radius: 50%;
`;

export const MenuOutlinedIcon = styled(MenuOutlined)`
  background-color: ${Colors.grey4};
  font-size: 14px;
  padding: 4px;
  margin: 0 4px;
  color: ${Colors.grey9};
  border-radius: 2px;
`;

export const SettingOutlinedIcon = styled(SettingOutlined)`
  background-color: ${Colors.grey4};
  font-size: 14px;
  padding: 4px;
  margin: 0 4px;
  color: ${Colors.grey9};
  border-radius: 50%;
`;
