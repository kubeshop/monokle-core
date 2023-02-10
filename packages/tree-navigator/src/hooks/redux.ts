import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootDispatch } from "../types/rootDispatch";
import { RootState } from "../types/rootState";

export const useAppDispatch = () => useDispatch<RootDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
