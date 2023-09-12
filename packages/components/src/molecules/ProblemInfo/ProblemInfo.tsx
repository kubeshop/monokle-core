import {Colors} from '@/styles/Colors';
import {getFileLocation} from '@monokle/validation';
import {Button, Descriptions, Tooltip} from 'antd';
import {useCallback, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import {ProblemInfoType} from './types';
import {renderToolComponentName} from './utils';
import {
  ArrowRightOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  FieldTimeOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import {TOOLTIP_DELAY} from '@/constants';
import {renderSeverityIcon} from '../ValidationOverview/utils';
import {Icon, ProblemIcon} from '@/atoms';
import {iconMap} from '../ValidationOverview/constants';
import {SecurityFrameworkTag} from '../ValidationOverview/ProblemRenderer';

const ProblemInfo: React.FC<ProblemInfoType> = props => {
  const {containerClassName = '', containerStyle = {}, problem, rule, suppressionBindings, onProblemAutofix} = props;
  const {onConfigureRule, onHelpURLClick, onLocationClick} = props;

  const errorLocation = useMemo(() => getFileLocation(problem), [problem]);
  const title = useMemo(
    () => (problem.message.text.endsWith('.') ? problem.message.text.slice(0, -1) : problem.message.text),
    [problem.message.text]
  );
  const hasFix = problem.fixes && problem.fixes.length > 0;

  const isUnderReview = useMemo(() => {
    return Boolean(
      typeof suppressionBindings?.isUnderReview == 'function' && suppressionBindings.isUnderReview(problem)
    );
  }, [problem, suppressionBindings?.isUnderReview]);

  const [suppressed, toggleSuppressed] = useState(
    Boolean(typeof suppressionBindings?.isSuppressed == 'function' && suppressionBindings.isSuppressed(problem))
  );

  useEffect(() => {
    toggleSuppressed(
      Boolean(typeof suppressionBindings?.isSuppressed == 'function' && suppressionBindings.isSuppressed(problem))
    );
  }, [problem, suppressionBindings?.isSuppressed]);

  const showSuppressionCTA = typeof suppressionBindings?.onToggleSuppression == 'function';

  const handleProblemAutofix = useCallback(() => {
    if (!hasFix) {
      return () => {
        return;
      };
    }
    return () => onProblemAutofix?.(problem);
  }, [onProblemAutofix, problem, hasFix]);

  return (
    <ProblemInfoContainer className={containerClassName} style={containerStyle}>
      <TitleContainer>
        {suppressed ? <s style={{color: Colors.grey7}}>{title}</s> : title}
        <IconsContainer>
          <Tooltip mouseEnterDelay={TOOLTIP_DELAY} title="Problem type">
            <div>
              <ProblemIcon level={problem.level ?? 'error'} style={{fontSize: '8px'}} />
            </div>
          </Tooltip>

          <Tooltip mouseEnterDelay={TOOLTIP_DELAY} title={renderToolComponentName(problem.rule.toolComponent.name)}>
            {iconMap[problem.rule.toolComponent.name] ?? (
              <Icon name="plugin-default" style={{fontSize: '13px', color: Colors.grey8}} />
            )}
          </Tooltip>

          <Tooltip mouseEnterDelay={TOOLTIP_DELAY} title="Severity">
            {renderSeverityIcon(rule.properties?.['security-severity'] ?? 1, false)}
          </Tooltip>

          {problem.taxa?.length
            ? problem.taxa.map(framework => (
                <SecurityFrameworkTag key={framework.toolComponent.name} style={{marginRight: '0px', marginTop: '2px'}}>
                  {framework.toolComponent.name}
                </SecurityFrameworkTag>
              ))
            : null}
        </IconsContainer>
        <Spacer />
        <Actions>
          {onProblemAutofix ? (
            <Tooltip mouseEnterDelay={TOOLTIP_DELAY} title={hasFix ? 'Autofix' : 'No fix available'}>
              <Button
                type="link"
                onClick={handleProblemAutofix}
                icon={<Icon style={{color: hasFix ? Colors.blue7 : Colors.grey7}} name="magic-wand" />}
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
                <Button
                  type="link"
                  onClick={() => {
                    suppressionBindings.onToggleSuppression!(problem);
                  }}
                  icon={<FieldTimeOutlined style={{color: Colors.goldWarning}} />}
                ></Button>
              ) : suppressed ? (
                suppressionBindings.hasPermissions ? (
                  <Button
                    type="link"
                    onClick={() => {
                      suppressionBindings.onToggleSuppression!(problem);
                      // eager update
                      toggleSuppressed(false);
                    }}
                    icon={<EyeOutlined />}
                  />
                ) : null
              ) : (
                <Button
                  type="link"
                  onClick={() => {
                    suppressionBindings.onToggleSuppression!(problem);
                    // eager update
                    toggleSuppressed(true);
                  }}
                  icon={<EyeInvisibleOutlined />}
                />
              )}
            </Tooltip>
          ) : null}
          <Tooltip
            mouseEnterDelay={TOOLTIP_DELAY}
            title="Enable / disable rule, change priority, access all the rules in this plugin."
          >
            <Button type="link" icon={<SettingOutlined />} onClick={onConfigureRule}></Button>
          </Tooltip>
        </Actions>
      </TitleContainer>

      <TopInfoContainer>
        {renderToolComponentName(problem.rule.toolComponent.name)} <span>|</span> {rule.name} <span>|</span> {rule.id}
      </TopInfoContainer>

      <ProblemInfoContent $isSuppressed={suppressed} title={null} column={1} colon={false}>
        <Descriptions.Item label="Description">
          {rule.fullDescription?.text || rule.shortDescription.text}
        </Descriptions.Item>

        <Descriptions.Item label="Remediation">
          {rule.help.text}{' '}
          {rule.helpUri && (
            <MoreLink
              onClick={() => {
                onHelpURLClick(rule.helpUri ?? '');
              }}
            >
              More <ArrowRightOutlined />
            </MoreLink>
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Location">
          {errorLocation.physicalLocation?.artifactLocation.uri}

          {onLocationClick && (
            <MoreLink onClick={() => onLocationClick(errorLocation)}>
              <ArrowRightOutlined />
            </MoreLink>
          )}
        </Descriptions.Item>
      </ProblemInfoContent>
    </ProblemInfoContainer>
  );
};

export default ProblemInfo;

// Styled Components

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MoreLink = styled.span`
  cursor: pointer;
  margin-left: 8px;
`;

const ProblemInfoContainer = styled.div`
  padding: 15px;
  border-radius: 4px;
  width: 100%;
  max-height: 330px;
  overflow-y: auto;
  font-family: 'Inter', sans-serif;
  background: transparent;
`;

const ProblemInfoContent = styled(Descriptions)<{$isSuppressed?: boolean}>`
  .ant-descriptions-item {
    padding-bottom: 8px !important;
  }

  .ant-descriptions-item-label {
    color: ${Colors.grey7};
    min-width: 115px;
  }

  .ant-descriptions-item-content {
    color: ${({$isSuppressed}) => ($isSuppressed ? Colors.grey7 : Colors.grey9)};
  }
`;

const TitleContainer = styled.div`
  font-weight: 700;
  color: ${Colors.grey9};
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const TopInfoContainer = styled.div`
  display: flex;
  color: ${Colors.grey7};
  margin-bottom: 8px;

  & > span {
    margin: 0 8px;
    font-weight: 300;
  }
`;

const Spacer = styled.span`
  flex: auto;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
