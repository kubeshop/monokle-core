import Colors from "@/styles/Colors";
import { useCallback } from "react";
import { ReflexContainer, ReflexElement, ReflexSplitter, HandlerProps } from "react-reflex";

import { ResizableColumnsPanelType } from "./types";
import * as S from "./ResizableColumnsPanel.styled";

const ResizableColumnsPanel: React.FC<ResizableColumnsPanelType> = (props) => {
  const { center, layout, left, right, height = "100%", width = "100%", onStopResize, minPaneWidth = 350 } = props;

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
        <ReflexElement minSize={minPaneWidth} onStopResize={makeOnStopResize("left")} flex={layout?.left}>
          <S.LeftPane>{left}</S.LeftPane>
        </ReflexElement>
      )}

      {left && <ReflexSplitter propagate style={{ backgroundColor: Colors.grey10 }} />}

      {center && (
        <ReflexElement
          minSize={minPaneWidth}
          maxSize={minPaneWidth + 200}
          onStopResize={makeOnStopResize("center")}
          flex={layout?.center}
        >
          <S.Pane>{center}</S.Pane>
        </ReflexElement>
      )}

      {center && <ReflexSplitter propagate={Boolean(left)} />}

      <ReflexElement minSize={minPaneWidth} onStopResize={makeOnStopResize("right")}>
        <S.Pane>{right}</S.Pane>
      </ReflexElement>
    </ReflexContainer>
  );
};

export default ResizableColumnsPanel;
