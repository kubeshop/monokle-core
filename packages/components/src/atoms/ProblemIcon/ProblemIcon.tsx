import {Colors} from '@/styles/Colors';
import {Icon} from '../Icon';

type ProblemIconType = {
  disabled?: boolean;
  level?: 'both' | 'error' | 'warning' | 'none';
};

const ProblemIcon: React.FC<ProblemIconType> = props => {
  const {disabled, level} = props;

  return (
    <Icon
      name={level === 'both' ? 'problem-split' : 'problem-icon'}
      style={{
        color: disabled
          ? Colors.grey7
          : level === 'error'
          ? Colors.redError
          : level === 'warning'
          ? Colors.yellowWarning
          : '#242424',
      }}
    />
  );
};

export default ProblemIcon;
