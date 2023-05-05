import {Allotment} from 'allotment';
import {AllotmentResizableRowsPanelType} from './types';

import 'allotment/dist/style.css';

const AllotmentResizableRowsPanel: React.FC<AllotmentResizableRowsPanelType> = props => {
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

export default AllotmentResizableRowsPanel;
