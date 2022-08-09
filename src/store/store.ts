import { configureStore } from "@reduxjs/toolkit"

import { keyboardSlice } from "../components/Keyboard/store"

export default configureStore({
  reducer: {
    keyboard: keyboardSlice.reducer
  }
})
