import { TypedUseSelectorHook, useSelector } from "react-redux"
import store from "./store"

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
