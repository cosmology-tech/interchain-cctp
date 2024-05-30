import * as React from 'react';
import { useIsMounted } from './useIsMounted';

export const useDetectWallets = () => {
  const isMetamaskInstalled = useDetect(detectMetamask);
  const isKeplrInstalled = useDetect(detectKeplr);
  const isLeapInstalled = useDetect(detectLeap);
  const isCosmostationInstalled = useDetect(detectCosmostation);

  return {
    metamask: isMetamaskInstalled,
    keplr: isKeplrInstalled,
    leap: isLeapInstalled,
    cosmostation: isCosmostationInstalled
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
    leap?: any;
    cosmostation?: any;
  }
}

function detectKeplr() {
  return !!window.keplr;
}

function detectLeap() {
  return !!window.leap;
}

function detectCosmostation() {
  return !!window.cosmostation;
}
