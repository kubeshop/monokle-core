import styled, { keyframes } from "styled-components";
import { Icon, IconNames } from '@/atoms';
import { ResourceNodeKind } from "./types";
import { Colors } from "@/styles/Colors";

export const iconNamesByKind: Partial<Record<ResourceNodeKind, IconNames>> = {
  Service: 'service',
  Deployment: 'deployment',
  Kustomization: 'kustomization',
  Role: 'role',
  Ingress: 'ingress',
  Namespace: 'namespace',
  Pod: 'pod',
  ClusterRole: 'cluster',
  ClusterRoleBinding: 'cluster',
  CustomResourceDefinition: 'custom-resource',
  Secret: 'secret',
  Image: 'image',
};

export const backgroundColourByKind: Partial<Record<ResourceNodeKind, string>> = {
  Service: Colors.geekblue1,
  Ingress: Colors.geekblue1,
  Role: Colors.geekblue1,
  Namespace: Colors.geekblue1,
  Deployment: Colors.geekblue3,
  Kustomization: Colors.cyan1,
  Pod: Colors.red2,
  ClusterRole: Colors.goldCluster,
  ClusterRoleBinding: Colors.goldCluster,
  Secret: Colors.blackPure,
  Image: Colors.imageGreen,
  CustomResourceDefinition: Colors.grey4,
};

export const KindIcon = styled(Icon)`
  height: 28px;
`;

export const InvisibleHandlesWrapper = styled.div`
  .react-flow__handle {
    visibility: hidden;
    width: 1px;
    min-width: 1px;
    max-width: 1px;
  }

  .react-flow__handle-right {
    right: 1px;
  }

  .react-flow__handle-left {
    left: 1px;
  }
`;

const dashdraw = keyframes`
  from {
    stroke-dashoffset: 10;
  }
`;

export const GraphContainer = styled.div`
  padding: 0 16px;
  width: 100%;
  height: 100%;

  // The below styles are taken from react-flow base.css
  .react-flow__container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .react-flow__pane {
    z-index: 1;
    cursor: -webkit-grab;
    cursor: grab;
  }
  .react-flow__pane.selection {
      cursor: pointer;
    }
  .react-flow__pane.dragging {
      cursor: -webkit-grabbing;
      cursor: grabbing;
    }
  .react-flow__viewport {
    transform-origin: 0 0;
    z-index: 2;
    pointer-events: none;
  }
  .react-flow__renderer {
    z-index: 4;
  }
  .react-flow__selection {
    z-index: 6;
  }
  .react-flow__nodesselection-rect:focus,
  .react-flow__nodesselection-rect:focus-visible {
    outline: none;
  }
  .react-flow .react-flow__edges {
    pointer-events: none;
    overflow: visible;
  }
  .react-flow__edge-path,
  .react-flow__connection-path {
    stroke: #b1b1b7;
    stroke-width: 1;
    fill: none;
  }
  .react-flow__edge {
    pointer-events: visibleStroke;
    cursor: pointer;
  }
  .react-flow__edge.animated path {
      stroke-dasharray: 5;
      -webkit-animation: ${dashdraw} 0.5s linear infinite;
              animation: ${dashdraw} 0.5s linear infinite;
    }
  .react-flow__edge.animated path.react-flow__edge-interaction {
      stroke-dasharray: none;
      -webkit-animation: none;
              animation: none;
    }
  .react-flow__edge.inactive {
      pointer-events: none;
    }
  .react-flow__edge.selected,
    .react-flow__edge:focus,
    .react-flow__edge:focus-visible {
      outline: none;
    }
  .react-flow__edge.selected .react-flow__edge-path,
    .react-flow__edge:focus .react-flow__edge-path,
    .react-flow__edge:focus-visible .react-flow__edge-path {
      stroke: #555;
    }
  .react-flow__edge-textwrapper {
      pointer-events: all;
    }
  .react-flow__edge-textbg {
      fill: white;
    }
  .react-flow__edge .react-flow__edge-text {
      pointer-events: none;
      -webkit-user-select: none;
        -moz-user-select: none;
              user-select: none;
    }
  .react-flow__connection {
    pointer-events: none;
  }
  .react-flow__connection .animated {
      stroke-dasharray: 5;
      -webkit-animation: ${dashdraw} 0.5s linear infinite;
              animation: ${dashdraw} 0.5s linear infinite;
    }
  .react-flow__connectionline {
    z-index: 1001;
  }
  .react-flow__nodes {
    pointer-events: none;
    transform-origin: 0 0;
  }
  .react-flow__node {
    position: absolute;
    -webkit-user-select: none;
      -moz-user-select: none;
            user-select: none;
    pointer-events: all;
    transform-origin: 0 0;
    box-sizing: border-box;
    cursor: -webkit-grab;
    cursor: grab;
  }
  .react-flow__node.dragging {
      cursor: -webkit-grabbing;
      cursor: grabbing;
    }
  .react-flow__nodesselection {
    z-index: 3;
    transform-origin: left top;
    pointer-events: none;
  }
  .react-flow__nodesselection-rect {
      position: absolute;
      pointer-events: all;
      cursor: -webkit-grab;
      cursor: grab;
    }
  .react-flow__handle {
    position: absolute;
    pointer-events: none;
    min-width: 5px;
    min-height: 5px;
    background-color: #333;
  }
  .react-flow__handle.connectable {
      pointer-events: all;
      cursor: crosshair;
    }
  .react-flow__handle-bottom {
      top: auto;
      left: 50%;
      bottom: -4px;
      transform: translate(-50%, 0);
    }
  .react-flow__handle-top {
      left: 50%;
      top: -4px;
      transform: translate(-50%, 0);
    }
  .react-flow__handle-left {
      top: 50%;
      left: -4px;
      transform: translate(0, -50%);
    }
  .react-flow__handle-right {
      right: -4px;
      top: 50%;
      transform: translate(0, -50%);
    }
  .react-flow__edgeupdater {
    cursor: move;
    pointer-events: all;
  }
  .react-flow__panel {
    position: absolute;
    z-index: 5;
    margin: 15px;
  }
  .react-flow__panel.top {
      top: 0;
    }
  .react-flow__panel.bottom {
      bottom: 0;
    }
  .react-flow__panel.left {
      left: 0;
    }
  .react-flow__panel.right {
      right: 0;
    }
  .react-flow__panel.center {
      left: 50%;
      transform: translateX(-50%);
    }
  .react-flow__attribution {
    font-size: 10px;
    background: rgba(255, 255, 255, 0.5);
    padding: 2px 3px;
    margin: 0;
  }
  .react-flow__attribution a {
    text-decoration: none;
    color: #999;
  }
  .react-flow__edgelabel-renderer {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    -webkit-user-select: none;
      -moz-user-select: none;
            user-select: none;
  }
  .react-flow__node-default,
  .react-flow__node-input,
  .react-flow__node-output,
  .react-flow__node-group {
    border-width: 1px;
    border-style: solid;
    border-color: #bbb;
  }
  .react-flow__node-default.selected,
    .react-flow__node-default:focus,
    .react-flow__node-default:focus-visible,
    .react-flow__node-input.selected,
    .react-flow__node-input:focus,
    .react-flow__node-input:focus-visible,
    .react-flow__node-output.selected,
    .react-flow__node-output:focus,
    .react-flow__node-output:focus-visible,
    .react-flow__node-group.selected,
    .react-flow__node-group:focus,
    .react-flow__node-group:focus-visible {
      outline: none;
      border: 1px solid #555;
    }
  .react-flow__nodesselection-rect,
  .react-flow__selection {
    background: rgba(150, 150, 180, 0.1);
    border: 1px dotted rgba(155, 155, 155, 0.8);
  }
  .react-flow__controls {
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.08);
  }
  .react-flow__controls-button {
      border: none;
      background: #fefefe;
      border-bottom: 1px solid #eee;
      box-sizing: content-box;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 16px;
      height: 16px;
      cursor: pointer;
      -webkit-user-select: none;
        -moz-user-select: none;
              user-select: none;
      padding: 5px;
    }
  .react-flow__controls-button:hover {
        background: #f4f4f4;
      }
  .react-flow__controls-button svg {
        width: 100%;
        max-width: 12px;
        max-height: 12px;
      }
  .react-flow__minimap {
    background-color: #fff;
  }
`;