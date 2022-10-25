import Colors from '@/styles/Colors';
import { Tooltip } from 'antd';
import { useCallback } from 'react';

import { ActivityType } from './types';

import * as S from './ActivityBarItem.styled'

type Props = {
  activity: ActivityType;
  showBadge?: boolean;
  isActive?: boolean;
  isSelected?: boolean;
  onChange: (activity: ActivityType | undefined) => void;
};

interface GetColorParams {
  isSelected: boolean;
  isActive?: boolean;
  isHighlighted?: boolean;
}

export function ActivityBarItem({
  activity,
  showBadge = false,
  isActive = false,
  isSelected = false,
  onChange,
}: Props) {
  const toggle = useCallback(() => {
    onChange(isSelected ? undefined : activity);
  }, [activity, isSelected]);

  return (
    <S.ItemBox isActive={isActive} isSelected={isSelected}>
      <Tooltip
        title={activity.tooltip}
        mouseEnterDelay={0.75}
        placement="right"
      >
        <S.Button $isSelected={isSelected} onClick={toggle}>
          <S.Badge
            count={showBadge ? 1 : 0}
            color={Colors.blue6}
            size="default"
            dot
          >
            {activity.icon(isSelected)}
          </S.Badge>
        </S.Button>
      </Tooltip>

      {activity.walkthrough}
    </S.ItemBox>
  );
}