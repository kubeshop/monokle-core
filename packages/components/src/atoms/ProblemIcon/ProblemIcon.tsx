import {Colors} from '@/styles/Colors';
import {Icon} from '../Icon';

export type ProblemIconType = {
  disabled?: boolean;
  level?: 'both' | 'error' | 'warning' | 'none';
  style?: React.CSSProperties;
};

const ProblemIcon: React.FC<ProblemIconType> = props => {
  const {disabled, level, style = {}} = props;

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
        fontSize: '8px',
        ...style,
      }}
    />
  );
};

export default ProblemIcon;
