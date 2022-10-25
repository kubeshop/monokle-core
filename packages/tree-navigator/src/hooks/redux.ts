import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../types/appDispatch";
import { RootState } from "../types/rootState";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
