import { configureStore } from "@reduxjs/toolkit";

import { errorReducer } from "@/shared/model";
import { authReducer } from "@/features/auth";

export const store = configureStore({
  reducer: {
    error: errorReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
