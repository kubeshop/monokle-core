import Colors from "@/styles/Colors";
import { useCallback } from "react";
import { ReflexContainer, ReflexElement, ReflexSplitter, HandlerProps } from "react-reflex";

import * as S from "./ResizableColumnsPanel.styled";

export const MIN_PANE_WIDTH = 350;
export const PANE_GUTTER_WIDTH = 15;

type ResizableColumnsPanelLayout = {
  left?: number;
  center: number;
  right: number;
};

type IProps = {
  center: React.ReactNode;
  right: React.ReactNode;
  layout?: ResizableColumnsPanelLayout;
  left?: React.ReactNode;
  height?: number;
  width?: number;
  onStopResize?: (position: "left" | "center" | "right", flex: number) => void;
};

const ResizableColumnsPanel: React.FC<IProps> = (props) => {
  const { center, layout, left, right, height = "100%", width = "100%", onStopResize } = props;

  const makeOnStopResize = useCallback((position: "left" | "center" | "right") => {
    return (args: HandlerProps) => {
      const flex = args.component.props.flex;

      if (flex && onStopResize) {
        onStopResize(position, flex);
      }
    };
  }, []);

  return (
    <ReflexContainer orientation="vertical" windowResizeAware style={{ height, width }}>
      {left && (
        <ReflexElement minSize={MIN_PANE_WIDTH} onStopResize={makeOnStopResize("left")} flex={layout?.left}>
          <S.LeftPane>{left}</S.LeftPane>
        </ReflexElement>
      )}

      {left && <ReflexSplitter style={{ backgroundColor: Colors.grey10 }} />}

      <ReflexElement
        minSize={MIN_PANE_WIDTH}
        maxSize={MIN_PANE_WIDTH + 200}
        onStopResize={makeOnStopResize("center")}
        flex={layout?.center}
      >
        <S.Pane>{center}</S.Pane>
      </ReflexElement>

      <ReflexSplitter />

      <ReflexElement minSize={MIN_PANE_WIDTH} onStopResize={makeOnStopResize("right")}>
        <S.Pane>{right}</S.Pane>
      </ReflexElement>
    </ReflexContainer>
  );
};

export default ResizableColumnsPanel;
