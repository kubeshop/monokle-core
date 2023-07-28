import {useMemo} from 'react';
import styled from 'styled-components';
import {Tag, Tooltip} from 'antd';
import {Colors} from '@/styles/Colors';
import {ProblemNode, GroupByFilterOptionType} from './types';
import {getFileLocation, isSuppressed, RuleMetadata, ValidationResult} from '@monokle/validation';
import {isProblemSelected, renderSeverityIcon, uppercaseFirstLetter} from './utils';
import {TOOLTIP_DELAY} from '@/constants';
import {Icon, ProblemIcon, TextEllipsis} from '@/atoms';
import {iconMap} from './constants';

type IProps = {
  node: ProblemNode;
  rule: RuleMetadata;
  groupByFilterValue: GroupByFilterOptionType;
  selectedProblem?: ValidationResult;
  onClick: () => void;
  setSecurityFrameworkFilter: (value: string) => void;
};

const ProblemRenderer: React.FC<IProps> = props => {
  const {node, rule, selectedProblem, groupByFilterValue, onClick, setSecurityFrameworkFilter} = props;

  const isSelected = useMemo(
    () => (selectedProblem ? isProblemSelected(selectedProblem, node.problem, groupByFilterValue) : false),
    [selectedProblem, node.problem, groupByFilterValue]
  );
  const suppressed = isSuppressed(node.problem);

  return (
    <Row $isSelected={isSelected} $secondary={groupByFilterValue === 'group-by-rule'} onClick={onClick}>
      {groupByFilterValue === 'group-by-rule' ? (
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
            title={groupByFilterValue === 'group-by-file' ? 'File content line' : 'Resource content line'}
          >
            <ProblemStartLine $isSelected={isSelected}>
              {
                node.problem.locations[groupByFilterValue === 'group-by-file' ? 0 : 1].physicalLocation?.region
                  ?.startLine
              }
            </ProblemStartLine>
          </Tooltip>

          <ProblemIcon level={node.problem.level ?? 'error'} style={{fontSize: '8px', marginRight: '-8px'}} />

          <ProblemText $isSuppressed={suppressed}>{node.problem.message.text}</ProblemText>

          {node.problem.taxa?.length ? (
            <TagsContainer>
              {node.problem.taxa.map(framework => (
                <SecurityFrameworkTag
                  key={framework.toolComponent.name}
                  onClick={e => {
                    e.stopPropagation();
                    setSecurityFrameworkFilter(framework.toolComponent.name);
                  }}
                >
                  {framework.toolComponent.name}
                </SecurityFrameworkTag>
              ))}
            </TagsContainer>
          ) : null}
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

const ProblemText = styled.div<{$isSuppressed: boolean}>`
  color: ${({$isSuppressed}) => ($isSuppressed ? Colors.grey6 : Colors.grey8)};
  text-decoration: ${({$isSuppressed}) => ($isSuppressed ? 'line-through' : 'none')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  flex-wrap: nowrap;

  & .anticon {
    color: ${({$isSelected}) => ($isSelected ? Colors.grey1 : Colors.grey8)};
  }

  &:hover {
    cursor: pointer;
    background-color: ${({$isSelected}) => ($isSelected ? Colors.blue8 : 'rgba(141, 207, 248, 0.15)')};
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

export const SecurityFrameworkTag = styled(Tag)`
  color: ${Colors.grey8};
  background-color: ${Colors.grey4};
  border: none;
  font-size: 12px;
  padding: 0px 8px;

  &:hover {
    color: ${Colors.grey9};
  }
`;
