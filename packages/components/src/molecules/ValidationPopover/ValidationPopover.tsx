import {Popover, Space} from 'antd';

import styled from 'styled-components';

import {ProblemIcon} from '@/atoms';
import {ValidationPopoverProps} from './types';
import {getResourceLocation} from '@monokle/validation';
import {Colors} from '@/styles/Colors';

const ValidationPopover: React.FC<ValidationPopoverProps> = props => {
  const {level, results, disabled, popoverIconStyle = {}, popoverRenderItem, style = {}, onMessageClickHandler} = props;

  if (level === 'none') {
    return popoverRenderItem ?? <ProblemIcon level={level} disabled={disabled} />;
  }

  return (
    <Popover
      mouseEnterDelay={0.5}
      placement="bottom"
      title="Validation Problems"
      style={{zIndex: 50, ...style}}
      content={
        <Container direction="vertical">
          {results.map(result => {
            const line = getResourceLocation(result).physicalLocation?.region?.startLine;
            const linePostfix = line === undefined ? '' : `-${line}`;

            return (
              <Space key={`${result.message.text}${linePostfix}`}>
                <span
                  style={{
                    color: result.level === 'error' ? Colors.redError : Colors.yellowWarning,
                  }}
                >
                  {result.ruleId}
                </span>

                {line && <Line>L{line}</Line>}

                <Message
                  $onClickHandler={!!onMessageClickHandler}
                  onClick={() => {
                    if (!onMessageClickHandler) return;
                    onMessageClickHandler(result);
                  }}
                >
                  {result.message.text}
                </Message>
              </Space>
            );
          })}
        </Container>
      }
    >
      {popoverRenderItem ?? (
        <span style={popoverIconStyle}>
          <ProblemIcon level={level} disabled={disabled} />
        </span>
      )}
    </Popover>
  );
};

export default ValidationPopover;

// Styled Components

const Container = styled(Space)`
  max-height: 160px;
  overflow-y: auto;
  padding-right: 8px;
`;

const Line = styled.span`
  color: ${Colors.whitePure};
`;

const Message = styled.span<{$onClickHandler: boolean}>`
  color: ${Colors.grey7};

  ${({$onClickHandler}) => {
    if ($onClickHandler) {
      return `
            &:hover {
                text-decoration: underline;
                cursor: pointer;
            }
        `;
    }
  }}
`;
