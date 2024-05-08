import * as React from 'react';

export const useDetectWallets = () => {
  const isMetamaskInstalled = useDetect(detectMetamask);
  const isKeplrInstalled = useDetect(detectKeplr);

  return {
    metamask: isMetamaskInstalled,
    keplr: isKeplrInstalled
  } as const;
};

function useDetect(detectFn: () => boolean) {
  const [isInstalled, setIsInstalled] = React.useState<boolean>(false);

  React.useEffect(() => {
    const detect = () => {
      setIsInstalled(detectFn());
    };

    window.addEventListener('load', detect);

    return () => {
      window.removeEventListener('load', detect);
    };
  }, []);

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
