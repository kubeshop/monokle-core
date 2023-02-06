import {Colors} from '@/styles/Colors';
import styled from 'styled-components';
import {WalkThroughProps} from './types';
import {Modal as RawModal} from 'antd';

const WalkThrough: React.FC<WalkThroughProps> = ({topic, dismissWalkThrough, children}) => {
  return (
    <Modal centered open={!!topic} onCancel={dismissWalkThrough} footer={null}>
      {children}
    </Modal>
  );
};

export default WalkThrough;

// Styled Components

const Modal = styled(RawModal).attrs({
  className: 'walkthrough-modal',
})`
  min-width: 950px;

  .ant-modal-content {
    background-color: ${Colors.grey9} !important;
    border-radius: 4px;
  }
`;
