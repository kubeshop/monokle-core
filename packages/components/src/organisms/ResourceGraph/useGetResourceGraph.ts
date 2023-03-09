import ELKContructor, { ELK, ElkNode, ElkExtendedEdge } from 'elkjs/lib/elk-api';
import { useEffect, useMemo, useState } from 'react';
import { Node, Edge, Position } from 'reactflow';
import { Resource, ResourceMapType, RuleLevel, ValidationResult } from '@monokle/validation';
import { NodeType, ResourceNodeData } from './types';

type ResourceNode = Node<ResourceNodeData>;

export const useGetResourceGraph = (
  elkWorker: Worker,
  getProblemsForResource: (id: string, level: RuleLevel) => ValidationResult[],
  resourceMap: ResourceMapType,
  resources: Resource[],
  nodeType: NodeType,
  namespaces: string[],
  kinds: string[],
  maxDepth = 5,
) => {
  const [initialNodes, setInitialNodes] = useState<ResourceNode[]>([]);
  const [initialEdges, setInitialEdges] = useState<Edge[]>([]);

  const elk = useMemo(() => {
    return new ELKContructor({
      workerFactory() {
        return elkWorker;
      },
    });
  }, []);

  const elkGraph = useMemo(() => {
    return getElkGraph(
      elk,
      resources,
      resourceMap,
      nodeType,
      maxDepth,
      namespaces,
      kinds,
    );
  }, [resources, resourceMap, nodeType, maxDepth, namespaces, kinds]);

  useEffect(() => {
    elkGraph.then(graph => {
      if (graph.children && graph.edges) {
        setInitialNodes(graph.children.map(elkNodeToNode(resources, getProblemsForResource)));
        setInitialEdges(graph.edges.map(elkEdgeToEdge));
      }
    });
  }, [elkGraph]);

  return { initialNodes, initialEdges };
};

const elkNodeToNode = (resources: Resource[], getProblemsForResource: (id: string, level: RuleLevel) => ValidationResult[]) => (elkNode: ElkNode): ResourceNode => {
  const nameLabel = elkNode.labels?.find(label => label.id === 'name');
  const kindLabel = elkNode.labels?.find(label => label.id === 'kind');

  const data = {
    name: nameLabel?.text || elkNode.id,
    kind: kindLabel?.text || 'defaultResource',
    errors: getProblemsForResource(elkNode.id, 'error'),
    warnings: getProblemsForResource(elkNode.id, 'warning'),
  } as ResourceNodeData;

  return {
    id: elkNode.id,
    position: {
      x: elkNode.x || 0,
      y: elkNode.y || 0,
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data,
    width: elkNode.width,
    height: elkNode.height,
    type: elkNode.width === 240 ? NodeType.Expanded : NodeType.Compact,
    selected: resources.some(resource => resource.id === elkNode.id),
  };
};

const elkEdgeToEdge = (elkEdge: ElkExtendedEdge): Edge => ({
  id: elkEdge.id,
  source: elkEdge.sources[0],
  target: elkEdge.targets[0],
});

const getElkGraph = (
  elk: ELK,
  resources: Resource[],
  resourceMap: ResourceMapType,
  nodeType: NodeType,
  maxDepth: number,
  namespaces: string[],
  kinds: string[],
) => {
  const nodes: ElkNode[] = [];
  const edges: ElkExtendedEdge[] = [];

  let nodesToProcess = resources.map(resource => resource.id);
  const processedNodes = new Set();
  const seenEdges = new Set();

  const width = nodeType === NodeType.Compact ? 48 : 240;
  const height = nodeType === NodeType.Compact ? 48 : 96;

  for (let i = 0; i <= maxDepth; i++) {
    const nextNodesToProcess = [] as string[];

    nodesToProcess.forEach(source => {
      const sourceResource = resourceMap[source];

      if (!sourceResource) {
        return;
      }

      nodes.push({
        id: sourceResource.id,
        width,
        height,
        labels: [
          { id: 'name', text: sourceResource.name },
          { id: 'kind', text: sourceResource.kind },
          { id: 'namespace', text: sourceResource.namespace },
        ]
      });

      processedNodes.add(sourceResource.id);

      sourceResource.refs?.forEach(ref => {
        if (ref.target?.type === 'image') {
          const targetId = ref.target.tag ? `${ref.name}:${ref.target.tag}` : ref.name;
          const edgeId = `${sourceResource.id}:targetId`;
          const sources = [sourceResource.id];
          const targets = [targetId];

          if (!seenEdges.has(edgeId)) {
            edges.push({
              id: edgeId,
              sources,
              targets,
            });
          }

          if (!processedNodes.has(targetId)) {
            nodes.push({
              id: targetId,
              width,
              height,
              labels: [
                { id: 'kind', text: 'Image' },
                { id: 'name', text: targetId },
              ]
            });

            processedNodes.add(targetId);
          }

          seenEdges.add(edgeId);
          return;
        }

        if (ref.target?.type === 'resource' && ref.target.resourceId) {
          const targetResource = resourceMap[ref.target.resourceId];
          const targetProcessed = processedNodes.has(targetResource?.id);
          const finalIteration = i === maxDepth;
  
          if (
            !targetResource ||
            targetResource === sourceResource ||
            (finalIteration && !targetProcessed)
          ) {
            return;
          }
  
          const edgeId =
            ref.type === 'outgoing'
              ? `${sourceResource.id}:${targetResource.id}`
              : `${targetResource.id}:${sourceResource.id}`;
  
          const sources =
            ref.type === 'outgoing' ? [sourceResource.id] : [targetResource.id];
  
          const targets =
            ref.type === 'outgoing' ? [targetResource.id] : [sourceResource.id];
  
          if (!seenEdges.has(edgeId)) {
            edges.push({
              id: edgeId,
              sources,
              targets,
            });
            seenEdges.add(edgeId);
          }
  
          if (!targetProcessed && !nextNodesToProcess.includes(targetResource.id)) {
            nextNodesToProcess.push(targetResource.id);
          }
        }
      });
    });

    nodesToProcess = nextNodesToProcess;
  }

  if (nodes.length > 20 && nodeType === NodeType.None) {
    nodes.forEach(node => {
      node.width = 48;
      node.height = 48;
    });
  }

  const filteredNodes = nodes.filter(node => {
    const kind = node.labels?.find(label => label.id === 'kind')?.text;
    const namespace = node.labels?.find(label => label.id === 'namespace')?.text;

    const isMatchingKind = !kinds.length || (kind && kinds.includes(kind));
    const isMatchingNamespace =
      !namespaces.length || (namespace && namespaces.includes(namespace));
    
    return isMatchingKind && isMatchingNamespace;
  });

  const filteredEdges = edges.filter(edge => {
    const sourceId = edge.sources[0];
    const targetId = edge.targets[0];
    const sourceNodeExists = filteredNodes.some(node => node.id === sourceId);
    const targetNodeExists = filteredNodes.some(node => node.id === targetId);
    return sourceNodeExists && targetNodeExists;
  });

  return elk.layout({
    id: 'root',
    layoutOptions: {
      'elk.algorithm': 'layered',
    },
    children: filteredNodes,
    edges: filteredEdges,
  });
};
