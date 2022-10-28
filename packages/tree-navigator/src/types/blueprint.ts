import { AppDispatch } from "./appDispatch";
import { ItemCustomization, RowBuilder } from "./customization";
import { ItemInstance, SectionInstance } from "./instance";
import { RootState } from "./rootState";

export interface ItemBuildResult {
  id: string;
  label: string;
  props?: {
    isSelected?: boolean;
    isHighlighted?: boolean;
    isVisible?: boolean;
    isDirty?: boolean;
    isDisabled?: boolean;
    isChecked?: boolean;
    meta?: any;
  };
}

export interface ItemsBuilder<ScopeType> {
  build: ItemBuildResult[] | ((scope: ScopeType) => ItemBuildResult[]);
  row?: RowBuilder<ItemInstance>;
  options?: ItemCustomization;
  events?: {
    onClick?: (itemInstance: ItemInstance, dispatch: AppDispatch) => void;
    // onCheck?: (itemInstance: ItemInstance, dispatch: AppDispatch) => void;
  };
}

export interface SectionBuildResult {
  label: string;
  props?: {
    isLoading?: boolean;
    isVisible?: boolean;
    isInitialized?: boolean;
    isEmpty?: boolean;
    meta?: any;
  };
}

export interface SectionBuilder<ScopeType> {
  scope: (state: RootState) => ScopeType; // TODO: should we allow this to be optional and an object of type ScopeType as well?
  build: SectionBuildResult | ((scope: ScopeType, itemInstances: ItemInstance[]) => SectionBuildResult);
  row?: RowBuilder<SectionInstance>;
  options?: {
    enableCheckboxes?: boolean;
    isVisibleBeforeInit?: boolean;
  };
  events?: {
    onClick?: (sectionInstance: SectionInstance, dispatch: AppDispatch) => void;
    // onCheck?: (sectionInstance: SectionInstance, dispatch: AppDispatch) => void;
  };
  items?: ItemsBuilder<ScopeType>;
}

export interface SectionBlueprint<ScopeType = any> extends SectionBuilder<ScopeType> {
  id: string;
  childSectionIds: string[];
}
