import { DropDownProps } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

export type ActivityMenuProps = {
  menuItems: ItemType[];
  show?: 'onFileListHover' | 'always';
  target?: React.FC;
  trigger?: DropDownProps['trigger'];
};
