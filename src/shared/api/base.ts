import axios, { type AxiosResponse } from "axios";

import { store } from "@/app/store";
import { logout } from "@/features/auth";

function newAbortSignal(timeoutMs: number) {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);
  return abortController.signal;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    config.headers["Cache-Control"] = "no-cache";
    config.headers["Pragma"] = "no-cache";

    const accessToken = store.getState().auth.accessToken;

    if (config.method === "get") {
      config.signal = newAbortSignal(10000);
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => handleError(error.response),
);

function handleError(response: AxiosResponse) {
  if (!response) throw new Error("Network error");

  const { status, data } = response;

  if (status >= 400 && status <= 600) {
    const messages = data?.message;

    if (status === 401 || status === 426) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      store.dispatch(logout());
    }

    if (typeof messages === "string") throw new Error(messages);
    if (Array.isArray(messages)) throw new Error(messages[0]);

    throw new Error(`Request failed with status ${status}`);
  }

  if ("data" in response) return response;
}
