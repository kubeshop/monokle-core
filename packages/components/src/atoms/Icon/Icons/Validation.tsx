const Validation = ({width, height}: {width?: number; height?: number}) => {
  const iconWidth = width || '18';
  const iconHeight = height || '18';
  return (
    <svg width={iconWidth} height={iconHeight} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.9375 9C15.9375 5.16852 12.8315 2.0625 9 2.0625C5.16852 2.0625 2.0625 5.16852 2.0625 9C2.0625 12.8315 5.16852 15.9375 9 15.9375C12.8315 15.9375 15.9375 12.8315 15.9375 9Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M6.75 9L8.25 10.5L11.25 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Validation;
