import { AnyAction } from "@reduxjs/toolkit";

export interface ItemInstance {
  id: string;
  sectionId: string;
  rootSectionId: string;
  treeNavigatorId: string;
  name: string;
  isSelected: boolean;
  isHighlighted: boolean;
  isVisible: boolean;
  isDirty: boolean;
  isDisabled: boolean;
  isCheckable: boolean;
  isChecked: boolean;
  isLast: boolean;
  meta?: any;
}

export interface SectionInstance {
  id: string;
  name: string;
  rootSectionId: string;
  treeNavigatorId: string;
  itemIds: string[];
  visibleItemIds: string[];
  visibleChildSectionIds?: string[];
  visibleDescendantItemIds?: string[];
  visibleDescendantSectionIds?: string[];
  isCollapsed: boolean;
  isLoading: boolean;
  isVisible: boolean;
  isInitialized: boolean;
  isSelected: boolean;
  isHighlighted: boolean;
  isEmpty: boolean;
  isLast: boolean;
  checkable?: {
    value: "unchecked" | "partial" | "checked";
    checkItemsAction: AnyAction;
    uncheckItemsAction: AnyAction;
  };
  meta?: any;
}
