import styled, {css} from 'styled-components';
import {Modal as RawModal, Typography} from 'antd';
import {MenuOutlined, SettingOutlined} from '@ant-design/icons';

import {Icon as RawIcon} from '@/atoms';

import {Colors} from '@/styles/Colors';

export const Modal = styled(RawModal)`
  min-width: 950px;

  .ant-modal-content {
    background-color: ${Colors.grey9};
    border-radius: 4px;
  }
`;

export const Slice = styled.div`
  display: grid;

  ul {
    padding-inline-start: 20px;
  }
`;

export const SubHeading = styled(Typography.Title)`
  color: ${Colors.grey2} !important;
  font-weight: 700;
  font-size: 28px !important;
  line-height: 36px !important;
`;

export const Text = styled(Typography.Text)<{$bold?: boolean}>`
  margin-bottom: 16px;
  color: ${Colors.grey2};

  ${({$bold}) => {
    if ($bold) {
      return css`
        font-weight: 500;
        font-size: 16px;
        line-height: 26px;
      `;
    } else {
      return css`
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
      `;
    }
  }};
`;

export const Icon = styled(RawIcon)<{$transparent?: boolean; $color?: string}>`
  background-color: ${({$transparent}) =>
    $transparent ? 'transparent' : Colors.grey4};
  font-size: 14px;
  padding: 4px;
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
  border-radius: 50%;
`;

export const SettingOutlinedIcon = styled(SettingOutlined)`
  background-color: ${Colors.grey4};
  font-size: 14px;
  padding: 4px;
  margin: 0 4px;
  color: ${Colors.grey9};
  border-radius: 50%;
`;
