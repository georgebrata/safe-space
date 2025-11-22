import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import riskFormReducer from "./slices/riskFormSlice"
import communityReducer from "./slices/communitySlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    riskForm: riskFormReducer,
    community: communityReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
