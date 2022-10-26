import { ActivityBarItem } from "./ActivityBarItem";
import { ActivityBarProps } from "./types";

import * as S from "./ActivityBar.styled";

export function ActivityBar<ActivityName extends string>(props: ActivityBarProps<ActivityName>) {
  const { activities, isActive, value, onChange } = props;

  return (
    <S.BarBox $isActive={isActive}>
      {activities.map((activity) => {
        return (
          <ActivityBarItem
            key={activity.name}
            activity={activity}
            isActive={isActive}
            isSelected={value === activity.name}
            onChange={onChange}
          />
        );
      })}
    </S.BarBox>
  );
}
