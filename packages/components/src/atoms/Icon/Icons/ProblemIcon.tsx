const ProblemIcon = ({width, height}: {width?: number; height?: number}) => {
  const iconWidth = width || '8';
  const iconHeight = height || '8';

  return (
    <svg width={iconWidth} height={iconHeight} viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="8" height="8" rx="2" fill="currentColor" />
    </svg>
  );
};

export default ProblemIcon;
