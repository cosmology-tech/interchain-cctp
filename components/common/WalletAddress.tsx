import Image from 'next/image';
import { Box, Text, toast, useColorModeValue } from '@interchain-ui/react';
import { shortenAddress } from '@/utils';
import { CopyIcon, ExitIcon } from '@/components/common';
import { useCopyToClipboard } from '@/hooks';
import { BaseButton } from './BaseButton';

export interface WalletAddressProps {
  walletType?: 'metamask' | 'keplr';
  address?: string;
  onDisconnect?: () => void;
}

export function WalletAddress(props: WalletAddressProps) {
  const { walletType = 'metamask', address = '', onDisconnect = () => {} } = props;

  const [_copyState, copyToClipboard] = useCopyToClipboard({
    onError: () => {
      toast.error('Failed to copy address');
    },
    onSuccess: () => {
      toast.success('Address copied');
    }
  });

  const addressColor = useColorModeValue('$textSecondary', '$primary');

  return (
    <Box display="flex" alignItems="center" gap="8px">
      {walletType === 'metamask' ? (
        <Image src="/logos/metamask.svg" alt="MetaMask" width={16} height={16} />
      ) : (
        <Image src="/logos/keplr.svg" alt="MetaMask" width={16} height={16} />
      )}

      {address ? (
        <>
          <Text fontSize="$xs" fontWeight="$normal" color={addressColor}>
            {shortenAddress(address)}
          </Text>

          <BaseButton
            aria-label="Copy"
            onPress={() => {
              copyToClipboard(address);
            }}
          >
            <Box height="16px">
              <CopyIcon />
            </Box>
          </BaseButton>
        </>
      ) : null}

      <BaseButton
        aria-label="Exit"
        onPress={() => {
          onDisconnect();
        }}
      >
        <Box height="16px">
          <ExitIcon />
        </Box>
      </BaseButton>
    </Box>
  );
}
