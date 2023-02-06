import {Colors} from '@/styles/Colors';
import {getFileLocation, RuleMetadata, ValidationResult} from '@monokle/validation';
import {useMemo} from 'react';
import styled from 'styled-components';
import {iconMap} from './constants';
import {ShowByFilterOptionType} from './types';
import {isProblemSelected, renderSeverityIcon} from './utils';

type IProps = {
  result: ValidationResult;
  rule: RuleMetadata;
  showByFilterValue: ShowByFilterOptionType;
  selectedProblem?: ValidationResult;
  onClick: () => void;
};

export const CollapseItemRow: React.FC<IProps> = props => {
  const {result, rule, showByFilterValue, selectedProblem, onClick} = props;

  const isSelected = useMemo(
    () => (selectedProblem ? isProblemSelected(selectedProblem, result, showByFilterValue) : false),
    [selectedProblem, result, showByFilterValue]
  );

  return (
    <Row $isSelected={isSelected} $secondary={showByFilterValue === 'show-by-rule'} onClick={onClick}>
      {showByFilterValue === 'show-by-rule' ? (
        <>
          <ProblemStartLine $isSelected={isSelected}>
            {result.locations[0].physicalLocation?.region?.startLine}
          </ProblemStartLine>
          <MessageText>{getFileLocation(result).physicalLocation?.artifactLocation.uri}</MessageText>
        </>
      ) : (
        <>
          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            {iconMap[result.rule.toolComponent.name]}
            {rule && renderSeverityIcon(rule.properties?.['security-severity'] ?? 1, isSelected)}
          </div>

          <ProblemStartLine $isSelected={isSelected}>
            {result.locations[0].physicalLocation?.region?.startLine}
          </ProblemStartLine>

          <ErrorWarningCircle $type={result.level ?? 'error'} />
          <MessageText>{result.message.text}</MessageText>
        </>
      )}
    </Row>
  );
};

// Styled Components

const ErrorWarningCircle = styled.div<{$type: 'error' | 'warning'}>`
  background-color: ${({$type}) => ($type === 'error' ? Colors.red7 : '#E8B339')};
  border-radius: 50%;
  width: 10px;
  min-width: 10px;
  height: 10px;
  min-height: 10px;
  margin-right: -8px;
`;

const MessageText = styled.div`
  // TODO: add ellipsis for text-overflow without breaking the resizing of panes
  /* text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden; */
`;

const ProblemStartLine = styled.div<{$isSelected: boolean}>`
  color: ${({$isSelected}) => ($isSelected ? Colors.grey1 : Colors.grey8)};
  font-weight: 400;
  min-width: 26px;
`;

const Row = styled.div<{$isSelected: boolean; $secondary: boolean}>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 16px 8px 25px;
  font-weight: ${({$isSelected}) => ($isSelected ? '700' : '400')};
  color: ${({$isSelected, $secondary}) => ($isSelected ? Colors.grey1 : $secondary ? Colors.grey8 : Colors.whitePure)};
  background-color: ${({$isSelected}) => ($isSelected ? Colors.blue9 : 'transparent')};
  transition: all 0.15s ease-in;

  & .anticon {
    color: ${({$isSelected}) => ($isSelected ? Colors.grey1 : Colors.grey8)};
  }

  &:hover {
    cursor: pointer;
    background-color: ${({$isSelected}) => ($isSelected ? Colors.blue8 : 'rgba(141, 207, 248, 0.15)')};
  }
`;
