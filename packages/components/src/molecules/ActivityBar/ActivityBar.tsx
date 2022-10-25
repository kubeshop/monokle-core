import { ActivityBarItem } from './ActivityBarItem';
import { ActivityType } from './types';

import * as S from './ActivityBar.styled'

type Props = {
  value: ActivityType | undefined;
  activities: ActivityType[];
  onChange: (activity: ActivityType | undefined) => void;
};

export function ActivityBar({ value, activities, onChange }: Props) {
  const isActive = value !== undefined;

  return (
    <S.BarBox $isActive={isActive}>
      {activities.map(activity => {
        return (
          <ActivityBarItem
            key={activity.name}
            activity={activity}
            isActive={isActive}
            isSelected={value?.name === activity.name}
            onChange={onChange}
          />
        );
      })}
    </S.BarBox>
  );
}


