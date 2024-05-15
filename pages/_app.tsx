import '../styles/globals.css';
import '@interchain-ui/react/styles';

import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Box, Toaster, useColorModeValue } from '@interchain-ui/react';
import { InitialLoadFallback } from '@/components/common/InitialLoadFallback';

const DynamicAppProvider = dynamic(
  () => import('../components/common/AppProvider').then((mod) => mod.AppProvider),
  {
    loading: () => <InitialLoadFallback />
  }
);

function NobleExpressApp({ Component, pageProps }: AppProps) {
  return (
    <DynamicAppProvider>
      <Box
        minHeight="100dvh"
        display="flex"
        flexDirection="column"
        backgroundColor={useColorModeValue('#F6F6FE', '#020418')}
      >
        <Component {...pageProps} />
        <Toaster position={'top-right'} closeButton={true} />
      </Box>
    </DynamicAppProvider>
  );
}

export default NobleExpressApp;
