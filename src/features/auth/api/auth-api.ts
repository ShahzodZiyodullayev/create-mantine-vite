import { api } from "@/shared/api/base";

import type { AuthUser } from "../model/auth-slice";

export type LoginDto = {
  username: string;
  password: string;
};

export type LoginResponse = AuthUser & {
  accessToken: string;
  refreshToken: string;
};

export const authApi = {
  login: (data: LoginDto) => api.post<LoginResponse, LoginResponse>("/auth/login", data),
};
