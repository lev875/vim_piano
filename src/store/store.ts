import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit"

import { keyboardSlice } from "../components/Keyboard/store"
import { configSlice, LOCAL_STORAGE_KEY } from "../components/Settings/store"

const store = configureStore({
  reducer: {
    keyboard: keyboardSlice.reducer,
    config: configSlice.reducer
  }
})

export default store

store.subscribe(
  () => localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(store.getState().config)
  )
)
