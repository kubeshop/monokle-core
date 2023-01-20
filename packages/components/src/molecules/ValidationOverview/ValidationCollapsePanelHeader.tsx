import {Colors} from '@/styles/Colors';
import {ValidationResult} from '@monokle/validation';
import styled from 'styled-components';
import {iconMap} from './constants';
import {ShowByFilterOptionType} from './types';
import {getRuleInfo, renderSeverityIcon} from './utils';

type IProps = {
  id: string;
  results: ValidationResult[];
  showByFilterValue: ShowByFilterOptionType;
};

export const ValidationCollapsePanelHeader: React.FC<IProps> = props => {
  const {id, results, showByFilterValue} = props;

  if (showByFilterValue === 'show-by-rule') {
    const {ruleDescription, severity, toolComponentName} = getRuleInfo(id);

    return (
      <Container>
        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          {iconMap[toolComponentName]}
          {renderSeverityIcon(severity, false)}
        </div>
        <RuleId>{ruleDescription}</RuleId>{' '}
        <ResultsCount>{results.length}</ResultsCount>
      </Container>
    );
  }

  return (
    <>
      {id} <ResultsCount>{results.length}</ResultsCount>
    </>
  );
};

const Container = styled.div`
  display: flex;
  gap: 10px;
`;

const ResultsCount = styled.span`
  font-weight: 700;
  margin-left: 6px;
`;

const RuleId = styled.div`
  color: ${Colors.whitePure};
`;
