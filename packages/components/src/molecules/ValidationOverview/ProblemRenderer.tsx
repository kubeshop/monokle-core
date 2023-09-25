import {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import {Button, Tag, Tooltip} from 'antd';
import {Colors} from '@/styles/Colors';
import {ProblemNode, GroupByFilterOptionType, SuppressionBindings} from './types';
import {getFileLocation, RuleMetadata, ValidationResult} from '@monokle/validation';
import {isProblemSelected, renderSeverityIcon, uppercaseFirstLetter} from './utils';
import {TOOLTIP_DELAY} from '@/constants';
import {Icon, ProblemIcon, TextEllipsis} from '@/atoms';
import {iconMap} from './constants';
import {EyeInvisibleOutlined, EyeOutlined, FieldTimeOutlined, SettingOutlined} from '@ant-design/icons';

type IProps = {
  node: ProblemNode;
  rule: RuleMetadata;
  groupByFilterValue: GroupByFilterOptionType;
  selectedProblem?: ValidationResult;
  onClick: () => void;
  setSecurityFrameworkFilter: (value: string) => void;
  onConfigureRuleHandler: (problem: ValidationResult) => void;
  onAutofixHandler?: (problem: ValidationResult) => void;
  suppressionBindings?: SuppressionBindings;
};

const ProblemRenderer: React.FC<IProps> = props => {
  const {node, rule, selectedProblem, groupByFilterValue, onClick, setSecurityFrameworkFilter} = props;
  const {onConfigureRuleHandler, suppressionBindings, onAutofixHandler} = props;

  const isSelected = useMemo(
    () => (selectedProblem ? isProblemSelected(selectedProblem, node.problem) : false),
    [selectedProblem, node.problem, groupByFilterValue]
  );

  const absent = node.problem.baselineState === 'absent';
  const hasFix = node.problem.fixes && node.problem.fixes.length > 0;

  const isUnderReview = useMemo(() => {
    return Boolean(
      typeof suppressionBindings?.isUnderReview == 'function' && suppressionBindings.isUnderReview(node.problem)
    );
  }, [node.problem, suppressionBindings?.isUnderReview]);

  const [suppressed, toggleSuppressed] = useState(
    Boolean(typeof suppressionBindings?.isSuppressed == 'function' && suppressionBindings.isSuppressed(node.problem))
  );
  useEffect(() => {
    toggleSuppressed(
      Boolean(typeof suppressionBindings?.isSuppressed == 'function' && suppressionBindings.isSuppressed(node.problem))
    );
  }, [node.problem, suppressionBindings?.isSuppressed]);

  const showSuppressionCTA = typeof suppressionBindings?.onToggleSuppression == 'function';

  return (
    <Row
      $isSelected={isSelected}
      $isSuppressed={suppressed || absent}
      $isUnderReview={isUnderReview}
      $secondary={groupByFilterValue === 'group-by-rule'}
      onClick={onClick}
    >
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
                <Icon name="plugin-default" style={{fontSize: '13px'}} />
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
          <ProblemText $isSuppressed={suppressed || absent}>{node.problem.message.text}</ProblemText>
          {suppressed ? '(suppressed)' : ''}
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
          {onAutofixHandler && hasFix && !absent ? (
            <AutofixHint>
              <Icon style={{color: isSelected ? Colors.blackPure : Colors.grey8}} name="magic-wand" />
            </AutofixHint>
          ) : null}
        </>
      )}

      <ActionsContainer onClick={e => e.stopPropagation()}>
        {onAutofixHandler && hasFix && !absent ? (
          <Tooltip mouseEnterDelay={TOOLTIP_DELAY} title="Autofix">
            <Icon
              style={{color: isSelected ? Colors.blackPure : Colors.blue7}}
              name="magic-wand"
              onClick={() => onAutofixHandler(node.problem)}
            />
          </Tooltip>
        ) : null}

        {showSuppressionCTA ? (
          <Tooltip
            mouseEnterDelay={TOOLTIP_DELAY}
            title={
              isUnderReview
                ? suppressionBindings?.hasPermissions
                  ? 'Click to review'
                  : 'Pending review'
                : suppressed
                ? 'Unsuppress rule'
                : 'Suppress rule'
            }
          >
            {isUnderReview ? (
              <FieldTimeOutlined
                style={{color: isSelected ? Colors.blackPure : Colors.goldWarning}}
                onClick={() => {
                  suppressionBindings.onToggleSuppression!(node.problem);
                }}
              />
            ) : suppressed ? (
              suppressionBindings.hasPermissions ? (
                <EyeOutlined
                  style={{color: isSelected ? Colors.blackPure : Colors.blue7}}
                  onClick={() => {
                    suppressionBindings.onToggleSuppression!(node.problem);
                    // eager update
                    toggleSuppressed(false);
                  }}
                />
              ) : null
            ) : (
              <EyeInvisibleOutlined
                style={{color: isSelected ? Colors.blackPure : Colors.blue7}}
                onClick={() => {
                  suppressionBindings.onToggleSuppression!(node.problem);
                  // eager update
                  toggleSuppressed(true);
                }}
              />
            )}
          </Tooltip>
        ) : null}

        <Tooltip mouseEnterDelay={TOOLTIP_DELAY} title="Configure rule">
          <SettingOutlined
            style={{color: isSelected ? Colors.blackPure : Colors.blue7}}
            onClick={() => onConfigureRuleHandler(node.problem)}
          />
        </Tooltip>
      </ActionsContainer>
    </Row>
  );
};

export default ProblemRenderer;

// Styled components

const AutofixHint = styled.div`
  display: flex;
`;

const ActionsContainer = styled.div`
  display: none;
  margin-left: auto;
  align-items: center;
  gap: 16px;

  & .anticon {
    font-size: 16px;
  }
`;

const ProblemStartLine = styled.div<{$isSelected: boolean}>`
  color: ${({$isSelected}) => ($isSelected ? Colors.grey2 : Colors.grey8)};
  font-weight: 400;
  min-width: 26px;
  font-size: 13px;
`;

const ProblemText = styled.div<{$isSuppressed: boolean}>`
  text-decoration: ${({$isSuppressed}) => ($isSuppressed ? 'line-through' : 'none')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Row = styled.div<{$isSelected: boolean; $secondary: boolean; $isSuppressed: boolean; $isUnderReview?: boolean}>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 16px 8px 25px;
  font-weight: ${({$isSelected}) => ($isSelected ? '700' : '400')};
  color: ${({$isSelected, $isSuppressed, $secondary}) =>
    $isSuppressed ? Colors.grey6 : $isSelected ? Colors.grey2 : $secondary ? Colors.grey8 : Colors.whitePure};
  background-color: ${({$isSelected, $isUnderReview}) =>
    $isSelected ? Colors.blue9 : $isUnderReview ? 'rgba(248, 199, 141, 0.15)' : 'transparent'};
  transition: all 0.15s ease-in;
  flex-wrap: nowrap;

  & .anticon {
    color: ${({$isSelected}) => ($isSelected ? Colors.grey2 : Colors.grey8)};
  }

  &:hover {
    ${ActionsContainer} {
      display: flex;
    }

    ${AutofixHint} {
      display: none;
    }

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
