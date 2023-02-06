import {Colors} from '@/styles/Colors';
import {ClearOutlined, FilterOutlined} from '@ant-design/icons';
import styled from 'styled-components';

type Props = {
  onClear?: () => void;
  filterActions?: JSX.Element;
};

export function FilterHeader({onClear, filterActions}: Props) {
  return (
    <Box>
      <Left>
        <FilterOutlined />
        <Title>filter</Title>
      </Left>

      <Right>
        {filterActions}
        {onClear && (
          <IconBox onClick={onClear}>
            <ClearIcon />
          </IconBox>
        )}
      </Right>
    </Box>
  );
}

const Box = styled.div`
  height: 45px;
  display: flex;
  padding: 0 12px;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 0px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  color: ${Colors.cyan8};
`;

const IconBox = styled.div`
  padding: 6px;
  cursor: pointer;
`;

const ClearIcon = styled(ClearOutlined)`
  color: ${Colors.cyan8};
`;
