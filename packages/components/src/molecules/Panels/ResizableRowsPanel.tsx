import {Allotment} from 'allotment';
import {ResizableRowsPanelType} from './types';

const ResizableRowsPanel: React.FC<ResizableRowsPanelType> = props => {
  const {top, bottom, onDragEnd = () => {}, defaultSizes} = props;
  const {bottomPaneMinSize = 200, bottomPaneMaxSize = 500} = props;

  return (
    <Allotment onDragEnd={onDragEnd} defaultSizes={defaultSizes} vertical>
      <Allotment.Pane>{top}</Allotment.Pane>

      <Allotment.Pane visible={Boolean(bottom)} minSize={bottomPaneMinSize} maxSize={bottomPaneMaxSize}>
        {bottom}
      </Allotment.Pane>
    </Allotment>
  );
};

export default ResizableRowsPanel;
