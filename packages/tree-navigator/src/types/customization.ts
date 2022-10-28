import { ReactNode } from "react";
import { ItemInstance, SectionInstance } from "./instance";

export type ItemCustomComponentProps = {
  itemInstance: ItemInstance;
  children?: ReactNode;
};

export type ItemCustomComponent = React.ComponentType<ItemCustomComponentProps>;

export interface ItemCustomization {
  prefix?: {
    component: ItemCustomComponent;
    isVisibleOnHover?: boolean;
  };
  suffix?: {
    component: ItemCustomComponent;
    isVisibleOnHover?: boolean;
  };
  quickAction?: {
    component: ItemCustomComponent;
    isVisibleOnHover?: boolean;
  };
  contextMenu?: {
    component: ItemCustomComponent;
    isVisibleOnHover?: boolean;
  };
  row?: {
    component?: ItemCustomComponent;
    isVisibleOnHover?: boolean;
    disableHoverStyle?: boolean;
  };
  checkbox?: {
    isVisibleOnHover?: boolean;
  };
}

export type SectionCustomComponentProps = {
  sectionInstance: SectionInstance;
  onClick?: () => void;
};

export type SectionCustomComponent = React.ComponentType<SectionCustomComponentProps>;

export interface SectionCustomization {
  row?: {
    component?: SectionCustomComponent;
    disableHoverStyle?: boolean;
    initializationText?: string;
  };
  suffix?: {
    component?: SectionCustomComponent;
    isVisibleOnHover?: boolean;
  };
  contextMenu?: {
    component?: SectionCustomComponent;
  };
  counter?: {
    /** If no value is provided, default value will be "descendants". */
    type?: "descendants" | "items" | "subsections" | "none";
    component?: SectionCustomComponent;
  };
  prefix?: {
    component?: SectionCustomComponent;
  };
  checkbox?: {
    isVisibleOnHover?: boolean;
  };
}

export type RowBuilderResult = {
  /** If not specified, the default value will be 25. */
  height?: number;
  /** If not specified, the default value will be rowHeight * 0.75 */
  fontSize?: number;
  /** If not specified, the default value will be 0. */
  indentation?: number;
  /** If not specified, the default value will be 0. */
  marginBottom?: number;
};

export type RowBuilder<InstanceType> = RowBuilderResult | ((instance: InstanceType) => RowBuilderResult);
