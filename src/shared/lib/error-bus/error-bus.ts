import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ErrorBusState = {
  message: string | null;
};

const initialState: ErrorBusState = {
  message: null,
};

export const errorBusSlice = createSlice({
  name: "errorBus",
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    clearMessage: state => {
      state.message = null;
    },
  },
});

export const { setMessage, clearMessage } = errorBusSlice.actions;
export default errorBusSlice.reducer;
