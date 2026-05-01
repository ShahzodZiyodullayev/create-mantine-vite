import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AuthUser = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
};

type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
};

const tokenFromStorage = typeof window !== "undefined" ? localStorage.getItem("token") : null;
const userJson = typeof window !== "undefined" ? localStorage.getItem("user") : null;

const initialState: AuthState = {
  accessToken: tokenFromStorage,
  user: userJson ? (JSON.parse(userJson) as AuthUser) : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: AuthUser; accessToken: string }>,
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
