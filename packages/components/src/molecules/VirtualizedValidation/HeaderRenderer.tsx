import styled from 'styled-components';
import {Tooltip} from 'antd';
import {HeaderNode, ShowByFilterOptionType} from './types';
import {TOOLTIP_DELAY} from '@/constants';
import {Colors} from '@/styles/Colors';
import {getRuleInfo, renderSeverityIcon} from './utils';
import {iconMap} from './constants';

type IProps = {
  node: HeaderNode;
  showByFilterValue: ShowByFilterOptionType;
  toggleCollapse: (node: HeaderNode) => void;
};

const HeaderRenderer: React.FC<IProps> = props => {
  const {node, showByFilterValue, toggleCollapse} = props;

  if (showByFilterValue === 'show-by-rule') {
    const {ruleDescription, severity, toolComponentName} = getRuleInfo(node.label);

    return (
      <Container>
        <Content>
          <div
            style={{
              display: 'flex',
              gap: '8px',
              alignSelf: 'center',
            }}
          >
            {iconMap[toolComponentName]}
            {renderSeverityIcon(severity, false)}
          </div>
          <Tooltip title={ruleDescription} mouseEnterDelay={TOOLTIP_DELAY} placement="right">
            <RuleId>{ruleDescription}</RuleId>
          </Tooltip>
          <ResultsCount>{node.count}</ResultsCount>
        </Content>
      </Container>
    );
  }

  if (showByFilterValue === 'show-by-resource') {
    return (
      <Container>
        <Content>
          <Tooltip title={node.resourceName} mouseEnterDelay={TOOLTIP_DELAY} placement="right">
            <ResourceName>{node.resourceName}</ResourceName>
          </Tooltip>
          <Tooltip title={node.filePath} mouseEnterDelay={TOOLTIP_DELAY} placement="right">
            <ResourceFilePath>{node.filePath}</ResourceFilePath>
          </Tooltip>
          <ResultsCount>{node.count}</ResultsCount>
        </Content>
      </Container>
    );
  }

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

const ResourceFilePath = styled.span`
  color: ${Colors.grey7};
  margin-left: 8px;
  font-size: 13px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  height: max-content;
`;

const ResourceName = styled.span`
  color: ${Colors.whitePure};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  height: max-content;
`;

const ResultsCount = styled.span`
  font-weight: 700;
  margin-left: 6px;
  min-width: 24px;
  width: max-content;
  color: ${Colors.grey8};
`;

const RuleId = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  height: max-content;
  color: ${Colors.whitePure};
`;
