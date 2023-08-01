const Kustomize: React.FC = ({width, height}: {width?: number; height?: number}) => {
  const iconWidth = width || '16';
  const iconHeight = height || '16';

  return (
    <svg width={iconWidth} height={iconHeight} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_900_5374)">
        <path
          d="M1.29303 12.0002L10.0001 3.2931C10.1905 3.11124 10.4438 3.00977 10.7071 3.00977C10.9705 3.00977 11.2237 3.11124 11.4141 3.2931L12.7071 4.5861C12.8944 4.77377 12.9995 5.02804 12.9995 5.29313C12.9995 5.55822 12.8944 5.81249 12.7071 6.00015L4.00058 14.7072C3.8129 14.8944 3.55864 14.9995 3.29356 14.9995C3.02848 14.9995 2.77422 14.8944 2.58653 14.7072L1.29303 13.414C1.20016 13.3211 1.12648 13.2109 1.07622 13.0896C1.02595 12.9683 1.00008 12.8382 1.00008 12.7069C1.00008 12.5756 1.02595 12.4456 1.07622 12.3243C1.12648 12.203 1.20016 12.093 1.29303 12.0002ZM12.0001 5.29311L10.7071 4.00015L8.20713 6.50015L9.50043 7.7936L12.0004 5.2936L12.0001 5.29311Z"
          fill="currentColor"
        />
        <path d="M14 7.00001L15 8L14 8.99999L13 8L14 7.00001Z" fill="currentColor" />
        <path d="M8.00001 1.00001L9 2L8.00001 2.99999L7.00002 2L8.00001 1.00001Z" fill="currentColor" />
        <path d="M14 1.00001L15 2L14 2.99999L13 2L14 1.00001Z" fill="currentColor" />
      </g>
      <defs>
        <clipPath id="clip0_900_5374">
          <rect width="16" height="16" fill="white" transform="matrix(-1 0 0 1 16 0)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Kustomize;
