import { NodeProps, Handle, Position } from 'reactflow';
import 'reactflow/dist/base.css';
import styled from 'styled-components';
import { useCallback, useMemo } from 'react';
import { Space } from 'antd';
import { useNodeMenuItems } from './useNodeMenuItem';
import {
  backgroundColourByKind,
  iconNamesByKind,
  InvisibleHandlesWrapper,
  KindIcon,
} from './styled';
import { getValidationLevel } from './helpers';
import { ResourceNodeData, ResourceNodeKind } from './types';
import { Colors } from '@/styles/Colors';
import { ActionsMenu, ValidationPopover } from '@/molecules';

export function CompactResourceNode({
  id,
  data,
  xPos,
  yPos,
  selected,
}: NodeProps<ResourceNodeData>) {
  const menuItems = useNodeMenuItems(id, xPos, yPos);

  const { errors, warnings } = data;
  const level = getValidationLevel(errors, warnings);

  const warningsAndErrors = useMemo(
    () => [...errors, ...warnings],
    [errors, warnings]
  );

  const icon = useCallback(
    () => <KindIcon name={iconNamesByKind[data.kind] || 'default-resource'} />,
    [data.kind]
  );

  return (
    <NodeWrapper $kind={data.kind} $selected={selected}>
      <ValidationWrapper $level={level}>
        <Handle type="target" position={Position.Left} />
        <ValidationPopover
          level={level}
          disabled={false}
          results={warningsAndErrors}
          hideEmptyPopover={false}
          title={
            <Space>
              <KindName>{data.kind}</KindName>-<span>{data.name}</span>
            </Space>
          }
          popoverRenderItem={
            <div>
              <ActionsMenu
                menuItems={menuItems}
                show="always"
                trigger={['contextMenu']}
                target={icon}
              />
            </div>
          }
        />
        <Handle type="source" position={Position.Right} />
      </ValidationWrapper>
    </NodeWrapper>
  );
}

const borderColourByLevel: Record<string, string> = {
  both: Colors.redError,
  error: Colors.redError,
  warning: Colors.goldWarning,
  none: Colors.grey3,
};

type NodeWrapperProps = {
  $kind: ResourceNodeKind;
  $selected: boolean;
};

const NodeWrapper = styled(InvisibleHandlesWrapper)<NodeWrapperProps>`
  background-color: ${props =>
    backgroundColourByKind[props.$kind] || Colors.geekblue1} !important;
  border-radius: 50%;
  border: ${({ $selected }) => ($selected ? `3px solid ${Colors.blue6}` : '')};
`;

type ValidationWrapperProps = {
  $level: string;
};

const ValidationWrapper = styled.div<ValidationWrapperProps>`
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${({ $level }) =>
    `2px solid ${borderColourByLevel[$level] || borderColourByLevel['none']}`};
`;

const KindName = styled.span`
  font-weight: 700;
`;
