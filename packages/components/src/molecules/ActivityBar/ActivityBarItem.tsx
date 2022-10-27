import Colors from "@/styles/Colors";
import { Tooltip } from "antd";
import { useCallback } from "react";

import { ActivityBarItemProps } from "./types";

import * as S from "./ActivityBarItem.styled";
import { TOOLTIP_DELAY } from "@/constants";

export function ActivityBarItem<ActivityName>(props: ActivityBarItemProps<ActivityName>) {
  const { activity, isActive, isSelected, onChange } = props;

  const badge = activity.useBadge();

  const toggle = useCallback(() => {
    if (isSelected) {
      return;
    }

    onChange(activity.name);
  }, [activity, isSelected]);

  return (
    <S.ItemBox isActive={isActive} isSelected={isSelected}>
      <Tooltip title={activity.tooltip} mouseEnterDelay={TOOLTIP_DELAY} placement="right">
        <S.Button $isSelected={isSelected} onClick={toggle}>
          <S.Badge count={badge?.count ?? 0} color={Colors.blue6} size={badge?.size} dot={badge?.dot ?? false}>
            {activity.icon(isSelected)}
          </S.Badge>
        </S.Button>
      </Tooltip>

      {activity.walkthrough}
    </S.ItemBox>
  );
}
