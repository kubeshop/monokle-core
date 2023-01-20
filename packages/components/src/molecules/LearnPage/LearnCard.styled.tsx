import {Button as RawButton} from 'antd';

import styled from 'styled-components';

import {Colors} from '@/styles/Colors';
import {AnimationDurations} from '@/styles/Animations';

export const Button = styled(RawButton)`
  border-radius: 2px;
  color: ${Colors.whitePure};
  width: max-content;
  margin-top: 6px;
`;

export const Description = styled.div`
  color: ${Colors.grey8};
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  color: ${Colors.geekblue7};
  background-color: ${Colors.iconBG};
`;

export const LearnCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  border-radius: 4px;
  transition: background ${AnimationDurations.base};

  background-color: ${Colors.cardBG};
  padding: 0px 30px;
  cursor: pointer;

  :hover {
    background-color: ${Colors.geekblue5};
  }
`;

export const Title = styled.div`
  font-weight: 700;
  color: ${Colors.grey9};
`;
