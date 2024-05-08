import * as React from 'react';
import { useIsMounted } from './useIsMounted';

export const useDetectWallets = () => {
  const isMetamaskInstalled = useDetect(detectMetamask);
  const isKeplrInstalled = useDetect(detectKeplr);

  return {
    metamask: isMetamaskInstalled,
    keplr: isKeplrInstalled
  } as const;
};

function useDetect(detectFn: () => boolean) {
  const isMounted = useIsMounted();
  const [isInstalled, setIsInstalled] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!isMounted) return;

    const detect = () => {
      setIsInstalled(detectFn());
    };

    window.addEventListener('load', detect);

    return () => {
      window.removeEventListener('load', detect);
    };
  }, [detectFn, isMounted]);

  return isInstalled;
}

function detectMetamask() {
  if (window.ethereum) {
    if (window.ethereum.isMetaMask) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

declare global {
  interface Window {
    keplr?: any; // just a placeholder to let TS not complain about keplr
  }
}

function detectKeplr() {
  return !!window.keplr;
}
