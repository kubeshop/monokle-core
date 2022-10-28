import Colors from "@/styles/Colors";
import { Tooltip } from "antd";
import { useCallback } from "react";

import { ActivityBarItemProps } from "./types";

import * as S from "./ActivityBarItem.styled";
import { TOOLTIP_DELAY } from "@/constants";

/**
 * ActivityBarItem renders one of the icons in the ActivityBar and handles it's events.
 * 
 * The **isSelected** and **isActive** props are separated because we want to be able to persist the selection when the ActivityBar is closed.
 * One use-case for this would be the hotkey to open or close the left menu, which can only work if we know which panel was selected.
 */
export function ActivityBarItem<ActivityName, ExtraActivityName>(
  props: ActivityBarItemProps<ActivityName, ExtraActivityName>
) {
  const { activity, isActive, isSelected, onChange } = props;

  const badge = activity.useBadge();

  return (
    <S.ItemBox isActive={isActive} isSelected={isSelected}>
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
