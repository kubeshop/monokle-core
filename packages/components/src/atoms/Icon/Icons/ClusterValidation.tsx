const ClusterValidation = ({width, height}: {width?: number; height?: number}) => {
  const iconWidth = width || '19';
  const iconHeight = height || '19';

  return (
    <svg width={iconWidth} height={iconHeight} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.4933 4.00234L6.33166 7.00061L1.16797 3.99756"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6.32812 7V12.5724" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M6.94493 12.8341C6.56412 13.0553 6.09494 13.0553 5.71413 12.8341L1.6154 10.4533C1.23458 10.2321 1 9.82324 1 9.38085V4.61916C1 4.17676 1.23458 3.76796 1.6154 3.54675L5.71413 1.1659C6.09494 0.944698 6.56412 0.944698 6.94493 1.1659L11.0437 3.54675C11.4245 3.76796 11.6591 4.17676 11.6591 4.61916V6.625"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 8C10.4627 8 8 10.4627 8 13.5C8 16.5373 10.4627 19 13.5 19C16.5373 19 19 16.5373 19 13.5C19 10.4627 16.5373 8 13.5 8ZM15.8756 11.7039L13.2901 15.2887C13.2539 15.3392 13.2063 15.3803 13.1511 15.4086C13.0959 15.437 13.0348 15.4518 12.9727 15.4518C12.9107 15.4518 12.8495 15.437 12.7943 15.4086C12.7391 15.3803 12.6915 15.3392 12.6554 15.2887L11.1244 13.1673C11.0778 13.1022 11.1244 13.0114 11.2042 13.0114H11.78C11.9052 13.0114 12.0243 13.0715 12.098 13.1747L12.9721 14.3876L14.902 11.7113C14.9757 11.6094 15.0935 11.548 15.22 11.548H15.7958C15.8756 11.548 15.9222 11.6388 15.8756 11.7039Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ClusterValidation;
