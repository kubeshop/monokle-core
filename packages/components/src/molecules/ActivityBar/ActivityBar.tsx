import { ActivityBarItem } from "./ActivityBarItem";
import { ActivityBarProps } from "./types";

import * as S from "./ActivityBar.styled";

export function ActivityBar<ActivityName extends string, ExtraActivityName extends string>(
  props: ActivityBarProps<ActivityName, ExtraActivityName>
) {
  const { activities, isActive, style = {}, value, onChange } = props;
  const { extraActivities = [], extraValue = "", onChangeExtra = () => {} } = props;

  return (
    <S.BarBox $isActive={isActive} style={style}>
      <div>
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
      </div>

      <div>
        {extraActivities.map((activity) => (
          <ActivityBarItem
            key={activity.name}
            activity={activity}
            isActive={isActive}
            isSelected={extraValue === activity.name}
            onChange={onChangeExtra}
          />
        ))}
      </div>
    </S.BarBox>
  );
}
