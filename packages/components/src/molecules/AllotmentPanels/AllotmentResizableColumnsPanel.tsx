import {PaneCloseIcon} from '@/atoms';
import {AllotmentResizableColumnsPanelType} from './types';

import {Allotment, LayoutPriority} from 'allotment';

import 'allotment/dist/style.css';
import {LAYOUT} from '@/constants';
import styled from 'styled-components';
import {Colors} from '@/styles/Colors';

const AllotmentResizableColumnsPanel: React.FC<AllotmentResizableColumnsPanelType> = props => {
  const {center, left, right, minPaneWidth = 350, leftClosable = false, paneCloseIconStyle = {}, defaultSizes} = props;
  const {onDragEnd = () => {}, onCloseLeftPane = () => {}} = props;

  console.log('Center:', center);
  console.log('Left:', left);
  console.log('Right:', right);

  return (
    <Allotment onDragEnd={onDragEnd} defaultSizes={defaultSizes} proportionalLayout={false}>
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
  );
};

export default AllotmentResizableColumnsPanel;

// Styled Components

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
