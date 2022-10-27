const Explorer: React.FC = ({ width, height }: { width?: number; height?: number }) => {
  const iconWidth = width || "16";
  const iconHeight = height || "12";

  return (
    <svg width={iconWidth} height={iconHeight} viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.0312 0.375H4.76562C4.68828 0.375 4.625 0.438281 4.625 0.515625V1.5C4.625 1.57734 4.68828 1.64062 4.76562 1.64062H15.0312C15.1086 1.64062 15.1719 1.57734 15.1719 1.5V0.515625C15.1719 0.438281 15.1086 0.375 15.0312 0.375ZM15.0312 5.36719H4.76562C4.68828 5.36719 4.625 5.43047 4.625 5.50781V6.49219C4.625 6.56953 4.68828 6.63281 4.76562 6.63281H15.0312C15.1086 6.63281 15.1719 6.56953 15.1719 6.49219V5.50781C15.1719 5.43047 15.1086 5.36719 15.0312 5.36719ZM15.0312 10.3594H4.76562C4.68828 10.3594 4.625 10.4227 4.625 10.5V11.4844C4.625 11.5617 4.68828 11.625 4.76562 11.625H15.0312C15.1086 11.625 15.1719 11.5617 15.1719 11.4844V10.5C15.1719 10.4227 15.1086 10.3594 15.0312 10.3594ZM0.828125 1.00781C0.828125 1.13708 0.853587 1.26509 0.903056 1.38452C0.952526 1.50395 1.02503 1.61246 1.11644 1.70387C1.20785 1.79528 1.31637 1.86779 1.4358 1.91726C1.55523 1.96673 1.68323 1.99219 1.8125 1.99219C1.94177 1.99219 2.06977 1.96673 2.1892 1.91726C2.30863 1.86779 2.41715 1.79528 2.50856 1.70387C2.59997 1.61246 2.67247 1.50395 2.72194 1.38452C2.77141 1.26509 2.79688 1.13708 2.79688 1.00781C2.79688 0.878543 2.77141 0.750538 2.72194 0.631109C2.67247 0.511679 2.59997 0.403162 2.50856 0.311754C2.41715 0.220347 2.30863 0.147838 2.1892 0.0983685C2.06977 0.048899 1.94177 0.0234375 1.8125 0.0234375C1.68323 0.0234375 1.55523 0.048899 1.4358 0.0983685C1.31637 0.147838 1.20785 0.220347 1.11644 0.311754C1.02503 0.403162 0.952526 0.511679 0.903056 0.631109C0.853587 0.750538 0.828125 0.878543 0.828125 1.00781ZM0.828125 6C0.828125 6.12927 0.853587 6.25727 0.903056 6.3767C0.952526 6.49613 1.02503 6.60465 1.11644 6.69606C1.20785 6.78747 1.31637 6.85997 1.4358 6.90944C1.55523 6.95891 1.68323 6.98438 1.8125 6.98438C1.94177 6.98438 2.06977 6.95891 2.1892 6.90944C2.30863 6.85997 2.41715 6.78747 2.50856 6.69606C2.59997 6.60465 2.67247 6.49613 2.72194 6.3767C2.77141 6.25727 2.79688 6.12927 2.79688 6C2.79688 5.87073 2.77141 5.74273 2.72194 5.6233C2.67247 5.50387 2.59997 5.39535 2.50856 5.30394C2.41715 5.21253 2.30863 5.14003 2.1892 5.09056C2.06977 5.04109 1.94177 5.01562 1.8125 5.01562C1.68323 5.01562 1.55523 5.04109 1.4358 5.09056C1.31637 5.14003 1.20785 5.21253 1.11644 5.30394C1.02503 5.39535 0.952526 5.50387 0.903056 5.6233C0.853587 5.74273 0.828125 5.87073 0.828125 6ZM0.828125 10.9922C0.828125 11.1215 0.853587 11.2495 0.903056 11.3689C0.952526 11.4883 1.02503 11.5968 1.11644 11.6882C1.20785 11.7797 1.31637 11.8522 1.4358 11.9016C1.55523 11.9511 1.68323 11.9766 1.8125 11.9766C1.94177 11.9766 2.06977 11.9511 2.1892 11.9016C2.30863 11.8522 2.41715 11.7797 2.50856 11.6882C2.59997 11.5968 2.67247 11.4883 2.72194 11.3689C2.77141 11.2495 2.79688 11.1215 2.79688 10.9922C2.79688 10.8629 2.77141 10.7349 2.72194 10.6155C2.67247 10.4961 2.59997 10.3875 2.50856 10.2961C2.41715 10.2047 2.30863 10.1322 2.1892 10.0827C2.06977 10.0333 1.94177 10.0078 1.8125 10.0078C1.68323 10.0078 1.55523 10.0333 1.4358 10.0827C1.31637 10.1322 1.20785 10.2047 1.11644 10.2961C1.02503 10.3875 0.952526 10.4961 0.903056 10.6155C0.853587 10.7349 0.828125 10.8629 0.828125 10.9922Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Explorer;