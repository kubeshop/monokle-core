import {Colors} from '@/styles/Colors';
import {getFileLocation} from '@monokle/validation';
import {Descriptions} from 'antd';
import {useMemo} from 'react';
import styled from 'styled-components';
import {ProblemInfoType} from './types';

const ProblemInfo: React.FC<ProblemInfoType> = props => {
  const {containerClassName = '', containerStyle = {}, problem, onLocationClick} = props;

  const errorLocation = useMemo(() => getFileLocation(problem), [problem]);

  return (
    <ProblemInfoContainer className={containerClassName} style={containerStyle}>
      <ProblemInfoContent title="Info" column={1} colon={false}>
        <Descriptions.Item label="Rule ID">{problem.ruleId}</Descriptions.Item>
        <Descriptions.Item label="Rule description">{problem.message.text}</Descriptions.Item>
        <Descriptions.Item label="Tool component">{problem.rule.toolComponent.name}</Descriptions.Item>
        {problem.level && (
          <Descriptions.Item label="Level">
            {problem.level.charAt(0).toUpperCase() + problem.level.slice(1)}
          </Descriptions.Item>
        )}
        <Descriptions.Item label="Location">
          <Location
            $clickable={Boolean(onLocationClick)}
            onClick={() => {
              if (!onLocationClick) return;
              onLocationClick(errorLocation);
            }}
          >
            {errorLocation.physicalLocation?.artifactLocation.uri}
          </Location>
        </Descriptions.Item>
      </ProblemInfoContent>
    </ProblemInfoContainer>
  );
};

export default ProblemInfo;

// Styled Components

const Location = styled.div<{$clickable: boolean}>`
  ${({$clickable}) => {
    if ($clickable) {
      return `
            cursor: pointer;
            color:${Colors.blue7};
            transition: color 0.2s ease-in;

            &:hover {
                color: ${Colors.blue6}
            }
        `;
    }
  }}
`;

const ProblemInfoContainer = styled.div`
  padding: 15px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  width: 100%;
  max-height: 250px;
  overflow-y: auto;
`;

const ProblemInfoContent = styled(Descriptions)`
  .ant-descriptions-header {
    margin-bottom: 12px;
  }

  .ant-descriptions-title {
    color: ${Colors.whitePure};
    font-size: 14px;
    font-weight: 600;
  }

  .ant-descriptions-item {
    padding-bottom: 4px !important;
  }

  .ant-descriptions-item-label {
    color: ${Colors.grey7};
    min-width: 115px;
  }

  .ant-descriptions-item-content {
    color: ${Colors.whitePure};
  }
`;
