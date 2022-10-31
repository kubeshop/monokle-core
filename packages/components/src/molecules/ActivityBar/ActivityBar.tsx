import { ActivityBarItem } from "./ActivityBarItem";
import { ActivityBarProps } from "./types";

import * as S from "./ActivityBar.styled";

/**
 * ActivityBar is responsible for rendering icons in the left menu of the application.
 *
 * It uses the **activities** prop for the main icons at the top,
 * and **extraActivities** for the icons that are aligned on the bottom.
 *
 * **activities** and **extraActivities** are separated because we can have an active selection for both of them.
 * For example, you could have both the Explorer (top icon) and the Terminal (bottom icon) open.
 *
 * **value** will contain the name of the selected activity,
 * while **extraValue** will contain the name of the selected extraActivity
 */
export function ActivityBar<ActivityName extends string, ExtraActivityName extends string | undefined>(
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
              isActivityBarActive={isActive}
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
            isActivityBarActive={isActive}
            isSelected={extraValue === activity.name}
            onChange={onChangeExtra}
          />
        ))}
      </div>
    </S.BarBox>
  );
}
