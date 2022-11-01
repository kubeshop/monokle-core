import { ItemInstance, SectionBlueprint } from "../types";

type BuildItemInstancesProps = {
  treeNavigatorId: string;
  sectionScope: Record<string, any>;
  sectionBlueprint: SectionBlueprint<any>;
};

export const buildItemInstances = (props: BuildItemInstancesProps): ItemInstance[] => {
  const { treeNavigatorId, sectionBlueprint, sectionScope } = props;
  const itemsBlueprint = sectionBlueprint.items;

  if (!itemsBlueprint) {
    return [];
  }

  const itemsBuildResults =
    typeof itemsBlueprint.build === "function" ? itemsBlueprint.build(sectionScope) : itemsBlueprint.build;

  const itemInstances: ItemInstance[] | undefined = itemsBuildResults.map((itemBuilder) => {
    const instance: ItemInstance = {
      id: itemBuilder.id,
      name: itemBuilder.label,
      treeNavigatorId,
      sectionId: sectionBlueprint.id,
      isSelected: Boolean(itemBuilder.props?.isSelected),
      isHighlighted: Boolean(itemBuilder.props?.isHighlighted),
      isVisible: itemBuilder.props?.isVisible !== undefined ? Boolean(itemBuilder.props?.isVisible) : true,
      isDirty: Boolean(itemBuilder.props?.isDirty),
      isDisabled: Boolean(itemBuilder.props?.isDisabled),
      isChecked: Boolean(itemBuilder.props?.isChecked),
      isLast: false, // this will be computed by the visibility logic
    };
    return instance;
  });

  return itemInstances || [];
};
