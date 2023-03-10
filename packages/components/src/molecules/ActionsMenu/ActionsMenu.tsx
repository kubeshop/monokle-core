import styled from 'styled-components';
import { Menu, Dropdown } from 'antd';
import { Dots } from '@/atoms';
import { ActivityMenuProps } from './types';

export default function ActionsMenu({
  menuItems,
  show = 'onFileListHover',
  target: Target = Dots,
  trigger = ['click'],
}: ActivityMenuProps) {
  const Wrapper =
    show === 'onFileListHover' ? FileListHover : ActionMenuDropDown;

  return (
    <Wrapper
      overlay={<Menu items={menuItems} />}
      trigger={trigger}
    >
      <div onClick={e => e.stopPropagation()}>
        <Target />
      </div>
    </Wrapper>
  );
}

const ActionMenuDropDown = styled(Dropdown)`
  padding: 0 8px;
  align-self: stretch;
  display: flex;
  align-items: center;
`;

const FileListHover = styled(ActionMenuDropDown)`
  visibility: hidden;

  .ant-tree-treenode:hover & {
    visibility: visible;
  }
`;
