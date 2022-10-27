import Colors from "@/styles/Colors";
import styled from "styled-components";

export const BarBox = styled.div<{ $isActive: boolean }>`
  background-color: ${({ $isActive: activitySelected }) => (activitySelected ? Colors.blackPure : Colors.grey10)};
  height: 100%;
  width: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
