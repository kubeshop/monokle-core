import Colors from "@/styles/Colors";
import { Tooltip } from "antd";
import { useCallback } from "react";

import { ActivityBarItemProps } from "./types";

import * as S from "./ActivityBarItem.styled";
import { TOOLTIP_DELAY } from "@/constants";

/**
 * ActivityBarItem renders one of the icons in the ActivityBar and handles it's events.
 */
export function ActivityBarItem<ActivityName, ExtraActivityName>(
  props: ActivityBarItemProps<ActivityName, ExtraActivityName>
) {
  const { activity, isActivityBarActive, isSelected, onChange } = props;

  const badge = activity.useBadge();

  return (
    <S.ItemBox $isActive={isActivityBarActive} $isSelected={isSelected}>
      <Tooltip title={activity.tooltip} mouseEnterDelay={TOOLTIP_DELAY} placement="right">
        <S.Button $isSelected={isSelected} onClick={() => onChange(activity.name)}>
          <S.Badge count={badge?.count ?? 0} color={Colors.blue6} size={badge?.size} dot={badge?.dot ?? false}>
            {activity.icon(isSelected)}
          </S.Badge>
        </S.Button>
      </Tooltip>

      {activity.walkthrough}
    </S.ItemBox>
  );
}
