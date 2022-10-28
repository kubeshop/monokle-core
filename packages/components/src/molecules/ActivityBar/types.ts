import React from "react";

export type ActivityType<ActivityName> = {
  component: JSX.Element;
  name: ActivityName;
  tooltip: string | JSX.Element;
  type: "fullscreen" | "panel";
  walkthrough?: JSX.Element;
  icon: (selected: boolean) => JSX.Element;
  useBadge: () => { count: number; dot?: boolean; size?: "small" | "default" } | undefined;
};

export type ActivityBarProps<ActivityName, ExtraActivityName = any> = {
  activities: ActivityType<ActivityName>[];
  isActive: boolean;
  /**
   * Currently selected activity
   */
  value: ActivityName;
  /**
   * Activities that will be shown at the bottom of the bar
   */
  extraActivities?: ActivityType<ExtraActivityName>[];
  /**
   * Currently selected bottom activity
   */
  extraValue?: ExtraActivityName;
  style?: React.CSSProperties;
  onChange: (activityName: ActivityName) => void;
  onChangeExtra?: (activityName: ExtraActivityName) => void;
};

export type ActivityBarItemProps<ActivityName, ExtraActivityName = any> = {
  activity: ActivityType<ActivityName> | ActivityType<ExtraActivityName>;
  isActive: boolean;
  isSelected: boolean;
  onChange: (activityName: ActivityName | ExtraActivityName) => void;
};
