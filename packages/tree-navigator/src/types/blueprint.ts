import { RootDispatch } from "./rootDispatch";
import { ItemCustomization, RowBuilder, SectionCustomization } from "./customization";
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
  options?: {};
  customization?: ItemCustomization;
  events?: {
    onClick?: (itemInstance: ItemInstance, dispatch: RootDispatch) => void;
    onCheck?: (itemInstance: ItemInstance, dispatch: RootDispatch) => void;
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

export interface SectionBuilder<State extends RootState, ScopeType> {
  scope: (state: State) => ScopeType; // TODO: should we allow this to be optional and an object of type ScopeType as well?
  build: SectionBuildResult | ((scope: ScopeType, itemInstances: ItemInstance[]) => SectionBuildResult);
  row?: RowBuilder<SectionInstance>;
  options?: {
    enableCheckboxes?: boolean;
    isVisibleBeforeInit?: boolean;
  };
  customization?: SectionCustomization;
  events?: {
    onClick?: (sectionInstance: SectionInstance, dispatch: RootDispatch) => void;
    onCheck?: (sectionInstance: SectionInstance, dispatch: RootDispatch) => void;
  };
  items?: ItemsBuilder<ScopeType>;
}

export interface SectionBlueprint<State extends RootState, ScopeType = any> extends SectionBuilder<State, ScopeType> {
  id: string;
  childSectionIds: string[];
}
