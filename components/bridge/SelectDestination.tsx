import { Key, useMemo } from 'react';
import {
  Box,
  Text,
  Icon,
  useTheme,
  useColorModeValue,
  NobleSelectNetworkButton,
  NobleSelectTokenButton,
  NobleChainCombobox
} from '@interchain-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import type { RouteResponse } from '@skip-router/core';

import { colors } from '@/config';
import { scrollBar } from '@/styles/Shared.css';
import { Tooltip, BaseButton } from '@/components';
import { SkipChain, useSkipChains, useUsdcAssets } from '@/hooks';
import { checkIsInvalidRoute, getOutAmount } from '@/utils';
import { WalletConnector } from './WalletConnector';
import { useCurrentWallets } from '@/contexts';

interface SelectDestinationProps {
  destChain: SkipChain | undefined;
  setDestChain: (chain: SkipChain | undefined) => void;
  sourceChainId: string | undefined;
  route: RouteResponse | undefined;
}

export const SelectDestination = ({
  route,
  destChain,
  setDestChain,
  sourceChainId
}: SelectDestinationProps) => {
  const { data: chains = [] } = useSkipChains();
  const { data: usdcAssets = {} } = useUsdcAssets();
  const { destWallet } = useCurrentWallets();

  // Filter out the source chain from the destination chains
  // and chains that supports USDC
  const destChains = useMemo(() => {
    const usdcAssetChainIds = Object.keys(usdcAssets);

    return chains.filter(
      (chain) => chain.chainID !== sourceChainId && usdcAssetChainIds.includes(chain.chainID)
    );
  }, [chains, sourceChainId, usdcAssets]);

  const handleSelectChain = (chainId: Key | null) => {
    const selectedChain = destChains.find((c) => c.chainID === chainId);

    if (selectedChain) {
      setDestChain(selectedChain);
    }
  };

  const handleChangeChain = () => {
    setDestChain(undefined);
  };

  const isInvalidRoute = checkIsInvalidRoute(route);

  const { theme } = useTheme();

  return (
    <>
      <Box display="flex" justifyContent="space-between" overflow="hidden" mb="14px">
        <WalletConnector label="Destination" chain={destChain} direction="destination" />

        <Box display={isInvalidRoute ? 'none' : 'flex'} alignItems="center" height="$min">
          <Text
            fontSize="$lg"
            fontWeight="600"
            lineHeight="$short"
            color={useColorModeValue(colors.blue50, colors.white)}
            attributes={{
              mr: route?.warning?.type === 'BAD_PRICE_WARNING' ? '8px' : '12px'
            }}
          >
            {getOutAmount(route)}
          </Text>

          {route?.warning?.type === 'BAD_PRICE_WARNING' && (
            <Tooltip.Trigger delay={0.1}>
              <BaseButton>
                <Icon name="errorWarningLine" size="$xl" color="$textWarning" />
              </BaseButton>

              <Tooltip placement="top" padding={16}>
                <Box
                  maxWidth="300px"
                  maxHeight="200px"
                  overflow="auto"
                  className={scrollBar[theme]}
                >
                  <Text color={theme === 'light' ? '$textInverse' : '$text'}>
                    Warning: Large difference in USD value of route input and output.
                    {route.warning.message}
                  </Text>
                </Box>
              </Tooltip>
            </Tooltip.Trigger>
          )}
        </Box>
      </Box>

      <AnimatePresence mode="wait">
        <motion.div
          key="combobox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {!destChain ? (
            <NobleChainCombobox
              defaultIsOpen
              onSelectionChange={handleSelectChain}
              placeholder="Search network"
              styleProps={{
                width: '100%',
                marginBottom: '36px'
              }}
            >
              {destChains.map((chain) => (
                <NobleChainCombobox.Item key={chain.chainID} textValue={chain.prettyName}>
                  <Box display="flex" justifyContent="flex-start" alignItems="center" gap="13px">
                    <Box
                      as="img"
                      borderRadius="$full"
                      width="26px"
                      height="26px"
                      attributes={{
                        src: chain.logoURI,
                        alt: chain.prettyName
                      }}
                    />
                    <Text fontSize="$sm" fontWeight="$normal" color="$textSecondary">
                      {chain.prettyName}
                    </Text>
                  </Box>
                </NobleChainCombobox.Item>
              ))}
            </NobleChainCombobox>
          ) : null}
        </motion.div>

        {destChain ? (
          <motion.div
            key="selectedChain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Box position="relative">
              <NobleSelectTokenButton
                size="xl"
                token={{
                  mainLogoUrl: '/logos/usdc.svg',
                  mainLogoAlt: 'USDC',
                  subLogoUrl: destChain.logoURI!,
                  subLogoAlt: destChain.prettyName,
                  symbol: 'USDC',
                  network: destChain.prettyName,
                  tokenAmount: '',
                  notionalValue: ''
                }}
                onClick={handleChangeChain}
              />

              <div
                style={{
                  zIndex: 0,
                  position: 'absolute',
                  top: '50%',
                  right: '0',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none'
                }}
              >
                <Text fontSize="$xs" color="$textSecondary" fontWeight="$normal">
                  Change
                </Text>
              </div>
            </Box>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};
