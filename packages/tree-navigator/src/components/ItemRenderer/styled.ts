// import { Checkbox as RawCheckbox } from "antd";

import styled from "styled-components";

import { Colors } from "../../styles/colors";

type ItemContainerProps = {
  $isSelected: boolean;
  $isHighlighted: boolean;
  $isHovered: boolean;
  $disableHoverStyle: boolean;
  $hasOnClick: boolean;
  $indentation: number;
  $isSectionCheckable: boolean;
  $hasCustomRow: boolean;
};

export const ItemContainer = styled.span<ItemContainerProps>`
  display: flex;
  align-items: center;
  width: 100%;
  user-select: none;
  padding-right: 8px;
  ${(props) => {
    const defaultIndentation = props.$isSectionCheckable ? 32 : 26;
    return `padding-left: ${defaultIndentation + props.$indentation}px;`;
  }}
  ${(props) => props.$hasOnClick && `cursor: pointer;`}
  ${(props) => {
    if (props.$disableHoverStyle) {
      return;
    }
    if (!props.$isSelected && props.$isHighlighted) {
      if (props.$isHovered) {
        return `background: ${Colors.highlightGradientHover};`;
      }
      return `background: ${Colors.highlightGradient};`;
    }
    if (props.$isSelected) {
      if (props.$isHovered) {
        return `background: ${Colors.selectionGradientHover};`;
      }
      return `background: ${Colors.selectionGradient};`;
    }
    if (props.$isHovered) {
      return `background: ${Colors.blackPearl};`;
    }
  }};
  ${(props) => !props.$isHovered && "padding-right: 46px;"}
  ${(props) => props.$hasCustomRow && "padding-right: 0px;"}
`;

type ItemNameProps = {
  $isSelected: boolean;
  $isHighlighted: boolean;
  $isDirty: boolean;
  $isDisabled: boolean;
};

export const ItemName = styled.span<ItemNameProps>`
  padding: 2px 0;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  ${(props) => {
    if (props.$isSelected) {
      return `font-weight: 700;`;
    }
    if (props.$isHighlighted) {
      return `font-weight: 500;`;
    }
  }};
  ${(props) => {
    if (props.$isDisabled) {
      return `color: ${Colors.grey7};`;
    }
    if (!props.$isSelected && props.$isDirty) {
      return `color: ${Colors.yellow7};`;
    }
    if (!props.$isSelected && props.$isHighlighted) {
      return `color: ${Colors.cyan7};`;
    }
    if (props.$isSelected) {
      return `color: ${Colors.blackPure};`;
    }
    return `color: ${Colors.blue10};`;
  }};
`;

export const PrefixContainer = styled.span`
  min-width: 20px;
`;

export const SuffixContainer = styled.span`
  display: flex;
  align-items: center;
`;

export const QuickActionContainer = styled.span`
  margin-left: auto;
`;

export const ContextMenuContainer = styled.span`
  margin-left: auto;
`;

export const BlankSpace = styled.span`
  flex-grow: 1;
  height: 20px;
`;

// export const Checkbox = styled(RawCheckbox)`
//   margin-left: -24px;
// `;

export const Checkbox = styled.input`
  margin-left: -24px;
`;
