export type ActivityType<ActivityName> = {
  type: "fullscreen" | "panel";
  name: ActivityName;
  tooltip: string | JSX.Element;
  icon: (selected: boolean) => JSX.Element;
  component: JSX.Element;
  walkthrough?: JSX.Element;
  useBadge: () => { count: number; dot?: boolean; size?: "small" | "default" } | undefined;
};

export type ActivityBarProps<ActivityName> = {
  activities: ActivityType<ActivityName>[];
  isActive: boolean;
  value: ActivityName;
  onChange: (activityName: ActivityName) => void;
};

export type ActivityBarItemProps<ActivityName> = {
  activity: ActivityType<ActivityName>;
  isActive: boolean;
  isSelected: boolean;
  onChange: (activityName: ActivityName) => void;
};
