import { Colors } from '@/styles/Colors';
import { MiniMap as RFMniMap, Node } from 'reactflow';
import { backgroundColourByKind } from './styled';
import { ResourceNodeData } from './types';

const getNodeColor = (node: Node<ResourceNodeData>) => {
  const { kind } = node.data;
  return backgroundColourByKind[kind] || Colors.geekblue1;
};

export function MiniMap() {
  return (
    <RFMniMap
      pannable
      zoomable
      style={{ backgroundColor: Colors.backgroundGrey }}
      maskColor="rgba(35, 45, 48, 0.4)"
      nodeColor={getNodeColor}
      nodeStrokeColor={Colors.grey3}
    />
  );
}
