import { useMutation } from "@tanstack/react-query";

import { testApi } from "@/shared/api/test-api.ts";

export const useTestActions = () => {
  const postTest = useMutation({
    mutationFn: (value: FormData) => testApi.postTestData(value),
  });

  return {
    postTest,
  };
};
