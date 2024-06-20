import { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Text,
  Popover,
  Button,
  PopoverTrigger,
  useColorModeValue,
  Icon,
  PopoverContent
} from '@interchain-ui/react';

import { useEvmWallet, useCosmosWallet, SkipChain } from '@/hooks';
import {
  colors,
  CHAIN_TYPE,
  CosmosWalletKey,
  EvmWalletKey,
  WALLET_KEY_TO_PRETTY_NAME
} from '@/config';

type WalletConnectProps = {
  label: string;
  chain: SkipChain | null | undefined;
  setAddress: (address: string | undefined) => void;
};

export const WalletConnector = ({ label, chain, setAddress }: WalletConnectProps) => {
  const [selectedEvmWallet, setSelectedEvmWallet] = useState<EvmWalletKey | null>(null);
  const [selectedCosmosWallet, setSelectedCosmosWallet] = useState<CosmosWalletKey | null>(null);

  const selectedChainId = chain?.chainID ?? '';
  const isCosmosChain = chain?.chainType === CHAIN_TYPE.COSMOS;

  const evmWalletMap: Record<EvmWalletKey, ReturnType<typeof useEvmWallet>> = {
    metamask: useEvmWallet('metamask')
  };

  const cosmosWalletMap: Record<CosmosWalletKey, ReturnType<typeof useCosmosWallet>> = {
    keplr: useCosmosWallet('keplr', selectedChainId),
    leap: useCosmosWallet('leap', selectedChainId),
    capsule: useCosmosWallet('capsule', selectedChainId),
    cosmostation: useCosmosWallet('cosmostation', selectedChainId)
  };

  useEffect(() => {
    if (
      isCosmosChain &&
      selectedCosmosWallet &&
      !cosmosWalletMap[selectedCosmosWallet].isConnected
    ) {
      cosmosWalletMap[selectedCosmosWallet].connect();
    }

    if (!isCosmosChain && selectedEvmWallet && !evmWalletMap[selectedEvmWallet].isConnected) {
      evmWalletMap[selectedEvmWallet].connect();
    }
  }, [isCosmosChain, selectedEvmWallet, selectedCosmosWallet, cosmosWalletMap, evmWalletMap]);

  useEffect(() => {
    if (isCosmosChain) {
      setAddress(selectedCosmosWallet ? cosmosWalletMap[selectedCosmosWallet].address : undefined);
      return;
    }
    setAddress(selectedEvmWallet ? evmWalletMap[selectedEvmWallet].address : undefined);
  }, [isCosmosChain, cosmosWalletMap, evmWalletMap, selectedEvmWallet, selectedCosmosWallet]);

  return (
    <Popover
      placement="bottom"
      // @ts-ignore
      arrowRef={null}
      triggerType="click"
      offset={{ mainAxis: 10 }}
    >
      <PopoverTrigger>
        <Box display="flex" alignItems="center" gap="4px" cursor="pointer">
          <Text
            color={useColorModeValue(colors.gray500, colors.blue700)}
            fontSize="14px"
            fontWeight="600"
          >
            {label}
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
          borderWidth="1px"
          borderStyle="solid"
          borderColor="$inputBorder"
          display="flex"
          flexDirection="column"
          gap="6px"
          bg="$white"
          p="10px 16px"
        >
          {isCosmosChain
            ? (Object.keys(cosmosWalletMap) as CosmosWalletKey[]).map((walletKey) => (
                <Button
                  key={walletKey}
                  size="sm"
                  onClick={
                    cosmosWalletMap[walletKey].isConnected
                      ? () => {
                          cosmosWalletMap[walletKey].disconnect();
                          setSelectedCosmosWallet(null);
                        }
                      : () => {
                          cosmosWalletMap[walletKey].connect();
                          setSelectedCosmosWallet(walletKey);
                        }
                  }
                  isLoading={cosmosWalletMap[walletKey].isConnecting}
                >
                  {WALLET_KEY_TO_PRETTY_NAME[walletKey]} -&nbsp;
                  {cosmosWalletMap[walletKey].isConnected ? 'Connected' : 'Connect'}
                </Button>
              ))
            : (Object.keys(evmWalletMap) as EvmWalletKey[]).map((walletKey) => (
                <Button
                  key={walletKey}
                  size="sm"
                  onClick={
                    evmWalletMap[walletKey].isConnected
                      ? () => {
                          evmWalletMap[walletKey].disconnect();
                          setSelectedEvmWallet(null);
                        }
                      : () => {
                          evmWalletMap[walletKey].connect();
                          setSelectedEvmWallet(walletKey);
                        }
                  }
                  isLoading={evmWalletMap[walletKey].isConnecting}
                >
                  {WALLET_KEY_TO_PRETTY_NAME[walletKey]} -&nbsp;
                  {evmWalletMap[walletKey].isConnected ? 'Connected' : 'Connect'}
                </Button>
              ))}
        </Box>
      </PopoverContent>
    </Popover>
  );
};
