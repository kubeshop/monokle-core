import Colors from "@/styles/Colors";
import styled from "styled-components";

import { Badge as RawBadge, Button as RawButton } from "antd";

interface GetColorParams {
  isSelected: boolean;
  isActive?: boolean;
  isHighlighted?: boolean;
}

export const ItemBox = styled.div<{ $isActive: boolean; $isSelected: boolean }>`
  background-color: ${({ $isSelected, $isActive }) =>
    $isSelected ? Colors.grey10 : $isActive ? Colors.blackPure : Colors.grey10};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
`;

export const Badge = styled(RawBadge)`
  & .ant-badge-dot {
    z-index: 100;
    background-color: ${Colors.geekblue6} !important;
    box-shadow: none;
  }

  & .ant-badge-count {
    top: 1px;
    right: -2px;
    z-index: 100;
    padding: 0px 4px;
    background-color: ${Colors.geekblue6} !important;
    box-shadow: none;
  }

  & .ant-badge-count-sm {
    min-width: 12px;
    height: 12px;
    font-size: 8px;
    line-height: 11px;
    box-shadow: none;
  }
`;

const getButtonBackground = ({ isSelected }: GetColorParams): string =>
  isSelected ? Colors.highlightBlue : "rgba(51, 60, 63, 0.5)";

const getButtonForeground = ({ isSelected, isHighlighted }: GetColorParams): string =>
  isSelected ? Colors.highlightCyan : isHighlighted ? Colors.highlightBlue : "currentColor";

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
