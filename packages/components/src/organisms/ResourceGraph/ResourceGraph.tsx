import ReactFlow, {
  Controls,
  ControlButton,
  useNodesState,
  useEdgesState,
  ReactFlowInstance,
  OnSelectionChangeParams,
  Node,
} from 'reactflow';
import styled from 'styled-components';
import {useEffect, useMemo, useState, useRef, useCallback} from 'react';
import {Icon} from '@/atoms';
import {ResourceNode} from './ResourceNode';
import {CompactResourceNode} from './CompactResourceNode';
import {MiniMap} from './MiniMap';
import {FilterBar} from './FilterBar';
import {useKeyCombo} from './useKeyCombo';
import {useGetResourceGraph} from './useGetResourceGraph';
import {NodeType, ResourceGraphProps} from './types';
import {Colors} from '@/styles/Colors';
import {GraphContainer} from './styled';

export function ResourceGraph({
  resources,
  resourceMap,
  getProblemsForResource,
  onSelectResource = () => null,
  onSelectImage = () => null,
  elkWorker,
  defaultNamespace,
}: ResourceGraphProps) {
  const graphRef = useRef<HTMLDivElement>(null);
  const [nodeType, setNodeType] = useState(NodeType.None);
  const [graphHasChanged, setGraphHasChanged] = useState(true);

  const [filters, setFilters] = useState({
    namespaces: [] as string[],
    kinds: [] as string[],
    maxDepth: 5,
  });

  const {namespaces, kinds, maxDepth} = filters;

  const {initialNodes, initialEdges} = useGetResourceGraph(
    elkWorker,
    getProblemsForResource,
    resourceMap,
    resources,
    nodeType,
    namespaces,
    kinds,
    maxDepth
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const displayedNodeType = initialNodes[0]?.type || nodeType;

  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();

  const nodeTypes = useMemo(
    () => ({
      [NodeType.Expanded]: ResourceNode,
      [NodeType.Compact]: CompactResourceNode,
    }),
    []
  );

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setGraphHasChanged(true);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  useEffect(() => {
    if (graphHasChanged) {
      reactFlowInstance?.fitView({maxZoom: 1});
      setGraphHasChanged(false);
    }
  }, [graphHasChanged, reactFlowInstance, nodes]);

  useKeyCombo(
    ['Control', 'Equal'],
    e => {
      e.preventDefault();
      e.stopPropagation();
      reactFlowInstance?.zoomIn();
    },
    graphRef
  );

  useKeyCombo(
    ['Control', 'Minus'],
    e => {
      e.preventDefault();
      e.stopPropagation();
      reactFlowInstance?.zoomOut();
    },
    graphRef
  );

  const toggleCompact = useCallback(() => {
    if (displayedNodeType === NodeType.Compact) {
      setNodeType(NodeType.Expanded);
    } else if (displayedNodeType === NodeType.Expanded) {
      setNodeType(NodeType.Compact);
    }
  }, [displayedNodeType]);

  const [lastSelectedNode, setLastSelectedNode] = useState<Node>();

  const onSelectionChange = useCallback(
    ({nodes: selectedNodes}: OnSelectionChangeParams) => {
      if (selectedNodes.length === 1) {
        const node = selectedNodes[0];
        const nextResource = resourceMap[node.id];

        if (node === lastSelectedNode) {
          return;
        }

        setLastSelectedNode(node);

        if (nextResource) {
          onSelectResource(nextResource);
        }

        if (node.data.kind === 'Image') {
          onSelectImage(node.id);
        }
      }
    },
    [lastSelectedNode, resourceMap, onSelectResource, onSelectImage]
  );

  return (
    <GraphContainer>
      <Flow
        ref={graphRef}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onInit={setReactFlowInstance}
        nodesConnectable={false}
        onSelectionChange={onSelectionChange}
      >
        <FilterBar
          graphRef={graphRef}
          resources={resources}
          resourceMap={resourceMap}
          setFilters={setFilters}
          defaultNamespace={defaultNamespace}
        />
        <MiniMap />
        <Controls>
          <ControlButton onClick={toggleCompact}>
            <Icon name="compact-nodes" />
          </ControlButton>
        </Controls>
      </Flow>
    </GraphContainer>
  );
}

const Flow = styled(ReactFlow)`
  .react-flow__controls {
    button {
      border-radius: 50%;
      margin-top: 8px;
      background-color: ${Colors.grey3b};
      border-bottom-color: ${Colors.grey3b};
      color: ${Colors.blue7};
      stroke: ${Colors.blue7};
      fill: ${Colors.blue7};
    }
  }

  .react-flow__edge-path {
    stroke: ${Colors.grey7};
  }
`;

export default ResourceGraph;
