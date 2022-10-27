const Terminal = ({ width, height }: { width?: number; height?: number }) => {
  const iconWidth = width || "22";
  const iconHeight = height || "22";

  return (
    <svg width={iconWidth} height={iconHeight} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.40625 3.78125H19.5938V18.2188H2.40625V3.78125Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.0312 14.0938H15.4688M6.53125 7.90625L9.96875 11L6.53125 14.0938"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Terminal;
