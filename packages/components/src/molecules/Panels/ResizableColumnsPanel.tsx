import {useCallback} from 'react';
import {ReflexContainer, ReflexElement, ReflexSplitter, HandlerProps} from 'react-reflex';
import styled from 'styled-components';

import {Colors} from '@/styles/Colors';

import {OnStopResize, ResizableColumnsPanelType} from './types';
import {PaneCloseIcon} from '@/atoms';
import {LAYOUT} from '@/constants';

const ResizableColumnsPanel: React.FC<ResizableColumnsPanelType> = props => {
  const {center, layout, left, right, height = '100%', width = '100%', minPaneWidth = 350} = props;
  const {leftClosable = false, onCloseLeftPane = () => {}, onStopResize = () => {}, paneCloseIconStyle = {}} = props;

  const onStopResizeLeft = useCallback(makeOnStopResize('left', onStopResize), [onStopResize]);
  const onStopResizeCenter = useCallback(makeOnStopResize('center', onStopResize), [onStopResize]);
  const onStopResizeRight = useCallback(makeOnStopResize('right', onStopResize), [onStopResize]);

  return (
    <ReflexContainer orientation="vertical" windowResizeAware style={{height, width}}>
      <StyledLeftReflexElement
        style={{
          display: !left ? 'none' : undefined,
        }}
        resizeWidth={Boolean(left)}
        $leftClosable={leftClosable}
        minSize={minPaneWidth}
        onStopResize={onStopResizeLeft}
        flex={layout?.left}
      >
        <StyledLeftPane $leftClosable={leftClosable}>
          {left}
          {leftClosable && (
            <PaneCloseIcon
              onClick={onCloseLeftPane}
              containerStyle={{
                position: 'absolute',
                top: 18,
                right: -8,
                zIndex: LAYOUT.zIndex.low,
                ...paneCloseIconStyle,
              }}
            />
          )}
        </StyledLeftPane>
      </StyledLeftReflexElement>
      <ReflexSplitter
        propagate={Boolean(left)}
        style={{display: !left ? 'none' : undefined, backgroundColor: Colors.grey10}}
      />

      <ReflexElement
        style={{
          display: !center ? 'none' : undefined,
        }}
        resizeWidth={Boolean(center)}
        flex={layout?.center}
        minSize={!center ? 0.001 : minPaneWidth}
        maxSize={!center ? 0.001 : minPaneWidth + 200}
        onStopResize={onStopResizeCenter}
      >
        <StyledPane>{center}</StyledPane>
      </ReflexElement>

      <ReflexSplitter propagate={Boolean(left)} style={{visibility: !center ? 'collapse' : undefined}} />

      <DynamicReflexElement
        $flexGrow={!left || !center ? 1 : undefined}
        minSize={minPaneWidth}
        onStopResize={onStopResizeRight}
      >
        <StyledPane>{right}</StyledPane>
      </DynamicReflexElement>
    </ReflexContainer>
  );
};

export default ResizableColumnsPanel;

// Styled Components

const StyledPane = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

const StyledLeftPane = styled(StyledPane)<{$leftClosable: boolean}>`
  background-color: ${Colors.grey10};

  ${({$leftClosable}) => {
    if ($leftClosable) {
      return `position: static;`;
    }
  }}
`;

const DynamicReflexElement = styled(ReflexElement)<{$flexGrow?: number}>`
  ${({$flexGrow}) => {
    return `
      flex-grow: ${$flexGrow} !important;
    `;
  }};
`;

const StyledLeftReflexElement = styled(ReflexElement)<{$leftClosable: boolean}>`
  ${({$leftClosable}) => {
    if ($leftClosable) {
      return `overflow: visible !important;`;
    }
  }}
`;

// Utils

const makeOnStopResize = (position: 'left' | 'center' | 'right', onStopResize: OnStopResize) => {
  return (args: HandlerProps) => {
    const flex = args.component.props.flex;

    if (flex) {
      onStopResize(position, flex);
    }
  };
};
