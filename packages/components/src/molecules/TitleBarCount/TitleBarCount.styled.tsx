import Colors from "@/styles/Colors";
import styled from "styled-components";

export const BaseBox = styled.div`
  font-size: 11px;
  line-height: 18px;
  padding: 0px 8px;
  background-color: #15395B;
  border: 1px solid #164C7E;
  border-radius: 2px;
  color: #3C9AE8;
`;

export const ActiveBox = styled(BaseBox)`
  background-color: ${Colors.geekblue7};
  border: 1px solid ${Colors.grey9};
  color: ${Colors.whitePure};
`;
