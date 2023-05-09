import {PaneCloseIcon} from '@/atoms';
import {ResizableColumnsPanelType} from './types';

import {Allotment, LayoutPriority} from 'allotment';

import {LAYOUT} from '@/constants';
import styled from 'styled-components';
import {Colors} from '@/styles/Colors';

const ResizableColumnsPanel: React.FC<ResizableColumnsPanelType> = props => {
  const {center, left, right, minPaneWidth = 350, leftClosable = false, paneCloseIconStyle = {}, defaultSizes} = props;
  const {onDragEnd = () => {}, onCloseLeftPane = () => {}, isLeftActive = true} = props;

  return (
    <Container $leftClosable={leftClosable} $leftActive={isLeftActive}>
      <Allotment onDragEnd={onDragEnd} onReset={() => {}} defaultSizes={defaultSizes} proportionalLayout={false}>
        <Allotment.Pane visible={Boolean(left)} minSize={minPaneWidth} preferredSize={defaultSizes?.[0]}>
          <LeftPane $leftClosable={leftClosable}>
            {left}
            {leftClosable && (
              <PaneCloseIcon
                onClick={onCloseLeftPane}
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

        <Allotment.Pane minSize={minPaneWidth} visible={Boolean(center)} priority={LayoutPriority.Low}>
          <Pane>{center}</Pane>
        </Allotment.Pane>

        <Allotment.Pane minSize={minPaneWidth} priority={LayoutPriority.High}>
          <Pane>{right}</Pane>
        </Allotment.Pane>
      </Allotment>
    </Container>
  );
};

export default ResizableColumnsPanel;

// Styled Components

const Container = styled.div<{$leftClosable: boolean; $leftActive: boolean}>`
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

const LeftPane = styled(Pane)<{$leftClosable: boolean}>`
  background-color: ${Colors.grey10};

  ${({$leftClosable}) => {
    if ($leftClosable) {
      return `position: static;`;
    }
  }}
`;
