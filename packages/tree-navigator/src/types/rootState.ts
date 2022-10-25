import { SliceState } from "./sliceState";

/**
 * This is the redux store root state
 */
export interface RootState {
  treeNavigator: SliceState; // TODO: would it make sense to get the slice name from an env variable?
  [x: string]: any;
}
