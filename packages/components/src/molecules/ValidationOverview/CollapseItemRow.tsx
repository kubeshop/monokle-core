import {ProblemIcon} from '@/atoms';
import {TOOLTIP_DELAY} from '@/constants';
import {Colors} from '@/styles/Colors';
import {getFileLocation, RuleMetadata, ValidationResult} from '@monokle/validation';
import {Tooltip} from 'antd';
import {useMemo} from 'react';
import styled from 'styled-components';
import {iconMap} from './constants';
import {ShowByFilterOptionType} from './types';
import {isProblemSelected, renderSeverityIcon, uppercaseFirstLetter} from './utils';

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
          <Tooltip mouseEnterDelay={TOOLTIP_DELAY} title="File line">
            <ProblemStartLine $isSelected={isSelected}>
              {result.locations[0].physicalLocation?.region?.startLine}
            </ProblemStartLine>
          </Tooltip>
          <MessageText>{getFileLocation(result).physicalLocation?.artifactLocation.uri}</MessageText>
        </>
      ) : (
        <>
          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <Tooltip mouseEnterDelay={TOOLTIP_DELAY} title={uppercaseFirstLetter(result.rule.toolComponent.name)}>
              {iconMap[result.rule.toolComponent.name]}
            </Tooltip>

            {rule && (
              <Tooltip mouseEnterDelay={TOOLTIP_DELAY} title="Severity">
                {renderSeverityIcon(rule.properties?.['security-severity'] ?? 1, isSelected)}
              </Tooltip>
            )}
          </div>

          <Tooltip mouseEnterDelay={TOOLTIP_DELAY} title="File line">
            <ProblemStartLine $isSelected={isSelected}>
              {result.locations[0].physicalLocation?.region?.startLine}
            </ProblemStartLine>
          </Tooltip>

          <ProblemIcon level={result.level ?? 'error'} style={{fontSize: '8px', marginRight: '-8px'}} />
          <MessageText>{result.message.text}</MessageText>
        </>
      )}
    </Row>
  );
};

// Styled Components

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
