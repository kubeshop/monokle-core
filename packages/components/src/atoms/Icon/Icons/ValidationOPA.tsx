const ValidationOPA = ({ width, height }: { width?: number; height?: number }) => {
  const iconWidth = width || "12";
  const iconHeight = height || "13";

  return (
    <svg width={iconWidth} height={iconHeight} viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.74655 3.26162L2.62391 4.13183L1.83342 3.49412L1.65406 2.98263L1.83342 1.68063L2.23863 0L1.01635 1.68063L0.172713 3.13541L0 4.05212L0.225856 4.89576L1.42156 6.27082V9.63209L3.23505 10.5023L4.91569 12.0301L5.70618 13H6.16454L6.92846 12.0301L8.58917 10.5023L10.4492 9.63209V6.27082L11.5452 4.89576L11.9239 4.05212L11.8242 3.26162L10.9607 1.68063L9.63209 0L10.2698 2.7302L10.0904 3.49412L9.20031 4.13183L8.02453 3.26162L6.70261 2.7302H5.09504L3.74655 3.26162Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ValidationOPA;
