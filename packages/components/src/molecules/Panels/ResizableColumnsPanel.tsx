import { useCallback } from "react";
import { ReflexContainer, ReflexElement, ReflexSplitter, HandlerProps } from "react-reflex";
import styled from "styled-components";

import Colors from "@/styles/Colors";

import { OnStopResize, ResizableColumnsPanelType } from "./types";

const ResizableColumnsPanel: React.FC<ResizableColumnsPanelType> = (props) => {
  const { center, layout, left, right, height = "100%", width = "100%", onStopResize, minPaneWidth = 350 } = props;

  const onStopResizeLeft = useCallback(makeOnStopResize("left", onStopResize), [onStopResize]);
  const onStopResizeCenter = useCallback(makeOnStopResize("center", onStopResize), [onStopResize]);
  const onStopResizeRight = useCallback(makeOnStopResize("right", onStopResize), [onStopResize]);

  return (
    <ReflexContainer orientation="vertical" windowResizeAware style={{ height, width }}>
      {left && (
        <ReflexElement minSize={minPaneWidth} onStopResize={onStopResizeLeft} flex={layout?.left}>
          <StyledLeftPane>{left}</StyledLeftPane>
        </ReflexElement>
      )}

      {left && <ReflexSplitter propagate style={{ backgroundColor: Colors.grey10 }} />}

      {center && (
        <ReflexElement
          minSize={minPaneWidth}
          maxSize={minPaneWidth + 200}
          onStopResize={onStopResizeCenter}
          flex={layout?.center}
        >
          <StyledPane>{center}</StyledPane>
        </ReflexElement>
      )}

      {center && <ReflexSplitter propagate={Boolean(left)} />}

      <ReflexElement minSize={minPaneWidth} onStopResize={onStopResizeRight}>
        <StyledPane>{right}</StyledPane>
      </ReflexElement>
    </ReflexContainer>
  );
};

export default ResizableColumnsPanel;

// Styled Components

const StyledPane = styled.div`
  position: relative;
  height: 100%;
  overflow-y: hidden;
`;

const StyledLeftPane = styled(StyledPane)`
  background-color: ${Colors.grey10};
`;

// Utils

const makeOnStopResize = (position: "left" | "center" | "right", onStopResize?: OnStopResize) => {
  return (args: HandlerProps) => {
    const flex = args.component.props.flex;

    if (flex && onStopResize) {
      onStopResize(position, flex);
    }
  };
};
