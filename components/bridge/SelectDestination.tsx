import { Key, useMemo } from 'react';
import {
  Box,
  Text,
  Icon,
  useTheme,
  useColorModeValue,
  NobleSelectNetworkButton,
  NobleChainCombobox
} from '@interchain-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import type { RouteResponse } from '@skip-router/core';

import { colors } from '@/config';
import { scrollBar } from '@/styles/Shared.css';
import { Tooltip, BaseButton } from '@/components';
import { SkipChain, useSkipChains } from '@/hooks';
import { checkIsInvalidRoute, getOutAmount } from '@/utils';
import { WalletConnector } from './WalletConnector';

interface SelectDestinationProps {
  destChain: SkipChain | null;
  setDestChain: (chain: SkipChain | null) => void;
  destAddress: string | undefined;
  setDestAddress: (address: string | undefined) => void;
  sourceChainId: string;
  route: RouteResponse | undefined;
}

export const SelectDestination = ({
  route,
  destChain,
  setDestChain,
  destAddress,
  setDestAddress,
  sourceChainId
}: SelectDestinationProps) => {
  const { data: chains = [] } = useSkipChains();

  const destChains = useMemo(() => {
    return chains.filter((chain) => chain.chainID !== sourceChainId);
  }, [chains, sourceChainId]);

  const handleSelectChain = (chainId: Key) => {
    const selectedChain = destChains.find((c) => c.chainID === chainId);

    if (selectedChain) {
      setDestChain(selectedChain);
    }
  };

  const handleChangeChain = () => {
    setDestChain(null);
    setDestAddress(undefined);
  };

  const isInvalidRoute = checkIsInvalidRoute(route);

  const { theme } = useTheme();

  return (
    <>
      <Box display="flex" justifyContent="space-between" overflow="hidden" mb="14px">
        <WalletConnector
          label="Destination"
          chain={destChain}
          setAddress={setDestAddress}
          direction="destination"
        />

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
                    Bad Price Warning: {route.warning.message}
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
            <NobleSelectNetworkButton
              logoUrl={destChain.logoURI!}
              title={destChain.prettyName}
              subTitle={destAddress ?? ''}
              actionLabel="Change"
              size="lg"
              onClick={handleChangeChain}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};
