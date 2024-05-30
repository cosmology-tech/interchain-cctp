import '../styles/globals.css';
import '@interchain-ui/react/styles';
import '@interchain-ui/react/globalStyles';

import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Box, Toaster, useColorModeValue } from '@interchain-ui/react';
import { InitialLoadFallback } from '@/components/common/InitialLoadFallback';

const DynamicAppProvider = dynamic(
  () => import('../components/common/AppProvider').then((mod) => mod.AppProvider),
  {
    loading: () => <InitialLoadFallback />
  }
);

const CustomHead = () => {
  return (
    <Head>
      <title>Noble Express</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
    </Head>
  );
};

function NobleExpressApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CustomHead />

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
    </>
  );
}

export default NobleExpressApp;
