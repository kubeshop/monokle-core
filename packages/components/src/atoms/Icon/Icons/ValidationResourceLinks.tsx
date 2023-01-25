const ValidationResourceLinks = ({width, height}: {width?: number; height?: number}) => {
  const iconWidth = width || '13';
  const iconHeight = height || '9';

  return (
    <svg width={iconWidth} height={iconHeight} viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.23913 1.69565C2.83441 1.69565 1.69565 2.83441 1.69565 4.23913C1.69565 5.64387 2.83441 6.78261 4.23913 6.78261H5.08696C5.39913 6.78261 5.65218 7.03566 5.65218 7.34783V7.91305C5.65218 8.22522 5.39913 8.47826 5.08696 8.47826H4.23913C1.89792 8.47826 0 6.58032 0 4.23913C0 1.89792 1.89792 0 4.23913 0H5.08696C5.39913 0 5.65218 0.253059 5.65218 0.565218V1.13044C5.65218 1.44259 5.39913 1.69565 5.08696 1.69565H4.23913Z"
        fill="currentColor"
      />
      <path
        d="M3.3916 3.95658C3.3916 3.64441 3.64466 3.39136 3.95682 3.39136H9.04378C9.35595 3.39136 9.609 3.64441 9.609 3.95658V4.52179C9.609 4.83396 9.35595 5.08701 9.04378 5.08701H3.95682C3.64466 5.08701 3.3916 4.83396 3.3916 4.52179V3.95658Z"
        fill="currentColor"
      />
      <path
        d="M11.3042 4.23913C11.3042 2.83441 10.1654 1.69565 8.7607 1.69565H7.91287C7.6007 1.69565 7.34766 1.44259 7.34766 1.13044V0.565218C7.34766 0.253059 7.6007 0 7.91287 0H8.7607C11.1019 0 12.9998 1.89792 12.9998 4.23913C12.9998 6.58032 11.1019 8.47826 8.7607 8.47826H7.91287C7.6007 8.47826 7.34766 8.22522 7.34766 7.91305V7.34783C7.34766 7.03566 7.6007 6.78261 7.91287 6.78261H8.7607C10.1654 6.78261 11.3042 5.64387 11.3042 4.23913Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ValidationResourceLinks;
