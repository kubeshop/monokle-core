const Checked = ({width, height}: {width?: number; height?: number}) => {
  const iconWidth = width || '18';
  const iconHeight = height || '18';
  return (
    <svg
      width={iconWidth}
      height={iconHeight}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.1213 9.00023C15.1213 5.61952 12.3807 2.87891 8.99999 2.87891C5.61927 2.87891 2.87866 5.61952 2.87866 9.00023C2.87866 12.3809 5.61927 15.1216 8.99999 15.1216C12.3807 15.1216 15.1213 12.3809 15.1213 9.00023Z"
        stroke="currentColor"
        stroke-width="1.5"
      />
      <path
        d="M7.01477 9.00029L8.3383 10.3238L10.9854 7.67676"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Checked;
