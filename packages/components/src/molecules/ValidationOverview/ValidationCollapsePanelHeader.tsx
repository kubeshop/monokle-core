import {Tooltip} from 'antd';
import {TOOLTIP_DELAY} from '@/constants';

import {Colors} from '@/styles/Colors';
import {ValidationResult} from '@monokle/validation';
import {useMemo} from 'react';
import styled from 'styled-components';
import {iconMap} from './constants';
import {ShowByFilterOptionType} from './types';
import {getResourceName, getRuleInfo, renderSeverityIcon} from './utils';

type IProps = {
  id: string;
  results: ValidationResult[];
  showByFilterValue: ShowByFilterOptionType;
};

export const ValidationCollapsePanelHeader: React.FC<IProps> = props => {
  const {id, results, showByFilterValue} = props;

  const {resourceName, filePath} = useMemo(
    () => ({resourceName: getResourceName(results[0]) || '', filePath: id.split('@').pop() || ''}),
    []
  );

  if (showByFilterValue === 'show-by-rule') {
    const {ruleDescription, severity, toolComponentName} = getRuleInfo(id);
    console.log('Id:', id);

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
          <ResultsCount>{results.length}</ResultsCount>
        </Content>
      </Container>
    );
  }

  if (showByFilterValue === 'show-by-resource') {
    return (
      <Container>
        <Content>
          <Tooltip title={resourceName} mouseEnterDelay={TOOLTIP_DELAY} placement="right">
            <ResourceName>{resourceName}</ResourceName>
          </Tooltip>
          <Tooltip title={filePath} mouseEnterDelay={TOOLTIP_DELAY} placement="right">
            <ResourceFilePath>{filePath}</ResourceFilePath>
          </Tooltip>
          <ResultsCount>{results.length}</ResultsCount>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <Tooltip title={id} mouseEnterDelay={TOOLTIP_DELAY} placement="right">
          <ResourceFile>{id}</ResourceFile>
        </Tooltip>
        <ResultsCount>{results.length}</ResultsCount>
      </Content>
    </Container>
  );
};

const ResourceName = styled.span`
  color: ${Colors.whitePure};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  height: max-content;
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

const ResultsCount = styled.span`
  font-weight: 700;
  margin-left: 6px;
  min-width: 24px;
  width: max-content;
`;

const RuleId = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  height: max-content;
  color: ${Colors.whitePure};
`;

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
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
`;
