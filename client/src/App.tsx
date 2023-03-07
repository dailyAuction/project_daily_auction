import { RecoilRoot } from 'recoil';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Router } from './router/Router';
import { SSE } from './components/_common/SSE/SSE';

declare module 'react-query/types/react/QueryClientProvider' {
  interface QueryClientProviderProps {
    children?: React.ReactNode;
  }
}

export const App = () => {
  if (process.env.NODE_ENV === 'production') {
    console.log = function noConsole() {};
    console.warn = function noConsole() {};
  }

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
          <SSE />
          <Router />
        </QueryClientProvider>
      </RecoilRoot>
    </div>
  );
};
