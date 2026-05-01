import { useQuery } from "@tanstack/react-query";

import { userApi } from "../api/user-api";

export const usersKeys = {
  all: ["users"] as const,
  list: () => [...usersKeys.all, "list"] as const,
};

export const useUsers = () => {
  return useQuery({
    queryKey: usersKeys.list(),
    queryFn: () => userApi.list(),
  });
};
