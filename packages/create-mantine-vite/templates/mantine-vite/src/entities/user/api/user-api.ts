import { api } from "@/shared/api/base";

import type { UsersResponse } from "../model/types";

export const userApi = {
  list: () => api.get<UsersResponse, UsersResponse>("/users"),
};
