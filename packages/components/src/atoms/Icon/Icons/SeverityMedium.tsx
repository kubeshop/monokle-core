const MediumSeverity = ({ width, height }: { width?: number; height?: number }) => {
  const iconWidth = width || "12";
  const iconHeight = height || "8";

  return (
    <svg width={iconWidth} height={iconHeight} viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.433 7.57626L11.6245 7.57626C11.7278 7.57626 11.7848 7.46454 11.7216 7.38909L6.2946 0.848464C6.24869 0.792892 6.1899 0.747925 6.12272 0.716994C6.05554 0.686062 5.98174 0.669983 5.90696 0.669983C5.83217 0.669983 5.75837 0.686062 5.69119 0.716994C5.62401 0.747925 5.56522 0.792892 5.51931 0.848464L0.0923158 7.38909C0.0291215 7.46599 0.0861503 7.57626 0.189419 7.57626L1.38086 7.57626C1.45639 7.57626 1.52883 7.54289 1.57507 7.48775L5.90618 2.26454L10.2388 7.48775C10.2851 7.54289 10.3575 7.57626 10.433 7.57626Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default MediumSeverity;
