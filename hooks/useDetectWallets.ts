import * as React from 'react';

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
  const [isInstalled, setIsInstalled] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsInstalled(detectFn());
  }, [detectFn]);

  return isInstalled;
}

function detectMetamask() {
  const { ethereum } = window;
  return !!(ethereum?.isMetaMask && !ethereum?.isCypherWallet);
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
