import {WalkThroughProps} from './types';

import * as S from './WalkThrough.styled';

const WalkThrough: React.FC<WalkThroughProps> = ({topic, dismissWalkThrough, children}) => {
  return (
    <S.Modal centered open={!!topic} onCancel={dismissWalkThrough} footer={null}>
      {children}
    </S.Modal>
  );
};

export default WalkThrough;
