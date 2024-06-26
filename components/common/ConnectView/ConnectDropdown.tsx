import { Dispatch, SetStateAction } from 'react';
import { AnimatePresence, motion, Transition } from 'framer-motion';
import {
  Box,
  Text,
  Popover,
  Stack,
  PopoverTrigger,
  useColorModeValue,
  Icon,
  PopoverContent,
  NobleProvider
} from '@interchain-ui/react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import {
  ConnectViewRequestingConnection,
  ConnectViewInstallWallet,
  WalletButton
} from '@/components/common/ConnectView';
import { BaseButton } from '@/components/common/BaseButton';

import { colors, ChainType } from '@/config';

const transitionConfig: Transition = {
  type: 'tween',
  duration: 0.2,
  ease: 'easeInOut'
};

export interface ConnectDropdownWallet {
  type: ChainType;
  walletKey: string;
  triggerLabel: string;
  name: string;
  address?: string;
  downloadUrl: string;
  logoSrc: string;
  isLoading?: boolean;
  isConnected?: boolean;
  onConnect: () => void;
  onReconnect: () => void;
  onDisconnect: () => void;
}

export type ConnectViewStatus = 'wallets' | 'request' | 'install';
export type ConnectionStatus = 'requesting' | 'rejected' | 'error' | 'connected';

export interface ConnectDropdownProps {
  viewStatus: ConnectViewStatus;
  connectionStatus: ConnectionStatus;
  triggerLabel: string;
  onBack?: () => void;
  selectedWalletKey: string | null;
  wallets: ConnectDropdownWallet[];
  // ====
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function ConnectDropdown(props: ConnectDropdownProps) {
  const selectedWallet = props.wallets.find(
    (wallet) => wallet.walletKey === props.selectedWalletKey
  );
  const showBackButton = props.viewStatus !== 'wallets' && props.connectionStatus !== 'connected';

  return (
    <NobleProvider>
      <Popover
        placement="bottom"
        // @ts-ignore
        arrowRef={null}
        triggerType="click"
        offset={{ mainAxis: 10 }}
        isOpen={props.isOpen}
        setIsOpen={props.setIsOpen}
      >
        <PopoverTrigger>
          <Box display="flex" alignItems="center" gap="4px" cursor="pointer">
            <Text
              color={useColorModeValue(colors.gray500, colors.blue700)}
              fontSize="$sm"
              fontWeight="600"
            >
              {props.triggerLabel}
            </Text>
            <Icon
              name="arrowDropDown"
              size="$lg"
              color={useColorModeValue(colors.gray500, colors.blue700)}
            />
          </Box>
        </PopoverTrigger>

        <PopoverContent showArrow={false}>
          <Box
            minHeight="60px"
            borderWidth="1px"
            borderStyle="solid"
            borderColor="$inputBorder"
            borderRadius="9px"
            bg="$cardBg"
            px="$7"
            py="$7"
            color="$text"
            position="relative"
          >
            {showBackButton && (
              <Box position="absolute" top="16px" left="16px">
                <BaseButton onPress={() => props.onBack?.()}>
                  <Text color="$text" fontSize="$md">
                    <ChevronLeftIcon width="1em" height="1em" color="inherit" />
                  </Text>
                </BaseButton>
              </Box>
            )}

            <AnimatePresence mode="wait">
              {props.viewStatus === 'wallets' && (
                <motion.div
                  key="wallet-list"
                  transition={transitionConfig}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Stack
                    direction="vertical"
                    space="$4"
                    attributes={{
                      maxWidth: '176px'
                    }}
                  >
                    {props.wallets.map((wallet) => {
                      return (
                        <WalletButton
                          key={wallet.name}
                          walletName={wallet.name}
                          walletLogoSrc={wallet.logoSrc}
                          isLoading={wallet.isLoading}
                          isConnected={wallet.isConnected}
                          onPress={() => wallet.onConnect?.()}
                        />
                      );
                    })}
                  </Stack>
                </motion.div>
              )}

              {props.viewStatus === 'request' && selectedWallet && (
                <motion.div
                  key="request"
                  transition={transitionConfig}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Box maxWidth="176px">
                    <ConnectViewRequestingConnection
                      status={props.connectionStatus}
                      walletName={selectedWallet.name ?? ''}
                      walletLogoSrc={selectedWallet.logoSrc as string}
                      walletAddress={selectedWallet.address}
                      onReconnect={() => selectedWallet.onReconnect?.()}
                      onDisconnect={() => selectedWallet.onDisconnect?.()}
                    />
                  </Box>
                </motion.div>
              )}

              {props.viewStatus === 'install' && selectedWallet && (
                <motion.div
                  key="install"
                  transition={transitionConfig}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Box maxWidth="220px">
                    <ConnectViewInstallWallet
                      walletName={selectedWallet.name ?? ''}
                      walletLogoSrc={selectedWallet.logoSrc as string}
                      walletQRCode={selectedWallet.downloadUrl as string}
                    />
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </PopoverContent>
      </Popover>
    </NobleProvider>
  );
}
