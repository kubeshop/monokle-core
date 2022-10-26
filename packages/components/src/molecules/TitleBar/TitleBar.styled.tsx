import Colors, { PanelColors } from "@/styles/Colors";
import styled from "styled-components";

export const ActionsContainer = styled.div`
  margin-left: auto;
`;

export const HeaderContainer = styled.div<{ $expandable: boolean; $isOpen: boolean; $type: "primary" | "secondary" }>`
  background-color: ${({ $expandable, $isOpen, $type }) =>
    $type === "secondary" ? PanelColors.toolBar : !$expandable || $isOpen ? Colors.geekblue7 : Colors.blue2};
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 10px;
`;

export const Title = styled.div<{ $expandable: boolean; $isOpen: boolean }>`
  font-weight: 600;
  color: ${({ $expandable, $isOpen }) => (!$expandable || $isOpen ? Colors.whitePure : Colors.grey9)};
  font-size: 14px;
`;
