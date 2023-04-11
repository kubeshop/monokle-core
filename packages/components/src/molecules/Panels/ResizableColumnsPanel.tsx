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
          flexGrow: !left ? 0 : undefined,
          flexShrink: 1,
          flexBasis: !left ? 0 : undefined,
        }}
        $leftClosable={leftClosable}
        minSize={minPaneWidth}
        onStopResize={onStopResizeLeft}
      >
        <StyledLeftPane $leftClosable={leftClosable}>
          {left}
          {leftClosable && (
            <PaneCloseIcon
              onClick={onCloseLeftPane}
              containerStyle={{
                position: 'absolute',
                top: 20,
                right: -10,
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

      <DynamicReflexElement
        style={{
          display: !center ? 'none' : undefined,
        }}
        minSize={minPaneWidth}
        maxSize={minPaneWidth + 200}
        onStopResize={onStopResizeCenter}
        flexGrow={0.5}
      >
        <StyledPane>{center}</StyledPane>
      </DynamicReflexElement>

      <ReflexSplitter propagate={Boolean(left)} style={{display: !center ? 'none' : undefined}} />
      <DynamicReflexElement flexGrow={0.5} minSize={minPaneWidth} onStopResize={onStopResizeRight}>
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

const DynamicReflexElement = styled(ReflexElement)<{flexGrow?: number}>`
  ${({flexGrow}) => {
    if (flexGrow) {
      return `
      flex-grow: ${flexGrow} !important;
      flex-shrink: 0 !important;
      flex-basis: 0% !important;
      `;
    }
  }}
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
