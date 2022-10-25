import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import {
  AnyListenerPredicate,
  ListenerEffect,
  TypedStartListening,
  TypedStopListening,
} from "@reduxjs/toolkit/dist/listenerMiddleware/types";
import { RootState } from "./rootState";

export type RtkListener = {
  predicate: AnyListenerPredicate<any>;
  effect: ListenerEffect<AnyAction, RootState, Dispatch<AnyAction>>;
};

export type StartListening = TypedStartListening<RootState, Dispatch<AnyAction>>;
export type StopListening = TypedStopListening<RootState, Dispatch<AnyAction>>;
