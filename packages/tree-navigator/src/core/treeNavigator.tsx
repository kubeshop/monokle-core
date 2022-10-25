import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import TreeNavigatorRenderer from "../components/TreeNavigatorRenderer/TreeNavigatorRenderer";
import { treeNavigatorSlice, triggerSectionListener } from "../slice";
import {
  ITreeNavigator,
  RtkListener,
  SectionBlueprint,
  StartListening,
  StopListening,
  TreeNavigatorCustomization,
  TreeNavigatorRendererComponent,
} from "../types";
import { createTreeNavigatorListener, createTreeNavigatorSectionListener } from "./listeners";

const treeNavigatorMap: Record<string, ITreeNavigator> = {};

let startListening: StartListening | undefined = undefined;
let stopListening: StopListening | undefined = undefined;
let dispatch: Dispatch<AnyAction> | undefined = undefined;

const makeNotFoundError = (id: string) => new Error(`Couldn't find section with id ${id}`);

export const getTreeNavigatorReducer = () => {
  return { treeNavigator: treeNavigatorSlice.reducer };
};

export const setupTreeNavigators = (props: {
  startListening: StartListening;
  stopListening: StopListening;
  dispatch: Dispatch<AnyAction>;
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
  console.log({ id, treeNavigatorMap });
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
  #rootSectionId?: string;
  #sectionBlueprintMap: Record<string, SectionBlueprint<any, any>>;
  #customization?: TreeNavigatorCustomization;
  #listenerMap: Record<string, RtkListener>;

  constructor(id: string, customization?: TreeNavigatorCustomization) {
    this.id = id;
    this.#sectionBlueprintMap = {};
    this.#listenerMap = {};
    this.#customization = customization;

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

  getRootSectionId() {
    return this.#rootSectionId;
  }

  getCustomization() {
    return this.#customization;
  }

  getSectionBlueprint(sectionId: string) {
    return this.#sectionBlueprintMap[sectionId];
  }

  setRootSectionId(rootSectionId: string) {
    this.#rootSectionId = rootSectionId;
  }

  #startSectionListener(sectionBlueprint: SectionBlueprint<any, any>) {
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

  registerSection(sectionBlueprint: SectionBlueprint<any, any>) {
    this.#sectionBlueprintMap[sectionBlueprint.id] = sectionBlueprint;
    this.#startSectionListener(sectionBlueprint);
  }

  unregisterSection(sectionId: string) {
    delete this.#sectionBlueprintMap[sectionId];
    this.#stopSectionListener(sectionId);
  }

  registerChildSection(parentSectionId: string, sectionBlueprint: SectionBlueprint<any, any>) {
    const parentSection = this.#sectionBlueprintMap[parentSectionId];
    if (!parentSection) {
      throw makeNotFoundError(parentSectionId);
    }
    if (!parentSection.childSectionIds) {
      parentSection.childSectionIds = [];
    }
    parentSection.childSectionIds.push(sectionBlueprint.id);
    this.#sectionBlueprintMap[sectionBlueprint.id] = sectionBlueprint;
    this.#startSectionListener(sectionBlueprint);
  }

  unregisterChildSection(parentSectionId: string, sectionId: string) {
    const parentSection = this.#sectionBlueprintMap[parentSectionId];
    const section = this.#sectionBlueprintMap[sectionId];
    this.#stopSectionListener(sectionId);
    if (!parentSection) {
      throw makeNotFoundError(parentSectionId);
    }
    if (!section) {
      throw makeNotFoundError(sectionId);
    }
    parentSection.childSectionIds = parentSection.childSectionIds?.filter((id) => id !== sectionId);
    delete this.#sectionBlueprintMap[sectionId];
  }
}
