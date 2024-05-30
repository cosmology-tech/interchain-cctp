import * as React from 'react';
import { wallets } from 'cosmos-kit';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ConnectModal,
  ConnectModalRequestingConnection,
  WalletButton
} from '@/components/common/ConnectModal';
import { useCosmosWallet } from '@/hooks';
import { Stack } from '@interchain-ui/react';
import { CosmosWalletKey } from '@/config';

interface SelectWalletModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setSelectedWallet: (name: CosmosWalletKey) => void;
}

const springTransition = {
  type: 'spring',
  stiffness: 700,
  damping: 30
};

export const SelectWalletModal = ({
  isOpen,
  setIsOpen,
  setSelectedWallet: externalSetSelectedWallet
}: SelectWalletModalProps) => {
  const [view, setView] = React.useState<'wallets' | 'request'>('wallets');
  const [status, setStatus] = React.useState<'requesting' | 'rejected' | 'error' | 'connected'>(
    'requesting'
  );
  const [selectedWallet, setSelectedWallet] = React.useState<CosmosWalletKey | null>(null);

  const { connectAsync: connectKeplrAsync, isConnected: isKeplrConnected } =
    useCosmosWallet('keplr');
  const { connectAsync: connectLeapAsync, isConnected: isLeapConnected } =
    useCosmosWallet('capsule');

  const onSelectedWalletChange = (wallet: CosmosWalletKey | null) => {
    setSelectedWallet(wallet);

    if (wallet) {
      externalSetSelectedWallet(wallet);
    }
  };

  const closeModal = (delay?: number) => {
    const closeAndReset = () => {
      setIsOpen(false);
      setView('wallets');
      setStatus('requesting');
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
    if (isConnected) {
      onSelectedWalletChange(walletName);
      setStatus('connected');
      closeModal(1500);
      return;
    }

    if (view !== 'request') {
      setView('request');
    }

    connectAsync()
      .then((isSuccess: boolean) => {
        setStatus('requesting');

        if (isSuccess) {
          onSelectedWalletChange(walletName);
          setStatus('connected');
          closeModal(1500);
        }
      })
      .catch((err) => {
        setStatus('error');
      });
  };

  return (
    <ConnectModal
      isOpen={isOpen}
      setOpen={setIsOpen}
      showBackButton={view === 'request'}
      onBack={() => {
        setView('wallets');
        setStatus('requesting');
      }}
    >
      {view === 'wallets' && (
        <AnimatePresence>
          <motion.div
            transition={springTransition}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Stack direction="vertical" space="$8">
              <WalletButton
                walletName={wallets.keplr[0].walletPrettyName ?? ''}
                walletLogoSrc={wallets.keplr[0].walletInfo.logo as string}
                onPress={() => {
                  handleConnect('keplr', connectKeplrAsync, isKeplrConnected);
                }}
              />
              <WalletButton
                walletName={wallets.leap[0].walletPrettyName ?? ''}
                walletLogoSrc={wallets.leap[0].walletInfo.logo as string}
                onPress={() => {
                  handleConnect('capsule', connectLeapAsync, isLeapConnected);
                }}
              />
            </Stack>
          </motion.div>
        </AnimatePresence>
      )}

      {view === 'request' && (
        <AnimatePresence>
          <motion.div
            transition={springTransition}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ConnectModalRequestingConnection
              status={status}
              walletName={wallets.keplr[0].walletPrettyName ?? ''}
              walletLogoSrc={wallets.keplr[0].walletInfo.logo as string}
              onTryAgain={() => {
                if (selectedWallet && selectedWallet === 'keplr') {
                  return handleConnect('keplr', connectKeplrAsync, isKeplrConnected);
                }
                if (selectedWallet && selectedWallet === 'capsule') {
                  return handleConnect('capsule', connectLeapAsync, isLeapConnected);
                }
              }}
            />
          </motion.div>
        </AnimatePresence>
      )}
    </ConnectModal>
  );
};
