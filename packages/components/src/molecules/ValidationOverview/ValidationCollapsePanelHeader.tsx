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
      <>
        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          {iconMap[toolComponentName]}
          {renderSeverityIcon(severity, false)}
        </div>
        <RuleId>{ruleDescription}</RuleId> <ResultsCount>{results.length}</ResultsCount>
      </>
    );
  }

  if (showByFilterValue === 'show-by-resource') {
    return (
      <>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 2fr'}}>
          <ResourceName>{resourceName}</ResourceName>
          <ResourceFilePath>{filePath}</ResourceFilePath>
        </div>
        <ResultsCount>{results.length}</ResultsCount>
      </>
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
`;

const ResourceFilePath = styled.span`
  color: ${Colors.grey7};
  margin-left: 8px;
  font-size: 13px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const ResultsCount = styled.span`
  font-weight: 700;
  margin-left: 6px;
  flex-shrink: 0;
`;

const RuleId = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: ${Colors.whitePure};
`;
