import { getTreeNavigatorReducer, setupTreeNavigators } from "@monokle/tree-navigator";
import {
  AnyAction,
  configureStore,
  createListenerMiddleware,
  Dispatch,
  TypedStartListening,
  TypedStopListening,
} from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import dataReducer from "./data/slice";

export const listenerMiddleware = createListenerMiddleware();
export type AppStartListening = TypedStartListening<any, Dispatch<AnyAction>>;
export type AppStopListening = TypedStopListening<any, Dispatch<AnyAction>>;
export const startAppListening = listenerMiddleware.startListening as AppStartListening;
export const stopAppListening = listenerMiddleware.stopListening as AppStopListening;

const loggerMiddleware = createLogger();

export const store = configureStore({
  reducer: {
    ...getTreeNavigatorReducer(),
    data: dataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware).concat(loggerMiddleware),
});

setupTreeNavigators({
  startListening: startAppListening,
  stopListening: stopAppListening,
  dispatch: store.dispatch,
});
