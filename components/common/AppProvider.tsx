import { SkipProvider } from '@/contexts';
import { ChainProvider } from '@cosmos-kit/react';
import { assets, chains } from 'chain-registry';
import { wallets as _wallets } from 'cosmos-kit';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider, NobleProvider } from '@interchain-ui/react';
import { useEffect, useRef, useState } from 'react';

const queryClient = new QueryClient();

export const AppProvider = ({ children }: { children?: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [wallets, setWallets] = useState([
    _wallets.leap.extension!,
    _wallets.keplr.extension!,
    _wallets.cosmostation.extension!
  ]);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      import('@cosmos-kit/leap-capsule-social-login')
        .then((CapsuleModule) => {
          return CapsuleModule.wallets;
        })
        .then((leapSocialLogin) => {
          // @ts-expect-error - leapSocialLogin is an array of Wallets
          setWallets((prev) => [...prev, ...leapSocialLogin]);
          setIsLoading(false);
        });
      hasRun.current = true;
    }
  }, []);

  if (isLoading) return null;

  return (
    <ThemeProvider>
      <NobleProvider>
        <QueryClientProvider client={queryClient}>
          <ChainProvider chains={chains} assetLists={assets} wallets={wallets}>
            <SkipProvider>{children}</SkipProvider>
          </ChainProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </NobleProvider>
    </ThemeProvider>
  );
};
