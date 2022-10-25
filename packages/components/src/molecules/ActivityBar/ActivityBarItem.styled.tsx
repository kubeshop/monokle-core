import Colors from "@/styles/Colors";
import styled from "styled-components";

import { Badge as RawBadge, Button as RawButton } from 'antd';

interface GetColorParams {
    isSelected: boolean;
    isActive?: boolean;
    isHighlighted?: boolean;
  }

export const ItemBox = styled.div<{ isSelected: boolean; isActive: boolean }>`
  background-color: ${({ isSelected, isActive }) =>
    isSelected ? Colors.grey10 : isActive ? Colors.blackPure : Colors.grey10};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
`;

export const Badge = styled(RawBadge)`
  & .ant-badge-dot {
    top: 10px;
    right: 10px;
  }
`;

const getButtonBackground = ({ isSelected }: GetColorParams): string =>
  isSelected ? Colors.highlightBlue : 'rgba(51, 60, 63, 0.5)';

const getButtonForeground = ({
  isSelected,
  isHighlighted,
}: GetColorParams): string =>
  isSelected
    ? Colors.highlightCyan
    : isHighlighted
    ? Colors.highlightBlue
    : 'currentColor';

export const Button = styled(RawButton)<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  will-change: background;
  transition: background 500ms linear;
  focus: none;

  .anticon > svg {
    will-change: color;
    transition: color 500ms linear;
  }

  ${({ $isSelected: isSelected }) => `
      background: ${getButtonBackground({ isSelected })};

      .anticon > svg {
        color: ${getButtonForeground({ isSelected, isHighlighted: false })};
      }

      &:hover, &:focus {
        background: ${getButtonBackground({ isSelected })};
        
        .anticon > svg {
          color: ${getButtonForeground({ isSelected, isHighlighted: true })};
        }
      }
    `}
`;
