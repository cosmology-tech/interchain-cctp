import { TCosmosWallet, useConnectWallet } from '@/hooks';
import { BasicModal, Box, Button } from '@interchain-ui/react';

interface SelectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  setSelectedWallet: (name: TCosmosWallet) => void;
}

export const SelectWalletModal = ({
  isOpen,
  onClose,
  setSelectedWallet
}: SelectWalletModalProps) => {
  const { connectAsync: connectKeplrAsync, isConnected: isKeplrConnected } =
    useConnectWallet('keplr');
  const { connectAsync: connectLeapAsync, isConnected: isLeapConnected } = useConnectWallet('leap');

  const handleConnect = (
    walletName: TCosmosWallet,
    connectAsync: () => Promise<boolean>,
    isConnected: boolean
  ) => {
    if (isConnected) {
      setSelectedWallet(walletName);
      onClose();
      return;
    }
    connectAsync().then((isSuccess) => {
      if (isSuccess) {
        setSelectedWallet(walletName);
        onClose();
      }
    });
  };

  return (
    <BasicModal isOpen={isOpen} title="Select Wallet" onClose={onClose}>
      <Box display="flex" justifyContent="center" width="100%" p="$10" gap="$10">
        <Button onClick={() => handleConnect('keplr', connectKeplrAsync, isKeplrConnected)}>
          Connect Keplr
        </Button>
        <Button onClick={() => handleConnect('leap', connectLeapAsync, isLeapConnected)}>
          Connect Leap
        </Button>
      </Box>
    </BasicModal>
  );
};
