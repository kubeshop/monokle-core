import styled from 'styled-components';
import {Tooltip} from 'antd';
import {HeaderNode, ShowByFilterOptionType} from './types';
import {TOOLTIP_DELAY} from '@/constants';
import {Colors} from '@/styles/Colors';

type IProps = {
  node: HeaderNode;
  showByFilterValue: ShowByFilterOptionType;
  toggleCollapse: (node: HeaderNode) => void;
};

const HeaderRenderer: React.FC<IProps> = props => {
  const {node, showByFilterValue, toggleCollapse} = props;

  return (
    <Container onClick={() => toggleCollapse(node)}>
      <Content>
        <Tooltip title={node.label} mouseEnterDelay={TOOLTIP_DELAY} placement="right">
          <ResourceFile>{node.label}</ResourceFile>
        </Tooltip>
        <ResultsCount>{node.count}</ResultsCount>
      </Content>
    </Container>
  );
};

export default HeaderRenderer;

// Styled Components

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  cursor: pointer;
`;

const Content = styled.div`
  position: absolute;
  display: flex;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  gap: 8px;
  height: max-content;
`;

const ResourceFile = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  height: max-content;
  color: ${Colors.grey8};
`;

const ResultsCount = styled.span`
  font-weight: 700;
  margin-left: 6px;
  min-width: 24px;
  width: max-content;
  color: ${Colors.grey8};
`;
