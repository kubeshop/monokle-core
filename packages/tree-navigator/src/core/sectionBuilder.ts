import { ItemInstance, SectionBlueprint, SectionInstance } from "../types";

type BuildSectionInstanceProps = {
  treeNavigatorId: string;
  itemInstances: ItemInstance[];
  sectionBlueprint: SectionBlueprint<any>;
  sectionScope: Record<string, any>;
  collapsedSectionIds: string[];
};

export const buildSectionInstance = (props: BuildSectionInstanceProps) => {
  const { treeNavigatorId, itemInstances, sectionBlueprint, sectionScope, collapsedSectionIds } = props;

  const isSectionSelected = Boolean(itemInstances?.some((i) => i.isSelected === true));
  const isSectionHighlighted = Boolean(itemInstances?.some((i) => i.isHighlighted === true));

  const sectionBuildResult =
    typeof sectionBlueprint.build === "function"
      ? sectionBlueprint.build(sectionScope, itemInstances)
      : sectionBlueprint.build;

  const isSectionInitialized = Boolean(sectionBuildResult?.props?.isInitialized);
  const isSectionEmpty = Boolean(sectionBuildResult?.props?.isEmpty);

  const visibleItemIds = itemInstances.filter((i) => i.isVisible === true).map((i) => i.id);

  const sectionInstance: SectionInstance = {
    id: sectionBlueprint.id,
    treeNavigatorId,
    name: sectionBuildResult.label,
    itemIds: itemInstances?.map((i) => i.id) || [],
    isLoading: Boolean(sectionBuildResult?.props?.isLoading),
    isVisible:
      Boolean(sectionBlueprint?.options?.isVisibleBeforeInit === true && !isSectionInitialized) ||
      // (sectionBlueprint && sectionBlueprint.customization?.empty?.component && isSectionEmpty) ||
      (isSectionInitialized && Boolean(sectionBuildResult?.props?.isVisible || visibleItemIds.length)),
    isInitialized: isSectionInitialized,
    isSelected: isSectionSelected,
    isHighlighted: isSectionHighlighted,
    isEmpty: isSectionEmpty,
    isCollapsed: collapsedSectionIds.includes(sectionBlueprint.id),
    isLast: false,
    meta: sectionBuildResult?.props?.meta,
    visibleItemIds,
  };

  return sectionInstance;
};
