export type ActivityType<ActivityName> = {
  type: "fullscreen" | "panel";
  name: ActivityName;
  tooltip: string;
  icon: (selected: boolean) => JSX.Element;
  component: JSX.Element;
  walkthrough?: JSX.Element;
};
