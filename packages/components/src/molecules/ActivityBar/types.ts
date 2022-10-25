export type ActivityName =
  | 'explorer'
  | 'pulls'
  | 'kustomize'
  | 'validation'
  | 'helm'
  | 'images';

export type ActivityType = {
  type: 'fullscreen' | 'panel';
  name: ActivityName;
  tooltip: string;
  icon: (selected: boolean) => JSX.Element;
  component: JSX.Element;
  walkthrough?: JSX.Element;
};