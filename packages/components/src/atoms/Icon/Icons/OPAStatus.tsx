const OPAStatus = ({ width, height }: { width?: number; height?: number }) => {
  const iconWidth = width || "13";
  const iconHeight = height || "14";

  return (
    <svg width={iconWidth} height={iconHeight} viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.03475 3.51252L2.82575 4.44967L1.97445 3.7629L1.7813 3.21206L1.97445 1.80991L2.41083 0L1.09453 1.80991L0.185999 3.3766L0 4.36382L0.243229 5.27236L1.53091 6.75319V10.373L3.4839 11.3102L5.29382 12.9555L6.14512 14H6.63873L7.46142 12.9555L9.24987 11.3102L11.2529 10.373V6.75319L12.4333 5.27236L12.8411 4.36382L12.7338 3.51252L11.8038 1.80991L10.373 0L11.0598 2.94021L10.8666 3.7629L9.90802 4.44967L8.6418 3.51252L7.21819 2.94021H5.48697L4.03475 3.51252Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default OPAStatus;
