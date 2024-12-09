import { configureStore } from "@reduxjs/toolkit";

import { authService } from "../services/authService";

import authReducer from "./authSlice";
import typingReducer from "./typingSlice"


export const store = configureStore({
   reducer: {
      [authService.reducerPath]: authService.reducer,
      typing: typingReducer,
      auth: authReducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authService.middleware)
})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>