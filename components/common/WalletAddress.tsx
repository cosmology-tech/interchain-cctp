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
import {
  WALLET_KEY_TO_LOGO_URL,
  WALLET_KEY_TO_PRETTY_NAME,
  WalletKey,
  checkIsCosmosWallet
} from '@/config';

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
  const walletKey = (searchParams.get('wallet') ?? 'keplr') as WalletKey;
  const isCosmosWallet = checkIsCosmosWallet(walletKey);

  const { disconnect: disconnectMetamask } = useDisconnect();
  const { disconnect: disconnectCosmosWallet, username } = useCosmosWallet(
    isCosmosWallet ? walletKey : 'keplr'
  );

  const walletIdentifier = isCosmosWallet ? username : evmAddress;

  const onDisconnect = () => {
    if (walletKey === 'metamask') {
      disconnectMetamask();
      router.push('/');
      return;
    }
    disconnectCosmosWallet();
    router.push('/');
  };

  const walletInfo = {
    logo: WALLET_KEY_TO_LOGO_URL[walletKey],
    name: WALLET_KEY_TO_PRETTY_NAME[walletKey]
  };

  const addressColor = useColorModeValue('$textSecondary', '$primary');

  return (
    <Box display="flex" alignItems="center" gap="8px">
      <Image src={walletInfo.logo} alt={walletInfo.name} width={16} height={16} />

      {walletIdentifier && (
        <>
          <Text fontSize="$xs" fontWeight="$normal" color={addressColor}>
            {isCosmosWallet ? walletIdentifier : shortenAddress(walletIdentifier)}
          </Text>

          {!isCosmosWallet && (
            <BaseButton
              aria-label="Copy"
              onPress={() => {
                setShowSuccessIcon(true);

                copyToClipboard(walletIdentifier);

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
          )}
        </>
      )}

      <BaseButton aria-label="Exit" onPress={onDisconnect}>
        <Box height="16px">
          <ExitIcon />
        </Box>
      </BaseButton>
    </Box>
  );
}
