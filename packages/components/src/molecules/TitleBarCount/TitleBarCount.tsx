import { ActiveBox, BaseBox } from "./TitleBarCount.styled";
import { TitleBarCountType } from "./types";

function TitleBarCount({ count, isActive }: TitleBarCountType) {
  const Box = isActive ? ActiveBox : BaseBox;

  return (
    <Box>
      {count}
    </Box>
  );
}

export default TitleBarCount;

