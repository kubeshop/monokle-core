import Colors from "@/styles/Colors";
import styled from "styled-components";

import { DoubleLeftOutlined as RawDoubleLeftOutlined } from "@ant-design/icons";

export const DoubleLeftOutlined = styled(RawDoubleLeftOutlined)`
  font-size: 12px;
  color: ${Colors.grey2};
`;

export const PaneCloseIconContainer = styled.div`
  background-color: ${Colors.whitePure};
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
