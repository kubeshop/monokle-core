import { AnyAction, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "./rootState";

export type RootDispatch = Dispatch<AnyAction> & ThunkDispatch<RootState, null, AnyAction>;
