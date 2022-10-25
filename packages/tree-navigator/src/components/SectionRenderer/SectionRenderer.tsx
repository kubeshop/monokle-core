import { useCallback, useMemo, useState } from "react";

import { TreeNavigatorRowSection, SectionCustomComponent } from "../../types";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { collapseSectionIds, expandSectionIds } from "../../slice";

import DefaultCounter from "./DefaultCounter";
import { useSectionCustomization } from "./hooks";

import * as S from "./styled";
import { getTreeNavigatorById } from "../../core/treeNavigator";

interface SectionRendererProps {
  sectionRow: TreeNavigatorRowSection;
}

function SectionRenderer(props: SectionRendererProps) {
  const { sectionRow } = props;
  const { sectionId, treeNavigatorId } = sectionRow;
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const sectionBlueprint = useMemo(
    () => getTreeNavigatorById(treeNavigatorId)?.getSectionBlueprint(sectionId),
    [sectionId]
  );
  const sectionInstance = useAppSelector(
    (state) => state.treeNavigator.stateByTreeNavigatorId[treeNavigatorId]?.sectionInstanceMap[sectionId]
  );

  const { customRow, customPrefix, customSuffix, customContextMenu, customCounter } = useSectionCustomization(
    sectionBlueprint?.customization
  );

  const Counter: SectionCustomComponent = useMemo(() => customCounter.Component ?? DefaultCounter, [customCounter]);

  const onCheck = useCallback(() => {
    if (!sectionInstance) {
      return;
    }
    if (!sectionInstance.checkable || !sectionInstance.visibleDescendantItemIds) {
      return;
    }
    if (sectionInstance.checkable.value === "unchecked" || sectionInstance.checkable.value === "partial") {
      dispatch(sectionInstance.checkable.checkItemsAction);
      return;
    }
    if (sectionInstance.checkable.value === "checked") {
      dispatch(sectionInstance.checkable.uncheckItemsAction);
    }
  }, [sectionInstance, dispatch]);

  const expandSection = useCallback(() => {
    if (!sectionInstance?.id) {
      return;
    }
    if (!sectionInstance?.visibleDescendantSectionIds || sectionInstance.visibleDescendantSectionIds.length === 0) {
      dispatch(expandSectionIds({ treeNavigatorId, sectionIds: [sectionInstance.id] }));
    } else {
      dispatch(
        expandSectionIds({
          treeNavigatorId,
          sectionIds: [sectionInstance.id, ...sectionInstance.visibleDescendantSectionIds],
        })
      );
    }
  }, [sectionInstance?.id, sectionInstance?.visibleDescendantSectionIds, dispatch]);

  const collapseSection = useCallback(() => {
    if (!sectionInstance?.id) {
      return;
    }
    if (!sectionInstance?.visibleDescendantSectionIds || sectionInstance.visibleDescendantSectionIds.length === 0) {
      dispatch(collapseSectionIds({ treeNavigatorId, sectionIds: [sectionInstance?.id] }));
    } else {
      dispatch(
        collapseSectionIds({
          treeNavigatorId,
          sectionIds: [sectionInstance?.id, ...sectionInstance.visibleDescendantSectionIds],
        })
      );
    }
  }, [sectionInstance?.id, sectionInstance?.visibleDescendantSectionIds, dispatch]);

  const toggleCollapse = useCallback(() => {
    if (!sectionInstance) {
      return;
    }
    if (sectionInstance.isCollapsed) {
      expandSection();
    } else {
      collapseSection();
    }
  }, [expandSection, collapseSection, sectionInstance?.isCollapsed]);

  if (!sectionBlueprint || !sectionInstance) {
    return null;
  }

  return (
    <S.SectionContainer
      $isHovered={isHovered}
      $disableHoverStyle={Boolean(sectionBlueprint.customization?.row?.disableHoverStyle)}
      $isSelected={Boolean(sectionInstance.isSelected && sectionInstance.isCollapsed)}
      $isHighlighted={Boolean(sectionInstance.isHighlighted && sectionInstance.isCollapsed)}
      $isInitialized={Boolean(sectionInstance.isInitialized)}
      $isSectionCheckable={Boolean(sectionBlueprint.instanceBuilder?.makeCheckable)}
      $hasCustomRow={Boolean(customRow.Component)}
      $marginBottom={sectionRow.marginBottom}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <S.NameContainer
        $isHovered={isHovered}
        $isCheckable={Boolean(sectionBlueprint.instanceBuilder?.makeCheckable)}
        $hasCustomRow={Boolean(customRow.Component)}
        $indentation={sectionRow.indentation}
      >
        {sectionInstance.checkable &&
          sectionInstance.isInitialized &&
          (sectionBlueprint.customization?.checkbox?.isVisibleOnHover
            ? sectionInstance.checkable.value === "partial" ||
              sectionInstance.checkable.value === "checked" ||
              isHovered
            : true) && (
            <span>
              <S.Checkbox
                checked={sectionInstance.checkable.value === "checked"}
                type="checkbox"
                // indeterminate={sectionInstance.checkable.value === "partial"}
                onChange={() => onCheck()}
              />
            </span>
          )}
        {customRow.Component ? (
          <customRow.Component sectionInstance={sectionInstance} onClick={toggleCollapse} />
        ) : (
          <>
            {customPrefix.Component && (
              <customPrefix.Component sectionInstance={sectionInstance} onClick={toggleCollapse} />
            )}
            <S.Name
              $isSelected={sectionInstance.isSelected && sectionInstance.isCollapsed}
              $isHighlighted={sectionInstance.isSelected && sectionInstance.isCollapsed}
              $isCheckable={Boolean(sectionInstance.checkable)}
              $fontSize={sectionRow.fontSize}
              onClick={toggleCollapse}
            >
              {sectionInstance.name}
            </S.Name>
            <Counter sectionInstance={sectionInstance} onClick={toggleCollapse} />

            <S.BlankSpace $height={sectionRow.height} onClick={toggleCollapse} />

            {customSuffix.Component &&
              (sectionBlueprint.customization?.suffix?.isVisibleOnHover ? isHovered : true) && (
                <customSuffix.Component sectionInstance={sectionInstance} onClick={toggleCollapse} />
              )}
          </>
        )}
      </S.NameContainer>
      <S.CustomContextMenuContainer>
        {!customRow.Component && customContextMenu.Component && (
          <customContextMenu.Component sectionInstance={sectionInstance} onClick={toggleCollapse} />
        )}
      </S.CustomContextMenuContainer>
    </S.SectionContainer>
  );
}

export default SectionRenderer;
