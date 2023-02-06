import {Colors} from '@/styles/Colors';
import styled from 'styled-components';
import {TitleBarCountType} from './types';

const TitleBarCount: React.FC<TitleBarCountType> = ({count, isActive}) => {
  const Box = isActive ? ActiveBox : BaseBox;

  return <Box>{count}</Box>;
};

export default TitleBarCount;

// Styled Components

const BaseBox = styled.div`
  font-size: 11px;
  line-height: 18px;
  padding: 0px 8px;
  background-color: ${Colors.blue3};
  border: 1px solid ${Colors.blue4};
  border-radius: 2px;
  color: ${Colors.blue7b};
`;

const ActiveBox = styled(BaseBox)`
  background-color: ${Colors.geekblue7};
  border: 1px solid ${Colors.grey9};
  color: ${Colors.whitePure};
`;
