import React, { useCallback, useMemo, useState } from "react";

import { TreeNavigatorRowItem, SectionInstance } from "../../types";

import { useAppDispatch, useAppSelector } from "../../hooks";

import { useItemCustomization } from "./hooks";

import * as S from "./styled";
import { getTreeNavigatorById } from "../../core/treeNavigator";

export type ItemRendererProps = {
  itemRow: TreeNavigatorRowItem;
};

function ItemRenderer(props: ItemRendererProps) {
  const { itemRow } = props;
  const { treeNavigatorId, itemId } = itemRow;
  const sectionId = itemRow.sectionId;

  const sectionBlueprint = useMemo(
    () => getTreeNavigatorById(treeNavigatorId)?.getSectionBlueprint(sectionId),
    [sectionId]
  );
  const enableCheckboxes = Boolean(sectionBlueprint?.options?.enableCheckboxes);
  const { items: itemsBuilder } = sectionBlueprint || {};
  const itemsEvents = itemsBuilder?.events;

  const dispatch = useAppDispatch();
  const itemInstance = useAppSelector(
    (state) => state.treeNavigator.stateByTreeNavigatorId[treeNavigatorId]?.itemInstanceMap[itemId]
  );
  const isSectionCheckable = useAppSelector((state) => {
    const sectionInstance: SectionInstance | undefined =
      state.treeNavigator.stateByTreeNavigatorId[treeNavigatorId]?.sectionInstanceMap[sectionId];
    return Boolean(sectionInstance?.checkable);
  });

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const { customPrefix, customSuffix, customQuickAction, customContextMenu, customRow } = useItemCustomization(
    itemsBuilder?.customization,
    isHovered
  );

  const onClick = useCallback(() => {
    if (!itemInstance) {
      return;
    }
    if (itemsEvents?.onClick && !itemInstance.isDisabled) {
      itemsEvents.onClick(itemInstance, dispatch);
    }
  }, [itemsEvents, itemInstance, dispatch]);

  const onCheck = useCallback(() => {
    if (!itemInstance) {
      return;
    }
    if (itemsEvents?.onCheck && !itemInstance.isDisabled) {
      itemsEvents.onCheck(itemInstance, dispatch);
    }
  }, [itemsEvents, itemInstance, dispatch]);

  if (!itemInstance) {
    return null;
  }

  return (
    <div style={{ width: "100%", marginBottom: itemRow.marginBottom, height: itemRow.height }}>
      <S.ItemContainer
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        $isSelected={itemInstance.isSelected}
        $isHighlighted={itemInstance.isHighlighted}
        $disableHoverStyle={Boolean(itemsBuilder?.customization?.row?.disableHoverStyle)}
        $isHovered={isHovered}
        $hasOnClick={Boolean(itemsEvents?.onClick)}
        $indentation={itemRow.indentation}
        $isSectionCheckable={isSectionCheckable}
        $hasCustomRow={Boolean(customRow.Component)}
      >
        {enableCheckboxes &&
          (itemsBuilder?.customization?.checkbox?.isVisibleOnHover ? itemInstance.isChecked || isHovered : true) && (
            <span>
              <S.Checkbox
                checked={itemInstance.isChecked}
                disabled={itemInstance.isDisabled}
                onChange={() => onCheck()}
              />
            </span>
          )}

        {customPrefix.Component && customPrefix.isVisible && (
          <S.PrefixContainer>
            <customPrefix.Component itemInstance={itemInstance} />
          </S.PrefixContainer>
        )}

        {customRow.Component ? (
          <customRow.Component itemInstance={itemInstance} />
        ) : (
          <S.ItemName
            $isSelected={itemInstance.isSelected}
            $isDirty={itemInstance.isDirty}
            $isHighlighted={itemInstance.isHighlighted}
            $isDisabled={itemInstance.isDisabled}
            onClick={onClick}
          >
            {itemInstance.name}
            {itemInstance.isDirty && <span>*</span>}
          </S.ItemName>
        )}

        {customSuffix.Component && customSuffix.isVisible && (
          <S.SuffixContainer>
            <customSuffix.Component itemInstance={itemInstance} />
          </S.SuffixContainer>
        )}

        <S.BlankSpace onClick={onClick} />

        {customQuickAction.Component && customQuickAction.isVisible && (
          <S.QuickActionContainer>
            <customQuickAction.Component itemInstance={itemInstance} />
          </S.QuickActionContainer>
        )}
        {customContextMenu.Component && customContextMenu.isVisible && (
          <S.ContextMenuContainer>
            <customContextMenu.Component itemInstance={itemInstance} />
          </S.ContextMenuContainer>
        )}
      </S.ItemContainer>
    </div>
  );
}

export default ItemRenderer;
