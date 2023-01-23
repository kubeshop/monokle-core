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
        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          {iconMap[toolComponentName]}
          {renderSeverityIcon(severity, false)}
        </div>
        <RuleId>{ruleDescription}</RuleId> <ResultsCount>{results.length}</ResultsCount>
      </Container>
    );
  }

  if (showByFilterValue === 'show-by-resource') {
    return (
      <>
        <ResourceName>{resourceName}</ResourceName>
        <ResourceFilePath>{filePath}</ResourceFilePath>
        <ResultsCount>{results.length}</ResultsCount>
      </>
    );
  }

  return (
    <>
      {resourceName ? <RuleId>{resourceName}</RuleId> : id} <ResultsCount>{results.length}</ResultsCount>
    </>
  );
};

const Container = styled.div`
  display: flex;
  gap: 10px;
`;

const ResourceName = styled.span`
  color: ${Colors.whitePure};
`;

const ResourceFilePath = styled.span`
  color: ${Colors.grey7};
  margin-left: 8px;
  font-size: 13px;
`;

const ResultsCount = styled.span`
  font-weight: 700;
  margin-left: 6px;
`;

const RuleId = styled.div`
  color: ${Colors.whitePure};
`;
