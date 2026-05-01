import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { type ReactNode } from "react";

import { errorReducer } from "@/shared/model";

export const store = configureStore({
  reducer: {
    error: errorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const StoreProvider = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);
