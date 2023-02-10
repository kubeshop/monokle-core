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

export type StartListening<
  AppState extends RootState = RootState,
  AppDispatch extends Dispatch<AnyAction> = Dispatch<AnyAction>
> = TypedStartListening<AppState, AppDispatch>;

export type StopListening<
  AppState extends RootState = RootState,
  AppDispatch extends Dispatch<AnyAction> = Dispatch<AnyAction>
> = TypedStopListening<AppState, AppDispatch>;
