import {Allotment, LayoutPriority} from 'allotment';
import {ResizableRowsPanelType} from './types';
import styled from 'styled-components';

const ResizableRowsPanel: React.FC<ResizableRowsPanelType> = props => {
  const {top, bottom, onDragEnd = () => {}, defaultSizes, isBottomVisible} = props;
  const {bottomPaneMinSize = 200, bottomPaneMaxSize = 500} = props;

  return (
    <Allotment onDragEnd={onDragEnd} defaultSizes={defaultSizes} vertical proportionalLayout={false}>
      <Allotment.Pane priority={LayoutPriority.High}>{top}</Allotment.Pane>

      <Allotment.Pane
        visible={isBottomVisible ?? Boolean(bottom)}
        minSize={bottomPaneMinSize}
        maxSize={bottomPaneMaxSize}
        preferredSize={defaultSizes?.[1]}
      >
        {bottom}
      </Allotment.Pane>
    </Allotment>
  );
};

export default ResizableRowsPanel;
