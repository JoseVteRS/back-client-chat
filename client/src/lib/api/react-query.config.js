/** @type {import('react-query').QueryClientConfig} */
export const reactQueryConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1 * 60 * 60 * 1000,
      cacheTime: 5 * 6 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
};
