import {PaneCloseIcon} from '@/atoms';
import {ResizableColumnsPanelType} from './types';

import {Allotment, AllotmentHandle, LayoutPriority} from 'allotment';

import {LAYOUT} from '@/constants';
import styled from 'styled-components';
import {Colors} from '@/styles/Colors';
import {useEffect, useRef} from 'react';

const ResizableColumnsPanel: React.FC<ResizableColumnsPanelType> = props => {
  const {middle, left, right, minPaneWidth = 350, paneCloseIconStyle = {}, defaultSizes} = props;
  const {isLeftActive = true, isMiddleActive = true, leftClosable = false, middleClosable = false} = props;
  const {onDragEnd = () => {}, onCloseLeftPane = () => {}, onCloseMiddlePane = () => {}} = props;
  const {middlePaneTooltipTitle, leftPaneTooltipTitle} = props;

  const ref = useRef<AllotmentHandle>(null);

  useEffect(() => {
    if (!ref.current || !defaultSizes) {
      return;
    }

    ref.current.resize(defaultSizes);
  }, [defaultSizes]);

  return (
    <Container $leftClosable={leftClosable} $middleClosable={middleClosable} $leftActive={isLeftActive}>
      <Allotment
        ref={ref}
        onDragEnd={onDragEnd}
        onReset={() => {}}
        defaultSizes={defaultSizes}
        proportionalLayout={false}
      >
        <Allotment.Pane visible={Boolean(left)} minSize={minPaneWidth}>
          <LeftPane $closable={leftClosable}>
            {left}
            {leftClosable && (
              <PaneCloseIcon
                onClick={onCloseLeftPane}
                tooltipTitle={leftPaneTooltipTitle}
                containerStyle={{
                  position: 'absolute',
                  top: 18,
                  right: -8,
                  zIndex: LAYOUT.zIndex.high,
                  ...paneCloseIconStyle,
                }}
              />
            )}
          </LeftPane>
        </Allotment.Pane>

        <Allotment.Pane
          key={isMiddleActive ? 'middle-pane-active' : 'middle-pane-not-active'}
          minSize={isMiddleActive ? minPaneWidth : 25}
          maxSize={isMiddleActive ? undefined : 25}
          visible={Boolean(middle)}
          priority={LayoutPriority.Low}
        >
          <MiddlePane $closable={middleClosable}>
            {middle}
            {middleClosable && (
              <PaneCloseIcon
                onClick={onCloseMiddlePane}
                tooltipTitle={middlePaneTooltipTitle}
                containerStyle={{
                  position: 'absolute',
                  top: 18,
                  right: -8,
                  zIndex: LAYOUT.zIndex.high,
                  transform: isMiddleActive ? '' : 'rotate(180deg)',
                  ...paneCloseIconStyle,
                }}
              />
            )}
          </MiddlePane>
        </Allotment.Pane>

        <Allotment.Pane minSize={minPaneWidth} priority={LayoutPriority.High} preferredSize={defaultSizes?.[2]}>
          <Pane>{right}</Pane>
        </Allotment.Pane>
      </Allotment>
    </Container>
  );
};

export default ResizableColumnsPanel;

// Styled Components

const Container = styled.div<{
  $leftClosable: boolean;
  $middleClosable: boolean;
  $leftActive: boolean;
}>`
  height: 100%;
  width: 100%;

  ${({$leftClosable}) => {
    if ($leftClosable) {
      return `
        .split-view-view-visible:first-child {
          overflow: visible;
        }
      `;
    }
  }}

  ${({$middleClosable}) => {
    if ($middleClosable) {
      return `
        .split-view-view-visible:nth-child(2) {
          overflow: visible;
        }
      `;
    }
  }}

  ${({$leftActive}) => {
    if (!$leftActive) {
      return `
        .split-view-view-visible:nth-child(2)::before {
          display: none;
        }
      `;
    }
  }}
`;

const Pane = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

const LeftPane = styled(Pane)<{$closable: boolean}>`
  background-color: ${Colors.grey10};

  ${({$closable}) => {
    if ($closable) {
      return `position: static;`;
    }
  }}
`;

const MiddlePane = styled(Pane)<{$closable: boolean}>`
  ${({$closable}) => {
    if ($closable) {
      return `position: static;`;
    }
  }}
`;
