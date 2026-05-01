import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from "react";
import { useDispatch } from "react-redux";

import { setError } from "@/shared/model";

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        // @ts-ignore
        onError: (err: any) => dispatch(setError(err.message)),
      },
      mutations: {
        onError: (err: any) => dispatch(setError(err.message)),
      },
    },
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
