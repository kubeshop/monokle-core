import {
  ItemBlueprint,
  ItemInstance,
  TreeNavigatorRowItem,
  TreeNavigatorRow,
  TreeNavigatorRowSection,
  RowBuilder,
  SectionBlueprint,
  SectionInstance,
  ITreeNavigator,
} from "../types";

function buildRowProp<InstanceType, PropsType extends { sectionInstance: SectionInstance } | undefined>(
  builder: RowBuilder<InstanceType, PropsType> | undefined,
  propName: keyof RowBuilder<InstanceType>,
  instance: InstanceType,
  defaultValue: number,
  sectionInstance?: SectionInstance
) {
  let propValue = defaultValue;
  const propBuilder = builder?.[propName];
  if (typeof propBuilder === "number") {
    propValue = propBuilder;
  } else if (typeof propBuilder === "function") {
    if (sectionInstance) {
      propValue = propBuilder(instance, { sectionInstance } as PropsType);
    } else {
      propValue = propBuilder(instance);
    }
  }
  return propValue;
}

function makeSectionRow(payload: {
  treeNavigatorId: string;
  instance: SectionInstance;
  blueprint: SectionBlueprint<any>;
  parentIndentation: number;
  level: number;
}): TreeNavigatorRowSection {
  const { treeNavigatorId, instance, blueprint, parentIndentation, level } = payload;
  const { rowBuilder } = blueprint;
  const height = buildRowProp(rowBuilder, "height", instance, 30);
  const fontSize = buildRowProp(rowBuilder, "fontSize", instance, 30 * 0.75);
  const marginBottom = buildRowProp(rowBuilder, "marginBottom", instance, 0);
  const indentation = parentIndentation + buildRowProp(rowBuilder, "indentation", instance, 0);
  return {
    treeNavigatorId,
    sectionId: instance.id,
    type: "section",
    level,
    height,
    indentation,
    marginBottom,
    fontSize,
  };
}

function makeItemRow(payload: {
  treeNavigatorId: string;
  instance: ItemInstance;
  blueprint: ItemBlueprint<any, any>;
  sectionId: string;
  parentIndentation: number;
  level: number;
}): TreeNavigatorRowItem {
  const { treeNavigatorId, instance, blueprint, sectionId, parentIndentation, level } = payload;
  const { rowBuilder } = blueprint;
  const height = buildRowProp(rowBuilder, "height", instance, 30);
  const fontSize = buildRowProp(rowBuilder, "fontSize", instance, 30 * 0.75);
  const marginBottom = buildRowProp(rowBuilder, "marginBottom", instance, 0);
  const indentation = parentIndentation + buildRowProp(rowBuilder, "indentation", instance, 0);
  return {
    treeNavigatorId,
    itemId: instance.id,
    type: "item",
    sectionId,
    level,
    height,
    indentation,
    marginBottom,
    fontSize,
  };
}

export function makeNavigatorRows(
  treeNavigator: ITreeNavigator,
  instance: SectionInstance,
  sectionInstanceMap: Record<string, SectionInstance>,
  itemInstanceMap: Record<string, ItemInstance>,
  level = 0,
  parentIndentation = 0
): TreeNavigatorRow[] {
  const rows: TreeNavigatorRow[] = [];
  const blueprint: SectionBlueprint<any, any> | undefined = treeNavigator.getSectionBlueprint(instance.id);
  if (!instance.isVisible || !blueprint) {
    return rows;
  }

  const sectionRow = makeSectionRow({
    treeNavigatorId: treeNavigator.id,
    instance,
    blueprint,
    parentIndentation,
    level,
  });
  rows.push(sectionRow);

  const itemBlueprint = blueprint.itemBlueprint;

  if (!instance.isCollapsed && itemBlueprint) {
    rows.push(
      ...instance.visibleItemIds
        .map((itemId) => itemInstanceMap[itemId])
        .filter((item): item is ItemInstance => Boolean(item))
        .map((item) =>
          makeItemRow({
            treeNavigatorId: treeNavigator.id,
            instance: item,
            blueprint: itemBlueprint,
            sectionId: blueprint.id,
            parentIndentation,
            level,
          })
        )
    );
  }

  if (!instance?.visibleChildSectionIds) {
    return rows;
  }

  for (let i = 0; i < instance.visibleChildSectionIds.length; i += 1) {
    const childSectionId = instance.visibleChildSectionIds[i];
    if (!childSectionId) {
      // eslint-disable-next-line no-continue
      continue;
    }
    const childInstance = sectionInstanceMap[childSectionId];
    if (childInstance) {
      rows.push(
        ...makeNavigatorRows(
          treeNavigator,
          childInstance,
          sectionInstanceMap,
          itemInstanceMap,
          level + 1,
          sectionRow.indentation
        )
      );
    }
  }

  return rows;
}

type GetRowIndexToScrollProps = {
  itemInstanceMap: Record<string, ItemInstance>;
  rows: TreeNavigatorRow[];
};

export function getRowIndexToScroll(props: GetRowIndexToScrollProps): number | undefined {
  const { itemInstanceMap, rows } = props;

  let selectedItemIndex: number = -1;
  let firstHighlightedItemIndex: number = -1;
  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];
    if (!row) {
      continue;
    }
    if (row.type === "item") {
      const item = itemInstanceMap[row.itemId];
      if (item?.isSelected && selectedItemIndex === -1) {
        selectedItemIndex = i;
      }
      if (item?.isHighlighted && firstHighlightedItemIndex === -1) {
        firstHighlightedItemIndex = i;
      }
    }
  }

  if (selectedItemIndex !== -1) {
    return selectedItemIndex;
  }

  if (firstHighlightedItemIndex !== -1) {
    return firstHighlightedItemIndex;
  }

  return undefined;
}
