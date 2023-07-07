import {Colors} from '@/styles/Colors';
import {getFileLocation} from '@monokle/validation';
import {Descriptions} from 'antd';
import {useMemo} from 'react';
import styled from 'styled-components';
import {ProblemInfoType} from './types';
import {renderToolComponentName} from './utils';
import {ArrowRightOutlined} from '@ant-design/icons';

const ProblemInfo: React.FC<ProblemInfoType> = props => {
  const {containerClassName = '', containerStyle = {}, problem, rule, onLocationClick, onHelpURLClick} = props;

  const errorLocation = useMemo(() => getFileLocation(problem), [problem]);

  const title = useMemo(
    () => (problem.message.text.endsWith('.') ? problem.message.text.slice(0, -1) : problem.message.text),
    [problem.message.text]
  );

  return (
    <ProblemInfoContainer className={containerClassName} style={containerStyle}>
      <TitleContainer>{title}</TitleContainer>

      <TopInfoContainer>
        {renderToolComponentName(problem.rule.toolComponent.name)} <span>|</span> {rule.name} <span>|</span> {rule.id}
      </TopInfoContainer>

      <ProblemInfoContent title={null} column={1} colon={false}>
        <Descriptions.Item label="Description">
          {rule.fullDescription?.text || rule.shortDescription.text}
        </Descriptions.Item>

        {/* {problem.level && (
          <Descriptions.Item label="Severity">
            {problem.level.charAt(0).toUpperCase() + problem.level.slice(1)}
          </Descriptions.Item>
        )} */}

        <Descriptions.Item label="Hint">
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

const TopInfoContainer = styled.div`
  display: flex;
  color: ${Colors.grey7};
  margin-bottom: 4px;

  & > span {
    margin: 0 8px;
    font-weight: 300;
  }
`;

const ProblemInfoContainer = styled.div`
  padding: 15px;
  border-radius: 4px;
  width: 100%;
  max-height: 330px;
  overflow-y: auto;
  font-family: 'Inter', sans-serif;
  background: rgba(255, 255, 255, 0.05);
`;

const ProblemInfoContent = styled(Descriptions)`
  .ant-descriptions-item {
    padding-bottom: 4px !important;
  }

  .ant-descriptions-item-label {
    color: ${Colors.grey7};
    min-width: 115px;
  }

  .ant-descriptions-item-content {
    color: ${Colors.grey9};
  }
`;

const TitleContainer = styled.div`
  font-weight: 700;
  color: ${Colors.grey9};
  margin-bottom: 24px;
`;

const MoreLink = styled.span`
  cursor: pointer;
  margin-left: 8px;
`;
