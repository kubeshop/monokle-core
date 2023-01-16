import { SearchInput } from "@/atoms";
import { FilterOutlined } from "@ant-design/icons";
import * as S from "./ValidationOverview.styled";

const ValidationOverview: React.FC = () => {
  return (
    <S.MainContainer>
      <S.ActionsContainer>
        <SearchInput />

        <S.FiltersButton icon={<FilterOutlined />} />
      </S.ActionsContainer>
    </S.MainContainer>
  );
};

export default ValidationOverview;
