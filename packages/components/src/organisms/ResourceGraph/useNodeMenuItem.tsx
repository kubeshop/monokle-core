import { useReactFlow } from 'reactflow';
import { useCallback, useMemo, useState } from 'react';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

export const useNodeMenuItems = (id: string, xPos = 0, yPos = 0) => {
  const reactFlowInstance = useReactFlow();
  const [showFocusAll, setShowFocusAll] = useState(false);

  const focusThis = useCallback(() => {
    const edges = reactFlowInstance?.getEdges();
    const nextEdges = edges?.map(edge => {
      if (![edge.source, edge.target].includes(id)) {
        return {
          ...edge,
          hidden: true,
        };
      }
      return {
        ...edge,
        hidden: false,
      };
    });
    reactFlowInstance?.setEdges(nextEdges);
    setShowFocusAll(true);
  }, [reactFlowInstance]);

  const focusAll = useCallback(() => {
    const edges = reactFlowInstance?.getEdges();
    const nextEdges = edges?.map(edge => {
      return {
        ...edge,
        hidden: false,
      };
    });
    reactFlowInstance?.setEdges(nextEdges);
    setShowFocusAll(false);
  }, [reactFlowInstance]);

  const focusSourceEdges = useCallback(() => {
    const edges = reactFlowInstance?.getEdges();
    const nextEdges = edges?.map(edge => {
      if (edge.source !== id) {
        return {
          ...edge,
          hidden: true,
        };
      }
      return {
        ...edge,
        hidden: false,
      };
    });
    reactFlowInstance?.setEdges(nextEdges);
    setShowFocusAll(true);
  }, [reactFlowInstance]);

  const focusTargetEdges = useCallback(() => {
    const edges = reactFlowInstance?.getEdges();
    const nextEdges = edges?.map(edge => {
      if (edge.target !== id) {
        return {
          ...edge,
          hidden: true,
        };
      }
      return {
        ...edge,
        hidden: false,
      };
    });
    reactFlowInstance?.setEdges(nextEdges);
    setShowFocusAll(true);
  }, [reactFlowInstance]);

  const zoomIn = useCallback(() => {
    reactFlowInstance?.zoomIn();
  }, [reactFlowInstance]);

  const zoomOut = useCallback(() => {
    reactFlowInstance?.zoomOut();
  }, [reactFlowInstance]);

  const center = useCallback(() => {
    reactFlowInstance?.setCenter(xPos, yPos, {
      zoom: 1,
      duration: 100,
    });
  }, [reactFlowInstance, xPos, yPos]);

  const firstMenuItem = useMemo(() => showFocusAll
    ? { key: 1, label: 'Show all', onClick: focusAll }
    : { key: 1, label: 'Focus this', onClick: focusThis }
  , [showFocusAll, focusAll, focusThis]);

  const menuItems: ItemType[] = useMemo(
    () => [
      firstMenuItem,
      {
        key: 2,
        label: 'Inbound links only',
        onClick: focusTargetEdges,
      },
      {
        key: 3,
        label: 'Outbound links only',
        onClick: focusSourceEdges,
      },
      // { key: 4, label: 'This type only', onClick: hideOtherNodeTypes },
      { type: 'divider' },
      { key: 5, label: 'Zoom in (Ctrl +)', onClick: zoomIn },
      { key: 6, label: 'Zoom out (Ctrl -)', onClick: zoomOut },
      { key: 7, label: 'Zoom in to this element', onClick: center },
    ],
    [firstMenuItem, focusSourceEdges, focusTargetEdges, zoomIn, zoomOut, center]
  );

  return menuItems;
};
