import {Icon} from '@/atoms';
import {Colors} from '@/styles/Colors';
import {ActivityBarProps} from './types';

export const MainActivityBarArgs: ActivityBarProps<string> = {
  activities: [
    {
      type: 'panel',
      name: 'explorer',
      tooltip: 'File Explorer',
      icon: () => <Icon name="explorer" color={Colors.grey9} />,
      component: <div>File Pane</div>,
      useBadge: () => undefined,
    },
    {
      type: 'panel',
      name: 'kustomize',
      tooltip: 'Kustomize',
      icon: () => <Icon name="kustomize" color={Colors.grey9} />,
      component: <div>Kustomize Pane</div>,
      useBadge: () => ({count: 9, size: 'small'}),
    },
    {
      type: 'panel',
      name: 'helm',
      tooltip: 'Helm',
      icon: () => <Icon name="helm" color={Colors.grey9} />,
      component: <div>Helm Pane</div>,
      useBadge: () => ({count: 1, dot: true}),
    },
  ],
  isActive: true,
  value: 'explorer',
  onChange: () => {},
};

export const ExtraActivityBarArgs: ActivityBarProps<
  string,
  string | undefined
> = {
  activities: [
    {
      type: 'panel',
      name: 'explorer',
      tooltip: 'File Explorer',
      icon: () => <Icon name="explorer" color={Colors.grey9} />,
      component: <div>File Pane</div>,
      useBadge: () => undefined,
    },
    {
      type: 'panel',
      name: 'kustomize',
      tooltip: 'Kustomize',
      icon: () => <Icon name="kustomize" color={Colors.grey9} />,
      component: <div>Kustomize Pane</div>,
      useBadge: () => ({count: 9, size: 'small'}),
    },
    {
      type: 'panel',
      name: 'helm',
      tooltip: 'Helm',
      icon: () => <Icon name="helm" color={Colors.grey9} />,
      component: <div>Helm Pane</div>,
      useBadge: () => ({count: 1, dot: true}),
    },
  ],
  extraActivities: [
    {
      type: 'panel',
      name: 'terminal',
      tooltip: 'Terminal',
      icon: () => <Icon name="terminal" color={Colors.grey9} />,
      component: <div>Terminal</div>,
      useBadge: () => undefined,
    },
  ],
  isActive: true,
  value: 'kustomize',
  onChange: () => {},
  onChangeExtra: () => {},
};

export const HiddenOptionsActivityBarArgs: ActivityBarProps<string> = {
  activities: [
    {
      type: 'panel',
      name: 'explorer',
      tooltip: 'File Explorer',
      icon: () => <Icon name="explorer" color={Colors.grey9} />,
      component: <div>File Pane</div>,
      useBadge: () => undefined,
    },
    {
      type: 'panel',
      name: 'kustomize',
      tooltip: 'Kustomize',
      icon: () => <Icon name="kustomize" color={Colors.grey9} />,
      component: <div>Kustomize Pane</div>,
      useBadge: () => ({count: 9, size: 'small'}),
    },
    {
      type: 'panel',
      name: 'helm',
      tooltip: 'Helm',
      icon: () => <Icon name="helm" color={Colors.grey9} />,
      component: <div>Helm Pane</div>,
      useBadge: () => ({count: 1, dot: true}),
      isVisible: () => false,
    },
  ],
  isActive: true,
  value: 'explorer',
  onChange: () => {},
};
