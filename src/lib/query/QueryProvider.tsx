"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { CACHE_TIMES } from "@/constants/common";
import { config } from "@/lib/env/env";
import { shouldRetryQuery, retryDelay } from "./retryPolicy";

interface QueryProviderProps {
  children: React.ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: CACHE_TIMES.STALE_TIME,
            gcTime: CACHE_TIMES.GC_TIME,
            retry: shouldRetryQuery,
            retryDelay,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
          },
          mutations: {
            retry: 0,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {!config.isProd && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
