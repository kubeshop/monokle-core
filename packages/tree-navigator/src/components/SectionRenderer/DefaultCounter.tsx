import React, { useMemo } from "react";

import { SectionCustomComponentProps } from "../../types";

import { useAppSelector } from "../../hooks";

import * as S from "./styled";
import { getTreeNavigatorById } from "../../core/treeNavigator";

function DefaultCounter({ sectionInstance, onClick }: SectionCustomComponentProps) {
  const { id, isSelected, treeNavigatorId } = sectionInstance;

  const sectionBlueprint = getTreeNavigatorById(treeNavigatorId)?.getSectionBlueprint(sectionInstance.id);
  const isCollapsed = useAppSelector((state) =>
    Boolean(state.treeNavigator.stateByTreeNavigatorId[treeNavigatorId]?.collapsedSectionIds.includes(id))
  );

  const resourceCount = useMemo(() => {
    const counterType = sectionBlueprint?.customization?.counter?.type;

    if (!counterType || counterType === "descendants") {
      return sectionInstance?.visibleDescendantItemIds?.length || 0;
    }
    if (counterType === "items") {
      return sectionInstance?.visibleItemIds.length;
    }
    if (counterType === "subsections") {
      return sectionInstance?.visibleChildSectionIds?.length || 0;
    }
    return undefined;
  }, [sectionInstance, sectionBlueprint]);

  if (resourceCount === undefined) {
    return null;
  }

  return (
    <S.Counter selected={isSelected && isCollapsed} onClick={onClick}>
      {resourceCount}
    </S.Counter>
  );
}

export default DefaultCounter;
