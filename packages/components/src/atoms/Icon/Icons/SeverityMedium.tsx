const MediumSeverity = ({ width, height }: { width?: number; height?: number }) => {
  const iconWidth = width || "24";
  const iconHeight = height || "24";

  return (
    <svg width={iconWidth} height={iconHeight} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.2451 11.7862L14.6254 11.7862C14.7451 11.7862 14.8111 11.6487 14.7379 11.5558L8.45041 3.5058C8.39722 3.43741 8.32911 3.38206 8.25128 3.34399C8.17344 3.30592 8.08794 3.28613 8.0013 3.28613C7.91466 3.28613 7.82916 3.30592 7.75132 3.34399C7.67349 3.38206 7.60538 3.43741 7.55219 3.5058L1.26469 11.5558C1.19148 11.6504 1.25755 11.7862 1.37719 11.7862L2.75755 11.7862C2.84505 11.7862 2.92898 11.7451 2.98255 11.6772L8.00041 5.24866L13.0201 11.6772C13.0736 11.7451 13.1576 11.7862 13.2451 11.7862Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default MediumSeverity;
