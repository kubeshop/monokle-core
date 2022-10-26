import { useCallback } from "react";
import { HandlerProps, ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";

type ResizableRowsPanelLayout = {
  top: number;
  bottom?: number;
};

type IProps = {
  top: React.ReactNode;
  bottom?: React.ReactNode;
  layout?: ResizableRowsPanelLayout;
  height?: number;
  width?: number;
  onStopResize?: (position: "top" | "bottom", flex: number) => void;
};

const ResizableRowsPanel: React.FC<IProps> = (props) => {
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
