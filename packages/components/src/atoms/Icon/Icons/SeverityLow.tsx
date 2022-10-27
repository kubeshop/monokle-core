const LowSeverity = ({ width, height }: { width?: number; height?: number }) => {
  const iconWidth = width || "24";
  const iconHeight = height || "24";

  return (
    <svg width={iconWidth} height={iconHeight} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.75495 4.21384L1.37459 4.21384C1.25495 4.21384 1.18888 4.35134 1.26209 4.4442L7.54959 12.4942C7.60278 12.5626 7.67089 12.6179 7.74872 12.656C7.82656 12.6941 7.91206 12.7139 7.9987 12.7139C8.08534 12.7139 8.17084 12.6941 8.24868 12.656C8.32651 12.6179 8.39462 12.5626 8.44781 12.4942L14.7353 4.4442C14.8085 4.34956 14.7425 4.21384 14.6228 4.21384L13.2425 4.21384C13.155 4.21384 13.071 4.25491 13.0175 4.32277L7.99959 10.7513L2.97995 4.32277C2.92638 4.25491 2.84245 4.21384 2.75495 4.21384Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default LowSeverity;
