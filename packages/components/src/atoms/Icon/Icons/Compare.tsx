const Compare: React.FC = ({width, height}: {width?: number; height?: number}) => {
  const iconWidth = width || '18';
  const iconHeight = height || '18';

  return (
    <svg width={iconWidth} height={iconHeight} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.25 12.75L4.5 10.5M14.25 12.75H2.25H14.25ZM2.25 12.75L4.5 15L2.25 12.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.75 5.25L13.5 7.5M3.75 5.25H15.75H3.75ZM15.75 5.25L13.5 3L15.75 5.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Compare;
