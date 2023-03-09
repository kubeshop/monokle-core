import {ActivityMenuProps} from './types';

export const MainActionsMenuArgs: ActivityMenuProps = {
  menuItems: [
    { key: '1', label: 'View', onClick: () => console.log('View') },
  ],
  show: 'always',
};
