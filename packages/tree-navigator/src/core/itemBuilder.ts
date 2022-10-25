import { ItemInstance, SectionBlueprint } from "../types";

type BuildItemInstancesProps = {
  treeNavigatorId: string;
  sectionScope: Record<string, any>;
  sectionBlueprint: SectionBlueprint<any, any>;
};

type BuildItemInstanceReturn = {
  itemInstances: ItemInstance[];
  rawItems: any[];
};

export const buildItemInstances = (props: BuildItemInstancesProps): BuildItemInstanceReturn => {
  const { treeNavigatorId, sectionBlueprint, sectionScope } = props;
  const itemBlueprint = sectionBlueprint.itemBlueprint;

  let itemInstances: ItemInstance[] | undefined;
  let rawItems: any[] = [];

  // build the item instances if the section has the itemBlueprint defined
  if (itemBlueprint) {
    rawItems =
      (sectionBlueprint.instanceBuilder?.getRawItems && sectionBlueprint.instanceBuilder.getRawItems(sectionScope)) ||
      [];
    const itemBuilder = itemBlueprint.instanceBuilder;
    itemInstances = rawItems?.map((rawItem) => {
      return {
        treeNavigatorId,
        name: itemBlueprint.getName(rawItem, sectionScope),
        id: itemBlueprint.getInstanceId(rawItem, sectionScope),
        sectionId: sectionBlueprint.id,
        rootSectionId: sectionBlueprint.rootSectionId,
        isSelected: Boolean(itemBuilder?.isSelected ? itemBuilder.isSelected(rawItem, sectionScope) : false),
        isHighlighted: Boolean(itemBuilder?.isHighlighted ? itemBuilder.isHighlighted(rawItem, sectionScope) : false),
        isVisible: Boolean(itemBuilder?.isVisible ? itemBuilder.isVisible(rawItem, sectionScope) : true),
        isDirty: Boolean(itemBuilder?.isDirty ? itemBuilder.isDirty(rawItem, sectionScope) : false),
        isDisabled: Boolean(itemBuilder?.isDisabled ? itemBuilder.isDisabled(rawItem, sectionScope) : false),
        isCheckable: Boolean(itemBuilder?.isCheckable ? itemBuilder.isCheckable(rawItem, sectionScope) : false),
        isChecked: Boolean(itemBuilder?.isChecked ? itemBuilder.isChecked(rawItem, sectionScope) : false),
        isLast: false,
        meta: itemBuilder?.getMeta ? itemBuilder.getMeta(rawItem, sectionScope) : undefined,
      };
    });
  }

  return {
    itemInstances: itemInstances || [],
    rawItems,
  };
};
