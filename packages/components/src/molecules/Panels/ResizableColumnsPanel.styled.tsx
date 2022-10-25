import Colors from "@/styles/Colors";
import styled from "styled-components";

export const Pane = styled.div`
  position: relative;
  height: 100%;
  overflow-y: hidden;
`;

export const LeftPane = styled(Pane)`
  background-color: ${Colors.grey10};
  height: 100%;
`;
