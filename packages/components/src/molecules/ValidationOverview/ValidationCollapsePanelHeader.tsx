import {TextEllipsis} from '@/atoms';
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
          <RuleId>{ruleDescription}</RuleId>
          <ResultsCount>{results.length}</ResultsCount>
        </Content>
      </Container>
    );
  }

  if (showByFilterValue === 'show-by-resource') {
    return (
      <Container>
        <Content>
          <ResourceName>{resourceName}</ResourceName>
          <ResourceFilePath>{filePath}</ResourceFilePath>
          <ResultsCount>{results.length}</ResultsCount>
        </Content>
      </Container>
    );
  }

  return (
    <>
      <TextEllipsis text={id} />
      <ResultsCount>{results.length}</ResultsCount>
    </>
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
`;

const RuleId = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  height: max-content;
  color: ${Colors.whitePure};
`;

const Container = styled.div`
  position: absolute;
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
