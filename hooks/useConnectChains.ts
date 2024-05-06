import { useEffect, useState, useCallback } from 'react';
import { useChains } from '@cosmos-kit/react';

export const useConnectChains = (chainNames: string[]) => {
  const [isAllConnected, setIsAllConnected] = useState(false);
  const [resolveAllConnected, setResolveAllConnected] = useState<(() => void) | null>(null);
  const chainContexts = useChains(chainNames);

  const connectAll = useCallback(async () => {
    chainNames.forEach((chainName) => {
      const chainContext = chainContexts[chainName];
      if (chainContext?.isWalletDisconnected) {
        chainContext.connect();
      }
    });

    if (isAllConnected) {
      return;
    }

    return new Promise<void>((resolve) => {
      setResolveAllConnected(() => resolve);
    });
  }, [chainNames, chainContexts, isAllConnected]);

  useEffect(() => {
    const isConnected = Object.values(chainContexts).every(
      (chainContext) => chainContext.isWalletConnected
    );

    if (isConnected && resolveAllConnected) {
      resolveAllConnected();
      setResolveAllConnected(null);
    }

    setIsAllConnected(isConnected);
  }, [chainContexts, resolveAllConnected]);

  const disconnectAll = () => {
    chainNames.forEach((chainName) => {
      const chainContext = chainContexts[chainName];
      if (chainContext.isWalletConnected) {
        chainContext.disconnect();
      }
    });
  };

  return { isAllConnected, connectAll, disconnectAll };
};
