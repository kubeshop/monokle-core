import Colors from "@/styles/Colors";
import { Button } from "antd";
import styled from "styled-components";

export const ActionsContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 16px;
  padding: 0 16px;
`;

export const FiltersButton = styled(Button)`
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  color: ${Colors.blue7};
  border-radius: 4px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.07);
    color: ${Colors.blue7};
  }
`;

export const MainContainer = styled.div`
  background-color: #191f21;
`;
