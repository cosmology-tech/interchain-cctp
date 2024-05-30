import * as React from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Box, Text, toast, useColorModeValue } from '@interchain-ui/react';
import { shortenAddress } from '@/utils';
import { CopyIcon, ExitIcon, CheckCircleIcon } from '@/components/common';
import { useCopyToClipboard, useCosmosWallet } from '@/hooks';
import { BaseButton } from './BaseButton';
import { useSearchParams } from 'next/navigation';
import { useAccount, useDisconnect } from 'wagmi';
import { useRouter } from 'next/router';
import { WalletKey, checkIsCosmosWallet } from '@/config';

export function WalletAddress() {
  const { address: evmAddress } = useAccount();

  const [showSuccessIcon, setShowSuccessIcon] = React.useState(false);
  const [_copyState, copyToClipboard] = useCopyToClipboard({
    onError: () => {
      toast.error('Failed to copy address');
    }
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const walletKey = searchParams.get('wallet') as WalletKey;
  const address = checkIsCosmosWallet(walletKey) ? '' : evmAddress;

  const { disconnect: disconnectMetamask } = useDisconnect();
  const { disconnect: disconnectCosmosWallet } = useCosmosWallet(
    checkIsCosmosWallet(walletKey) ? walletKey : 'keplr'
  );

  const onDisconnect = () => {
    if (walletKey === 'metamask') {
      disconnectMetamask();
      router.push('/');
      return;
    }
    disconnectCosmosWallet();
    router.push('/');
  };

  const addressColor = useColorModeValue('$textSecondary', '$primary');

  return (
    <Box display="flex" alignItems="center" gap="8px">
      {walletKey === 'metamask' ? (
        <Image src="/logos/metamask.svg" alt="MetaMask" width={16} height={16} />
      ) : walletKey === 'keplr' ? (
        <Image src="/logos/keplr.svg" alt="Keplr" width={16} height={16} />
      ) : (
        <Image src="/logos/leap.svg" alt="Leap" width={16} height={16} />
      )}

      {address ? (
        <>
          <Text fontSize="$xs" fontWeight="$normal" color={addressColor}>
            {shortenAddress(address)}
          </Text>

          <BaseButton
            aria-label="Copy"
            onPress={() => {
              setShowSuccessIcon(true);

              copyToClipboard(address);

              setTimeout(() => {
                setShowSuccessIcon(false);
              }, 1000);
            }}
          >
            <AnimatePresence mode="wait">
              {showSuccessIcon ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                >
                  <Box as="span" maxHeight="16px" color="$textSuccess">
                    <CheckCircleIcon />
                  </Box>
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                >
                  <Box as="span" maxHeight="16px">
                    <CopyIcon />
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </BaseButton>
        </>
      ) : null}

      <BaseButton aria-label="Exit" onPress={onDisconnect}>
        <Box height="16px">
          <ExitIcon />
        </Box>
      </BaseButton>
    </Box>
  );
}
