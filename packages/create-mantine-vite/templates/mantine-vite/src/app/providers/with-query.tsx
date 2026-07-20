import { QueryClient, QueryCache, MutationCache, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from "react";

import { store } from "@/app/store";
import { setError } from "@/shared/model";

const handleError = (err: unknown) => {
  const message = err instanceof Error ? err.message : "Unknown error";
  store.dispatch(setError(message));
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError: handleError }),
  mutationCache: new MutationCache({ onError: handleError }),
  defaultOptions: {
    queries: {
      retry: false,
      throwOnError: false,
    },
  },
});

export const QueryProvider = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
