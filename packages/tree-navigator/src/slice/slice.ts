import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ItemInstance, SectionInstance, TreeNavigatorState } from "../types";
import { SliceState } from "../types/sliceState";

const initialState: SliceState = {
  stateByTreeNavigatorId: {},
};

export const treeNavigatorSlice = createSlice({
  name: "treeNavigator",
  initialState,
  reducers: {
    updateTreeNavigatorState: (
      state: Draft<SliceState>,
      action: PayloadAction<{ id: string; state: TreeNavigatorState }>
    ) => {
      state.stateByTreeNavigatorId[action.payload.id] = action.payload.state;
    },
    collapseSectionIds: (
      state: Draft<SliceState>,
      action: PayloadAction<{ treeNavigatorId: string; sectionIds: string[] }>
    ) => {
      const treeNavigatorState = state.stateByTreeNavigatorId[action.payload.treeNavigatorId];
      if (treeNavigatorState) {
        action.payload.sectionIds.forEach((sectionId) => {
          if (!treeNavigatorState.collapsedSectionIds.includes(sectionId)) {
            treeNavigatorState.collapsedSectionIds.push(sectionId);
          }
        });
      }
    },
    expandSectionIds: (
      state: Draft<SliceState>,
      action: PayloadAction<{ treeNavigatorId: string; sectionIds: string[] }>
    ) => {
      const treeNavigatorState = state.stateByTreeNavigatorId[action.payload.treeNavigatorId];
      if (treeNavigatorState) {
        treeNavigatorState.collapsedSectionIds = treeNavigatorState.collapsedSectionIds.filter(
          (sectionId) => !action.payload.sectionIds.includes(sectionId)
        );
      }
    },
    updateSectionInstance: (
      state: Draft<SliceState>,
      action: PayloadAction<{
        treeNavigatorId: string;
        sectionInstance: SectionInstance;
        itemInstanceMap: Record<string, ItemInstance>;
      }>
    ) => {
      const { sectionInstance, itemInstanceMap } = action.payload;
      const treeNavigatorState = state.stateByTreeNavigatorId[action.payload.treeNavigatorId];
      if (treeNavigatorState) {
        treeNavigatorState.sectionInstanceMap[sectionInstance.id] = sectionInstance;
        Object.keys(itemInstanceMap).forEach((id) => {
          const itemInstance = itemInstanceMap[id];
          if (!itemInstance) {
            return;
          }
          // TODO: should each sction have it's own itemInstanceMap?
          treeNavigatorState.itemInstanceMap[id] = itemInstance;
        });
      } else {
        // TODO: should the initial state of each treeNavigator be set somewhere else?
        state.stateByTreeNavigatorId[action.payload.treeNavigatorId] = {
          sectionInstanceMap: {
            [sectionInstance.id]: sectionInstance,
          },
          itemInstanceMap,
          rowIndexToScroll: undefined,
          collapsedSectionIds: [],
          rows: [],
        };
      }
    },
    triggerSectionListener: (
      state: Draft<SliceState>,
      action: PayloadAction<{ treeNavigatorId: string; sectionId: string }>
    ) => {
      console.log(
        `Trigger listener for Tree Navigator ${action.payload.treeNavigatorId} section ${action.payload.sectionId}`
      );
    },
  },
});

export const {
  updateTreeNavigatorState,
  updateSectionInstance,
  collapseSectionIds,
  expandSectionIds,
  triggerSectionListener,
} = treeNavigatorSlice.actions;
export default treeNavigatorSlice.reducer;
