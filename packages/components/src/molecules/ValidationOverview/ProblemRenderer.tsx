import {useMemo} from 'react';
import styled from 'styled-components';
import {Tooltip} from 'antd';
import {Colors} from '@/styles/Colors';
import {ProblemNode, ShowByFilterOptionType} from './types';
import {getFileLocation, RuleMetadata, ValidationResult} from '@monokle/validation';
import {isProblemSelected, renderSeverityIcon, uppercaseFirstLetter} from './utils';
import {TOOLTIP_DELAY} from '@/constants';
import {Icon, ProblemIcon, TextEllipsis} from '@/atoms';
import {iconMap} from './constants';

type IProps = {
  node: ProblemNode;
  rule: RuleMetadata;
  showByFilterValue: ShowByFilterOptionType;
  selectedProblem?: ValidationResult;
  onClick: () => void;
};

const ProblemRenderer: React.FC<IProps> = props => {
  const {node, rule, selectedProblem, showByFilterValue, onClick} = props;

  const isSelected = useMemo(
    () => (selectedProblem ? isProblemSelected(selectedProblem, node.problem, showByFilterValue) : false),
    [selectedProblem, node.problem, showByFilterValue]
  );

  return (
    <Row $isSelected={isSelected} $secondary={showByFilterValue === 'show-by-rule'} onClick={onClick}>
      {showByFilterValue === 'show-by-rule' ? (
        <>
          <Tooltip mouseEnterDelay={TOOLTIP_DELAY} title="File line">
            <ProblemStartLine $isSelected={isSelected}>
              {node.problem.locations[0].physicalLocation?.region?.startLine}
            </ProblemStartLine>
          </Tooltip>
          <TextEllipsis
            style={{fontSize: '13px'}}
            text={getFileLocation(node.problem).physicalLocation?.artifactLocation.uri ?? ''}
          />
        </>
      ) : (
        <>
          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <Tooltip mouseEnterDelay={TOOLTIP_DELAY} title={uppercaseFirstLetter(node.problem.rule.toolComponent.name)}>
              {iconMap[node.problem.rule.toolComponent.name] ?? (
                <Icon name="plugin-default" style={{fontSize: '13px', color: Colors.grey8}} />
              )}
            </Tooltip>

            {rule && (
              <Tooltip mouseEnterDelay={TOOLTIP_DELAY} title="Severity">
                {renderSeverityIcon(rule.properties?.['security-severity'] ?? 1, isSelected)}
              </Tooltip>
            )}
          </div>

          <Tooltip
            mouseEnterDelay={TOOLTIP_DELAY}
            title={showByFilterValue === 'show-by-file' ? 'File content line' : 'Resource content line'}
          >
            <ProblemStartLine $isSelected={isSelected}>
              {node.problem.locations[showByFilterValue === 'show-by-file' ? 0 : 1].physicalLocation?.region?.startLine}
            </ProblemStartLine>
          </Tooltip>

          <ProblemIcon level={node.problem.level ?? 'error'} style={{fontSize: '8px', marginRight: '-8px'}} />
          <TextEllipsis style={{fontSize: '13px'}} text={node.problem.message.text} />
        </>
      )}
    </Row>
  );
};

export default ProblemRenderer;

// Styled components

const ProblemStartLine = styled.div<{$isSelected: boolean}>`
  color: ${({$isSelected}) => ($isSelected ? Colors.grey1 : Colors.grey8)};
  font-weight: 400;
  min-width: 26px;
  font-size: 13px;
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
