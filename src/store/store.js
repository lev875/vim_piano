import { configureStore } from "@reduxjs/toolkit"

import { keysSlice } from "../components/Keyboard/store"

export default configureStore({
  reducer: {
    keys: keysSlice.reducer
  }
})
