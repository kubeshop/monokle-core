import { SearchInput } from "@/atoms";
import Colors from "@/styles/Colors";
import { FilterOutlined } from "@ant-design/icons";
import { Button } from "antd";
import styled from "styled-components";
import { ValidationOverviewType } from "./types";

export const ValidationOverview: React.FC<ValidationOverviewType> = (props) => {
  const { containerStyle = {}, height } = props;

  return (
    <MainContainer style={containerStyle} $height={height}>
      <ActionsContainer>
        <SearchInput />

        <FiltersButton icon={<FilterOutlined />} />
      </ActionsContainer>
    </MainContainer>
  );
};

// Styled components

const ActionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-gap: 16px;
  padding: 0 16px;
`;

const FiltersButton = styled(Button)`
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  color: ${Colors.blue7};
  border-radius: 4px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.07);
    color: ${Colors.blue7};
  }
`;

const MainContainer = styled.div<{ $height?: number }>`
  background-color: #191f21;

  height: ${({ $height }) => ($height ? `${$height}px` : "100%")};
`;
