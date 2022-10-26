import { useCallback } from "react";
import { HandlerProps, ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";
import { ResizableRowsPanelType } from "./types";

const ResizableRowsPanel: React.FC<ResizableRowsPanelType> = (props) => {
  const { layout, height = "100%", width = "100%", top, bottom, onStopResize } = props;

  const makeOnStopResize = useCallback((position: "top" | "bottom") => {
    return (args: HandlerProps) => {
      const flex = args.component.props.flex;

      if (flex && onStopResize) {
        onStopResize(position, flex);
      }
    };
  }, []);

  return (
    <ReflexContainer windowResizeAware style={{ height, width }}>
      <ReflexElement flex={layout?.top} onStopResize={makeOnStopResize("top")}>
        {top}
      </ReflexElement>

      {bottom && <ReflexSplitter />}

      {bottom && (
        <ReflexElement minSize={200} maxSize={500} onStopResize={makeOnStopResize("bottom")}>
          {bottom}
        </ReflexElement>
      )}
    </ReflexContainer>
  );
};

export default ResizableRowsPanel;
