import { Handle, Position, NodeProps } from 'reactflow';
import 'reactflow/dist/base.css';
import styled from 'styled-components';
import { Space } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { MouseEvent, MouseEventHandler, useMemo } from 'react';
import { ActionsMenu, ValidationPopover } from '@/molecules';
import { useNodeMenuItems } from './useNodeMenuItem';
import { backgroundColourByKind, iconNamesByKind, InvisibleHandlesWrapper, KindIcon } from './styled';
import { getValidationLevel } from './helpers';
import { ResourceNodeData, ResourceNodeKind } from './types';
import { Colors } from '@/styles/Colors';

export function ResourceNode({
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

  return (
    <NodeWrapper $selected={selected}>
      <Handle type="target" position={Position.Left} />
      <NodeDetails>
        <ResourceKind $kind={data.kind}>
          <Space>
            <KindIcon name={iconNamesByKind[data.kind] || 'default-resource'} />
            {data.kind}
          </Space>
          <Clickable>
            <ActionsMenu
              menuItems={menuItems}
              show="always"
              target={MoreOutlined}
            />
          </Clickable>
        </ResourceKind>
        <ResourceName>
          <Clickable>
            <ValidationPopover
              level={level}
              disabled={false}
              results={warningsAndErrors}
            />
          </Clickable>
          {data.name}
        </ResourceName>
      </NodeDetails>
      <Handle type="source" position={Position.Right} />
    </NodeWrapper>
  );
}

const Clickable = styled.div.attrs({
  className: 'nodrag',
})`
  cursor: pointer;
`;

type NodeWrapperProps = {
  $selected: boolean;
};

const NodeWrapper = styled(InvisibleHandlesWrapper)<NodeWrapperProps>`
  background: ${Colors.whitePure};
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  width: 240px;
  height: 96px;
  box-sizing: content-box;
  background-color: rgba(0, 0, 0, 0);
  border: ${props => (props.$selected ? `3px solid ${Colors.blue6}` : `none`)};
  border-radius: 4px;
`;

const NodeDetails = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  border-radius: 4px;
  border: 1px solid ${Colors.grey3};
  width: 100%;
  margin: 0 0px;
`;

const ResourceKind = styled.div<{ $kind: ResourceNodeKind }>`
  background: ${props => backgroundColourByKind[props.$kind] || Colors.geekblue1};
  color: ${Colors.grey9};
  padding: 4px 0px 4px 8px;
  font-size: 12px;
  line-height: 15px;
  font-weight: 700;
  height: 48px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${Colors.grey3};
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const ResourceName = styled.div`
  background: ${Colors.grey1000};
  color: ${Colors.grey9};
  padding: 4px 8px;
  font-size: 12px;
  line-height: 15px;
  font-weight: 700;
  min-height: 48px;
  display: flex;
  align-items: center;
  display: flex;
  gap: 8px;
  word-break: break-all;
`;
