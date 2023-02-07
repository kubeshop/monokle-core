import {Colors} from '@/styles/Colors';

const ProblemSplit = ({width, height}: {width?: number; height?: number}) => {
  const iconWidth = width || '8';
  const iconHeight = height || '8';

  return (
    <svg width={iconWidth} height={iconHeight} viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 6C8 7.10457 7.10457 8 6 8L4 8L4 -3.49691e-07L6 -1.74846e-07C7.10457 -7.8281e-08 8 0.895431 8 2L8 6Z"
        fill={Colors.redError}
      />
      <path
        d="M4 8L2 8C0.895431 8 7.8281e-08 7.10457 1.74846e-07 6L5.24537e-07 2C6.21101e-07 0.89543 0.895431 -2.7141e-07 2 -1.74846e-07L4 0L4 8Z"
        fill={Colors.yellowWarning}
      />
    </svg>
  );
};

export default ProblemSplit;
