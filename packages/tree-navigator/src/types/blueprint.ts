import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { ItemCustomization, RowBuilder, SectionCustomization } from "./customization";
import { ItemInstance, SectionInstance } from "./instance";

export interface ItemBlueprint<RawItemType, ScopeType> {
  getName: (rawItem: RawItemType, scope: ScopeType) => string;
  getInstanceId: (rawItem: RawItemType, scope: ScopeType) => string;
  rowBuilder?: RowBuilder<ItemInstance, { sectionInstance: SectionInstance }>;
  instanceBuilder?: {
    isSelected?: (rawItem: RawItemType, scope: ScopeType) => boolean;
    isHighlighted?: (rawItem: RawItemType, scope: ScopeType) => boolean;
    isVisible?: (rawItem: RawItemType, scope: ScopeType) => boolean;
    isDirty?: (rawItem: RawItemType, scope: ScopeType) => boolean;
    isDisabled?: (rawItem: RawItemType, scope: ScopeType) => boolean;
    isCheckable?: (rawItem: RawItemType, scope: ScopeType) => boolean;
    isChecked?: (rawItem: RawItemType, scope: ScopeType) => boolean;
    getMeta?: (rawItem: RawItemType, scope: ScopeType) => any;
  };
  instanceHandler?: {
    onClick?: (itemInstance: ItemInstance, dispatch: any) => void;
    onCheck?: (itemInstance: ItemInstance, dispatch: any) => void;
  };
  customization?: ItemCustomization;
}

export interface SectionBlueprint<RawItemType, ScopeType = any> {
  id: string;
  name: string;
  getScope: (state: any) => ScopeType; // TODO: can this become optional?
  rootSectionId: string;
  childSectionIds?: string[];
  rowBuilder?: RowBuilder<SectionInstance>;
  instanceBuilder?: {
    transformName?: (originalName: string, scope: ScopeType) => string;
    getRawItems?: (scope: ScopeType) => RawItemType[]; // TODO: this should be moved outside of the instanceBuilder
    getMeta?: (scope: ScopeType, items: RawItemType[]) => any;
    isLoading?: (scope: ScopeType, items: RawItemType[]) => boolean;
    isVisible?: (scope: ScopeType, items: RawItemType[]) => boolean;
    isInitialized?: (scope: ScopeType, items: RawItemType[]) => boolean;
    isEmpty?: (scope: ScopeType, items: RawItemType[], itemInstances?: ItemInstance[]) => boolean;
    makeCheckable?: (scope: ScopeType) => {
      checkedItemIds: string[];
      checkItemsActionCreator: ActionCreatorWithPayload<string[]>;
      uncheckItemsActionCreator: ActionCreatorWithPayload<string[]>;
    };
    shouldBeVisibleBeforeInitialized?: boolean;
  };
  customization?: SectionCustomization;
  itemBlueprint?: ItemBlueprint<RawItemType, ScopeType>;
}
