import '../styles/globals.css';
import '@interchain-ui/react/styles';

import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  Box,
  ThemeProvider,
  NobleProvider,
  Toaster,
  useColorModeValue
} from '@interchain-ui/react';

const queryClient = new QueryClient();

const DynamicAppProvider = dynamic(
  () => import('../components/common/AppProvider').then((mod) => mod.AppProvider),
  {
    loading: () => <p>Loading...</p>
  }
);

function CreateCosmosApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <NobleProvider>
        <QueryClientProvider client={queryClient}>
          <DynamicAppProvider>
            <Box
              minHeight="100dvh"
              display="flex"
              flexDirection="column"
              backgroundColor={useColorModeValue('#F6F6FE', '#020418')}
            >
              <Component {...pageProps} />
              <Toaster position={'top-right'} closeButton={true} />
              <ReactQueryDevtools initialIsOpen={false} />
            </Box>
          </DynamicAppProvider>
        </QueryClientProvider>
      </NobleProvider>
    </ThemeProvider>
  );
}

export default CreateCosmosApp;
