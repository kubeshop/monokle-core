import React, { useLayoutEffect, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import SectionRenderer from "../SectionRenderer";
import ItemRenderer from "../ItemRenderer/ItemRenderer";

import { ITreeNavigator, TreeNavigatorRow } from "../../types";

import { useAppSelector } from "../../hooks";

import * as S from "./styled";

type TreeNavigatorRendererProps = {
  treeNavigator: ITreeNavigator;
  parentIndentation?: number;
  height: number;
};

function TreeNavigatorRenderer(props: TreeNavigatorRendererProps) {
  const { treeNavigator, height } = props;

  const [lastScrollIndex, setLastScrollIndex] = useState<number>(-1);

  const isTreeNavigatorInitialized = true; // TODO: check if the root section instance is initialized

  const rows: TreeNavigatorRow[] | undefined = useAppSelector(
    (state) => state.treeNavigator.stateByTreeNavigatorId[treeNavigator.id]?.rows
  );

  const rowIndexToScroll = useAppSelector(
    (state) => state.treeNavigator.stateByTreeNavigatorId[treeNavigator.id]?.rowIndexToScroll
  );

  const parentRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;

  const { getVirtualItems, scrollToIndex, getTotalSize } = useVirtualizer({
    count: rows?.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: React.useCallback(
      (i: number) => {
        const row = rows?.[i];
        return row ? row.height + row.marginBottom : 0; // TODO: revisit this
      },
      [rows]
    ),
    overscan: 5,
  });

  useLayoutEffect(() => {
    if (
      rowIndexToScroll &&
      rowIndexToScroll !== lastScrollIndex &&
      !getVirtualItems().some((item) => item.index === rowIndexToScroll)
    ) {
      scrollToIndex(rowIndexToScroll, { align: "center" });
    }
    // we need to set the last index that we scrolled to so we don't end up scrolling to the row unintentionally
    setLastScrollIndex(rowIndexToScroll || -1);
    // disabled the below eslint rule because it was causing too many re-renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowIndexToScroll, getVirtualItems, lastScrollIndex]);

  if (!isTreeNavigatorInitialized && treeNavigator.getCustomization()?.beforeInitializationText) {
    return (
      <S.BeforeInitializationContainer>
        <p>{treeNavigator.getCustomization()?.beforeInitializationText}</p>
      </S.BeforeInitializationContainer>
    );
  }

  // if (!rootSectionInstance?.isVisible) {
  //   return null;
  // }

  // if (rootSectionInstance?.isLoading) {
  //   return <S.Skeleton />;
  // }

  // if (rootSectionInstance?.isEmpty) {
  //   if (customEmpty?.Component) {
  //     return (
  //       <S.EmptyDisplayContainer>
  //         <customEmpty.Component sectionInstance={rootSectionInstance} />
  //       </S.EmptyDisplayContainer>
  //     );
  //   }
  //   return (
  //     <S.EmptyDisplayContainer>
  //       <h1>{rootSectionInstance.name}</h1>
  //       <p>Section is empty.</p>
  //     </S.EmptyDisplayContainer>
  //   );
  // }

  return (
    <div style={{ height: `${height}px`, overflow: "auto" }} ref={parentRef}>
      <div
        style={{
          height: `${getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {getVirtualItems().map((virtualItem) => {
          const row = rows?.[virtualItem.index];
          if (!row) {
            return null;
          }
          return (
            <div
              key={virtualItem.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {row.type === "section" ? <SectionRenderer sectionRow={row} /> : <ItemRenderer itemRow={row} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TreeNavigatorRenderer;
