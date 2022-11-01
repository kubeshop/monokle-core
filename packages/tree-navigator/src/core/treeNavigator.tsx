import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import TreeNavigatorRenderer from "../components/TreeNavigatorRenderer/TreeNavigatorRenderer";
import { treeNavigatorSlice, triggerSectionListener } from "../slice";
import {
  ITreeNavigator,
  RtkListener,
  SectionBlueprint,
  SectionBuilder,
  StartListening,
  StopListening,
  TreeNavigatorCustomization,
  TreeNavigatorRendererComponent,
} from "../types";
import { AppDispatch } from "../types/appDispatch";
import { createTreeNavigatorListener, createTreeNavigatorSectionListener } from "./listeners";

const treeNavigatorMap: Record<string, ITreeNavigator> = {};

let startListening: StartListening | undefined = undefined;
let stopListening: StopListening | undefined = undefined;
let dispatch: AppDispatch | undefined = undefined;

const makeNotFoundError = (id: string) => new Error(`Couldn't find section with id ${id}`);

export const getTreeNavigatorReducer = () => {
  return { treeNavigator: treeNavigatorSlice.reducer };
};

export const setupTreeNavigators = (props: {
  startListening: StartListening;
  stopListening: StopListening;
  dispatch: AppDispatch;
}) => {
  startListening = props.startListening;
  stopListening = props.stopListening;
  dispatch = props.dispatch;

  // Object.values(treeNavigatorMap).forEach((treeNavigator) => {
  //   treeNavigator.startListeners(props.startListening);
  // });
};

export const createTreeNavigator = (props: {
  id: string;
  customization?: TreeNavigatorCustomization;
}): TreeNavigator => {
  const { id, customization } = props;
  if (treeNavigatorMap[id]) {
    throw new Error("Another TreeNavigator with the same ID has already been setup.");
  }
  const newTreeNavigator = new TreeNavigator(id, customization);
  treeNavigatorMap[id] = newTreeNavigator;
  return newTreeNavigator;
};

export const getTreeNavigatorById = (id: string): ITreeNavigator | undefined => {
  return treeNavigatorMap[id];
};

export class TreeNavigator implements ITreeNavigator {
  readonly id: string;
  readonly Renderer: TreeNavigatorRendererComponent;
  #sectionBlueprintMap: Record<string, SectionBlueprint<any>>;
  #customization?: TreeNavigatorCustomization;
  #listenerMap: Record<string, RtkListener>;
  #rootSectionIds: string[];

  constructor(id: string, customization?: TreeNavigatorCustomization) {
    this.id = id;
    this.#sectionBlueprintMap = {};
    this.#listenerMap = {};
    this.#customization = customization;
    this.#rootSectionIds = [];

    this.Renderer = (props) => {
      const { height } = props;
      return <TreeNavigatorRenderer treeNavigator={this} height={height} />;
    };

    const listener = createTreeNavigatorListener(this);
    this.#listenerMap[this.id] = listener;
    if (!startListening || !dispatch) {
      console.log("startListening or dispatch is undefined");
      return;
    }
    startListening(listener);
  }

  // startListeners(startListening: StartListening) {
  //   Object.values(this.#listenerMap).forEach((listener) => startListening(listener));
  // }

  // stopListeners(stopListening: StopListening) {
  //   Object.values(this.#listenerMap).forEach((listener) => stopListening(listener));
  // }

  isRootSection(sectionId: string) {
    return this.#rootSectionIds.includes(sectionId);
  }

  getCustomization() {
    return this.#customization;
  }

  getSectionBlueprint(sectionId: string) {
    return this.#sectionBlueprintMap[sectionId];
  }

  #startSectionListener(sectionBlueprint: SectionBlueprint<any>) {
    const listener = createTreeNavigatorSectionListener(this.id, sectionBlueprint);
    // if (!startListening) {
    //   throw new Error(`Cannot start listener for section ${sectionBlueprint.id} from TreeNavigator ${this.id}`);
    // }
    this.#listenerMap[sectionBlueprint.id] = listener;
    startListening && startListening(listener);
    dispatch && dispatch(triggerSectionListener({ treeNavigatorId: this.id, sectionId: sectionBlueprint.id }));
  }

  #stopSectionListener(sectionId: string) {
    const listener = this.#listenerMap[sectionId];
    if (!listener || !stopListening) {
      return;
    }
    stopListening(listener);
  }

  registerSection(id: string, sectionBuilder: SectionBuilder<any>) {
    const sectionBlueprint: SectionBlueprint<any> = {
      ...sectionBuilder,
      id,
      childSectionIds: [],
    };

    const parentSectionId = getParentSectionId(sectionBlueprint.id);
    const parentSectionBlueprint = parentSectionId ? this.#sectionBlueprintMap[parentSectionId] : undefined;

    const isRootSection = !id.includes(".") && !Boolean(parentSectionBlueprint);

    if (isRootSection) {
      this.#rootSectionIds.push(id);
    } else if (parentSectionBlueprint) {
      parentSectionBlueprint.childSectionIds.push(sectionBlueprint.id);
    } else {
      throw new Error(`Unable to register section with id ${sectionBlueprint.id} because the parent cannot be found.`);
    }

    this.#sectionBlueprintMap[sectionBlueprint.id] = sectionBlueprint;
    this.#startSectionListener(sectionBlueprint);
  }

  unregisterSection(sectionId: string) {
    if (!sectionId.includes(".") && this.#rootSectionIds.includes(sectionId)) {
      this.#rootSectionIds = this.#rootSectionIds.filter((id) => id !== sectionId);
    }
    delete this.#sectionBlueprintMap[sectionId];
    this.#stopSectionListener(sectionId);
  }
}

function getParentSectionId(sectionId: string) {
  const parentId = sectionId.split(".").slice(0, -1).join(".");
  if (!parentId.trim().length) {
    return;
  }
  return parentId;
}
