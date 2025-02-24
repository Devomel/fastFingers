import { configureStore } from "@reduxjs/toolkit";

import { authService } from "../services/authService";
import { statsService } from "../services/statsService";

import authReducer from "./authSlice";


export const store = configureStore({
   reducer: {
      [authService.reducerPath]: authService.reducer,
      [statsService.reducerPath]: statsService.reducer,
      auth: authReducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authService.middleware, statsService.middleware)
})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>