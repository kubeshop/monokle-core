import BarPanel from "./BarPanel";

type IProps = {
  children: React.ReactNode;
};

const FullscreenPanel: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <BarPanel />
      {children}
    </>
  );
};

export default FullscreenPanel;
