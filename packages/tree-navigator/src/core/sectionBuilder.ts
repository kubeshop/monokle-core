import { ItemInstance, SectionBlueprint, SectionInstance } from "../types";

type BuildSectionInstanceProps = {
  treeNavigatorId: string;
  itemInstances: ItemInstance[];
  rawItems: any[];
  sectionBlueprint: SectionBlueprint<any, any>;
  sectionScope: Record<string, any>;
  collapsedSectionIds: string[];
};

export const buildSectionInstance = (props: BuildSectionInstanceProps) => {
  const { treeNavigatorId, itemInstances, sectionBlueprint, sectionScope, rawItems, collapsedSectionIds } = props;
  const sectionBuilder = sectionBlueprint.instanceBuilder;

  const isSectionSelected = Boolean(itemInstances?.some((i) => i.isSelected === true));
  const isSectionHighlighted = Boolean(itemInstances?.some((i) => i.isHighlighted === true));
  const isSectionInitialized = Boolean(
    sectionBuilder?.isInitialized ? sectionBuilder.isInitialized(sectionScope, rawItems) : true
  );
  const isSectionEmpty = Boolean(
    sectionBuilder?.isEmpty ? sectionBuilder.isEmpty(sectionScope, rawItems, itemInstances) : false
  );

  const visibleItemIds = itemInstances.filter((i) => i.isVisible === true).map((i) => i.id);

  const sectionInstance: SectionInstance = {
    id: sectionBlueprint.id,
    treeNavigatorId,
    name: sectionBuilder?.transformName
      ? sectionBuilder.transformName(sectionBlueprint.name, sectionScope)
      : sectionBlueprint.name,
    rootSectionId: sectionBlueprint.rootSectionId,
    itemIds: itemInstances?.map((i) => i.id) || [],
    isLoading: Boolean(sectionBuilder?.isLoading ? sectionBuilder.isLoading(sectionScope, rawItems) : false),
    isVisible:
      Boolean(sectionBuilder?.shouldBeVisibleBeforeInitialized === true && !isSectionInitialized) ||
      // (sectionBlueprint && sectionBlueprint.customization?.empty?.component && isSectionEmpty) ||
      (isSectionInitialized &&
        Boolean(
          sectionBuilder?.isVisible ? sectionBuilder.isVisible(sectionScope, rawItems) : visibleItemIds.length > 0
        )),
    isInitialized: isSectionInitialized,
    isSelected: isSectionSelected,
    isHighlighted: isSectionHighlighted,
    isEmpty: isSectionEmpty,
    isCollapsed: collapsedSectionIds.includes(sectionBlueprint.id),
    isLast: false,
    meta: sectionBuilder?.getMeta ? sectionBuilder.getMeta(sectionScope, rawItems) : undefined,
    visibleItemIds,
  };

  return sectionInstance;
};
