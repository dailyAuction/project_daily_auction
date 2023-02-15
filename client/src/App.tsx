import { RecoilRoot } from 'recoil';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Router } from './router/Router';

declare module 'react-query/types/react/QueryClientProvider' {
  interface QueryClientProviderProps {
    children?: React.ReactNode;
  }
}

export const App = () => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-background-desktop">
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </RecoilRoot>
    </div>
  );
};
