const ValidationYamlSyntax = ({width, height}: {width?: number; height?: number}) => {
  const iconWidth = width || '13';
  const iconHeight = height || '13';

  return (
    <svg width={iconWidth} height={iconHeight} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.00195312 0.00633148C0.654417 0.00633148 1.30688 -0.000237406 1.95848 0.00633148L2.00428 0.037533C2.80107 0.794049 3.59641 1.54892 4.39031 2.30216C5.16031 1.55823 5.94586 0.829084 6.72363 0.0851578C6.76943 0.0424601 6.81869 -0.00762794 6.88955 0.00304649C7.41498 0.00304649 7.93954 0.00304649 8.46497 0.00304649C8.56694 -0.00402135 8.66945 0.00122084 8.77003 0.0186476C8.1651 0.568792 7.58004 1.14275 6.98202 1.70192L3.06551 5.41088C2.77946 5.67692 2.50551 5.95528 2.21082 6.21146C1.55922 6.22953 0.905032 6.21721 0.252568 6.21721C1.30947 5.22449 2.35342 4.21945 3.41378 3.23083C2.27218 2.1601 1.14096 1.07952 0.00195312 0.00633148Z"
        fill="currentColor"
      />
      <path
        d="M11.394 0C11.9237 0 12.4535 0 12.9832 0C12.9832 2.07084 12.9832 4.14168 12.9832 6.21252C12.4552 6.21252 11.9272 6.22237 11.4 6.20595C11.4 4.83962 11.4 3.47248 11.4 2.10533C10.0173 3.42485 8.62684 4.73288 7.24241 6.04666C7.16549 6.11235 7.09895 6.22484 6.97883 6.20595C6.26674 6.20102 5.55378 6.20595 4.84082 6.20595C7.02953 4.13894 9.21391 2.07029 11.394 0Z"
        fill="currentColor"
      />
      <path
        d="M0 6.78234C0.40617 6.77495 0.811475 6.78234 1.21764 6.78234C1.94011 7.48274 2.67813 8.16919 3.40923 8.86139C4.13976 8.16782 4.87115 7.47481 5.60341 6.78234C6.0067 6.78234 6.40999 6.78234 6.81328 6.78234C6.80867 8.85373 6.80867 10.9248 6.81328 12.9957C6.40624 12.9957 5.99835 13.0006 5.59131 12.9957C5.59592 11.689 5.59592 10.3826 5.59131 9.07652C4.86194 9.76872 4.14293 10.4724 3.40837 11.1589C2.66862 10.4732 1.95048 9.76707 1.22024 9.07241C1.22024 10.3813 1.21505 11.6901 1.22542 12.9981C0.817524 12.9981 0.410491 13.0022 0.0025928 12.9981C0.000864415 10.9235 0 8.85154 0 6.78234Z"
        fill="currentColor"
      />
      <path
        d="M7.17383 6.7799C7.58173 6.7799 7.98962 6.77415 8.39752 6.7799C8.39349 8.46755 8.39349 10.1552 8.39752 11.8429C9.4864 11.8429 10.5761 11.8429 11.6659 11.8429C11.7203 11.8478 11.7903 11.833 11.831 11.8798C12.2181 12.2526 12.6148 12.6188 13.0002 12.9916C11.0581 12.9954 9.11624 12.9954 7.17469 12.9916C7.17872 10.9213 7.17844 8.85074 7.17383 6.7799Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ValidationYamlSyntax;
