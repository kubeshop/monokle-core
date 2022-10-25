import { Spin } from "antd";

import * as S from "./Spinner.styled";

interface Props {
  isSpinning?: boolean;
  size?: "small" | "default" | "large";
}

export const Spinner: React.FC<Props> = (props) => {
  const { isSpinning = true, size = "small" } = props;

  return (
    <S.SpinnerWrapper>
      <Spin spinning={isSpinning} size={size} />
    </S.SpinnerWrapper>
  );
};
