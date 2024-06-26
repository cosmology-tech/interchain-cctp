import * as React from 'react';
import { wallets as cosmosKitWallets } from 'cosmos-kit';
import { AnimatePresence, motion, Transition } from 'framer-motion';
import {
  ConnectModal,
  ConnectViewRequestingConnection,
  ConnectViewInstallWallet,
  WalletButton
} from '@/components/common/ConnectView';
import { useCosmosWallet } from '@/hooks';
import { Stack } from '@interchain-ui/react';
import { CosmosWalletKey, COSMOS_WALLET_KEY_TO_NAME } from '@/config';

interface WalletListItem {
  walletName: CosmosWalletKey;
  isConnected: boolean;
  isInstalled: boolean;
  onRequest: () => Promise<boolean>;
}

export interface SelectWalletModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setSelectedWallet?: (name: CosmosWalletKey) => void;
  closeOnError?: boolean;
  wallets?: CosmosWalletKey[];
  onConnectSuccess?: (walletKey: CosmosWalletKey) => void;
  onConnectError?: () => void;
}

const transitionConfig: Transition = {
  type: 'tween',
  duration: 0.2,
  ease: 'easeInOut'
};

const DEFAULT_WALLETS: CosmosWalletKey[] = ['capsule', 'keplr', 'cosmostation', 'leap'];

export const SelectWalletModal = ({
  isOpen,
  setIsOpen,
  setSelectedWallet: externalSetSelectedWallet,
  wallets = DEFAULT_WALLETS,
  closeOnError,
  onConnectSuccess,
  onConnectError
}: SelectWalletModalProps) => {
  const [view, setView] = React.useState<'wallets' | 'request' | 'install'>('wallets');
  const [status, setStatus] = React.useState<'requesting' | 'rejected' | 'error' | 'connected'>(
    'requesting'
  );
  const [selectedWallet, setSelectedWallet] = React.useState<CosmosWalletKey | null>(null);

  const selectedCosmosKitWallet = selectedWallet
    ? cosmosKitWallets.find((w) => {
        return w.walletName === COSMOS_WALLET_KEY_TO_NAME[selectedWallet];
      })
    : null;

  const {
    connectAsync: connectKeplrAsync,
    isConnected: isKeplrConnected,
    isInstalled: isKeplrInstalled
  } = useCosmosWallet('keplr');
  const {
    connectAsync: connectCapsuleAsync,
    isConnected: isCapsuleConnected,
    isInstalled: isCapsuleInstalled
  } = useCosmosWallet('capsule');
  const {
    connectAsync: connectCosmostationAsync,
    isConnected: isCosmostationConnected,
    isInstalled: isCosmostationInstalled
  } = useCosmosWallet('cosmostation');
  const {
    connectAsync: connectLeapAsync,
    isConnected: isLeapConnected,
    isInstalled: isLeapInstalled
  } = useCosmosWallet('leap');

  const allowWallets = React.useMemo(() => {
    const result = [
      {
        walletName: 'keplr' as CosmosWalletKey,
        isConnected: isKeplrConnected,
        isInstalled: isKeplrInstalled,
        onRequest: connectKeplrAsync
      },
      {
        walletName: 'capsule' as CosmosWalletKey,
        isConnected: isCapsuleConnected,
        isInstalled: isCapsuleInstalled,
        onRequest: connectCapsuleAsync
      },
      {
        walletName: 'cosmostation' as CosmosWalletKey,
        isConnected: isCosmostationConnected,
        isInstalled: isCosmostationInstalled,
        onRequest: connectCosmostationAsync
      },
      {
        walletName: 'leap' as CosmosWalletKey,
        isConnected: isLeapConnected,
        isInstalled: isLeapInstalled,
        onRequest: connectLeapAsync
      }
    ]
      .filter((item) => wallets.includes(item.walletName as CosmosWalletKey))
      .reduce((result, item) => {
        result[item.walletName] = item;
        return result;
      }, {} as Record<CosmosWalletKey, WalletListItem>);

    return result;
  }, [
    connectCapsuleAsync,
    connectCosmostationAsync,
    connectKeplrAsync,
    connectLeapAsync,
    isCapsuleConnected,
    isCapsuleInstalled,
    isCosmostationConnected,
    isCosmostationInstalled,
    isKeplrConnected,
    isKeplrInstalled,
    isLeapConnected,
    isLeapInstalled,
    wallets
  ]);

  const onSelectedWalletChange = (wallet: CosmosWalletKey | null) => {
    setSelectedWallet(wallet);

    if (wallet) {
      externalSetSelectedWallet?.(wallet);
    }
  };

  const closeModal = (delay?: number, cb?: () => void) => {
    const closeAndReset = () => {
      setIsOpen(false);
      setView('wallets');
      setStatus('requesting');
      onSelectedWalletChange(null);
      cb?.();
    };

    if (delay) {
      return setTimeout(() => {
        closeAndReset();
      }, delay);
    }

    closeAndReset();
  };

  const handleConnect = (
    walletName: CosmosWalletKey,
    connectAsync: () => Promise<boolean>,
    isConnected: boolean
  ) => {
    onSelectedWalletChange(walletName);

    const hasOnConnectSuccess = !!onConnectSuccess;
    const closeModalDelay = hasOnConnectSuccess ? 200 : 1500;

    if (isConnected) {
      setView('request');
      setStatus('connected');
      closeModal(1500, () => onConnectSuccess?.(walletName));
      return;
    }

    if (view !== 'request') {
      if (allowWallets[walletName].isInstalled) {
        setView('request');
      } else {
        return setView('install');
      }
    }

    connectAsync()
      .then((isSuccess: boolean) => {
        setStatus('requesting');

        if (isSuccess) {
          onSelectedWalletChange(walletName);
          setStatus('connected');
          closeModal(closeModalDelay, () => onConnectSuccess?.(walletName));
        }
      })
      .catch((err) => {
        setStatus('error');

        if (closeOnError) {
          closeModal(closeModalDelay, onConnectError);
        } else {
          onConnectError?.();
        }
      });
  };

  return (
    <ConnectModal
      isOpen={isOpen}
      setOpen={setIsOpen}
      showBackButton={view === 'request' || view === 'install'}
      onBack={() => {
        setView('wallets');
        setStatus('requesting');
      }}
    >
      <AnimatePresence mode="wait">
        {view === 'wallets' && (
          <motion.div
            key="wallet-list"
            transition={transitionConfig}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Stack direction="vertical" space="$8">
              {(Object.keys(allowWallets) as CosmosWalletKey[]).map((walletKey) => {
                const cosmosWallet = cosmosKitWallets.find((w) => {
                  return w.walletName === COSMOS_WALLET_KEY_TO_NAME[walletKey];
                });

                if (!cosmosWallet) return null;

                return (
                  <WalletButton
                    key={walletKey}
                    walletName={cosmosWallet.walletPrettyName}
                    walletLogoSrc={cosmosWallet.walletInfo.logo as string}
                    onPress={() => {
                      handleConnect(
                        walletKey,
                        allowWallets[walletKey].onRequest,
                        allowWallets[walletKey].isConnected
                      );
                    }}
                  />
                );
              })}
            </Stack>
          </motion.div>
        )}

        {view === 'request' && selectedCosmosKitWallet && selectedWallet && (
          <motion.div
            key="request"
            transition={transitionConfig}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ConnectViewRequestingConnection
              status={status}
              walletName={selectedCosmosKitWallet.walletPrettyName ?? ''}
              walletLogoSrc={selectedCosmosKitWallet.walletInfo.logo as string}
              onReconnect={() => {
                const wallet = allowWallets[selectedWallet];
                if (!wallet) return;

                handleConnect(wallet.walletName, wallet.onRequest, wallet.isConnected);
              }}
            />
          </motion.div>
        )}

        {view === 'install' && selectedCosmosKitWallet && selectedWallet && (
          <motion.div
            key="install"
            transition={transitionConfig}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ConnectViewInstallWallet
              walletName={selectedCosmosKitWallet.walletPrettyName ?? ''}
              walletLogoSrc={selectedCosmosKitWallet.walletInfo.logo as string}
              walletQRCode={selectedCosmosKitWallet.walletInfo.downloads![0]!.link as string}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </ConnectModal>
  );
};
