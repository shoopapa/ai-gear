import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@acme/api";
/**
 * Extend this function when going to production by
 * setting the baseUrl to your production API URL.
 */
import Constants from "expo-constants";
/**
 * A wrapper for your app that provides the TRPC context.
 * Use only in _app.tsx
 */
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { transformer } from "@acme/api/transformer";
import { useAuth } from "@clerk/clerk-expo";

/**
 * A set of typesafe hooks for consuming your API.
 */
export const trpc = createTRPCReact<AppRouter>();

/**
 * Gets the IP address of your host-machine. If it cannot automatically find it,
 * you'll have to manually set it. NOTE: Port 3000 should work for most but confirm
 * you don't have anything else running on it, or you'd have to change it.
 */
const getBaseUrl = () => {
  let url = `https://www.ai-gear.com`
  if (Constants.manifest?.logUrl) {
    const ip = Constants.manifest?.logUrl?.split(':')[1]?.slice(2)
    url = `http://${ip}:3000`;
  }
  console.log('baseUrl:', url)
  return url;
};

export const TRPCProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {

  const { getToken } = useAuth();
  const [queryClient] = React.useState(() => new QueryClient());
  const url = `${getBaseUrl()}/api/trpc`
  console.log('trpc endpoint:', url)
  const [trpcClient] = React.useState(() =>
    trpc.createClient({
      transformer,
      links: [
        httpBatchLink({
          async headers() {
            const authToken = await getToken();
            return {
              Authorization: authToken ?? undefined,
            };
          },
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
