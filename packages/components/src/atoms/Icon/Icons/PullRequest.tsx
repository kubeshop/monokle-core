export default function PullRequestSvg({width, height}: {width?: number; height?: number}) {
  const iconWidth = width || '16';
  const iconHeight = height || '16';

  return (
    <svg width={iconWidth} height={iconHeight} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.6667 10.3333C11.378 10.3333 10.3333 11.378 10.3333 12.6667C10.3333 13.9554 11.378 15 12.6667 15C13.9554 15 15 13.9554 15 12.6667C15 11.378 13.9554 10.3333 12.6667 10.3333ZM12.6667 10.3333V4.88889C12.6667 4.47633 12.5028 4.08067 12.211 3.78895C11.9193 3.49722 11.5236 3.33333 11.1111 3.33333H8.77778M3.33333 5.66667C4.62199 5.66667 5.66667 4.62199 5.66667 3.33333C5.66667 2.04467 4.62199 1 3.33333 1C2.04467 1 1 2.04467 1 3.33333C1 4.62199 2.04467 5.66667 3.33333 5.66667ZM3.33333 5.66667V15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
