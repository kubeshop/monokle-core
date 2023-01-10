const AllProjects = ({ width, height }: { width?: number; height?: number }) => {
  const iconWidth = width || "18";
  const iconHeight = height || "18";

  return (
    <svg width={iconWidth} height={iconHeight} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 2.0625H3.75C2.81802 2.0625 2.0625 2.81802 2.0625 3.75V6C2.0625 6.93198 2.81802 7.6875 3.75 7.6875H6C6.93198 7.6875 7.6875 6.93198 7.6875 6V3.75C7.6875 2.81802 6.93198 2.0625 6 2.0625Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M14.25 2.0625H12C11.068 2.0625 10.3125 2.81802 10.3125 3.75V6C10.3125 6.93198 11.068 7.6875 12 7.6875H14.25C15.182 7.6875 15.9375 6.93198 15.9375 6V3.75C15.9375 2.81802 15.182 2.0625 14.25 2.0625Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M14.25 10.3125H12C11.068 10.3125 10.3125 11.068 10.3125 12V14.25C10.3125 15.182 11.068 15.9375 12 15.9375H14.25C15.182 15.9375 15.9375 15.182 15.9375 14.25V12C15.9375 11.068 15.182 10.3125 14.25 10.3125Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M6 10.3125H3.75C2.81802 10.3125 2.0625 11.068 2.0625 12V14.25C2.0625 15.182 2.81802 15.9375 3.75 15.9375H6C6.93198 15.9375 7.6875 15.182 7.6875 14.25V12C7.6875 11.068 6.93198 10.3125 6 10.3125Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
};

export default AllProjects;
