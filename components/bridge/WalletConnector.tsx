import { useEffect, useMemo, useCallback } from 'react';
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
import { useAccount, useSwitchChain } from 'wagmi';

import { useEvmWallet, useCosmosWallet, SkipChain, WalletDirection, useWalletKey } from '@/hooks';
import {
  colors,
  CHAIN_TYPE,
  CosmosWalletKey,
  EvmWalletKey,
  WALLET_KEY_TO_PRETTY_NAME,
  ChainType,
  WalletKey
} from '@/config';

type WalletState = {
  type: ChainType;
  walletKey: WalletKey;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => void;
  disconnect: () => void;
};

type WalletConnectorProps = {
  label: string;
  chain: SkipChain | null | undefined;
  direction: WalletDirection;
  setAddress: (address: string | undefined) => void;
};

export const WalletConnector = ({ label, chain, setAddress, direction }: WalletConnectorProps) => {
  const { evmWalletKey, cosmosWalletKey, setEvmWalletKey, setCosmosWalletKey } = useWalletKey({
    direction
  });

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

  const allWallets: WalletState[] = useMemo(() => {
    return [
      ...Object.entries(evmWalletMap).map(([walletKey, wallet]) => ({
        walletKey: walletKey as EvmWalletKey,
        type: CHAIN_TYPE.EVM,
        isConnected: wallet.isConnected,
        isConnecting: wallet.isConnecting,
        connect: wallet.connect,
        disconnect: wallet.disconnect
      })),
      ...Object.entries(cosmosWalletMap).map(([walletKey, wallet]) => ({
        walletKey: walletKey as CosmosWalletKey,
        type: CHAIN_TYPE.COSMOS,
        isConnected: wallet.isConnected,
        isConnecting: wallet.isConnecting,
        connect: wallet.connect,
        disconnect: wallet.disconnect
      }))
    ];
  }, [evmWalletMap, cosmosWalletMap]);

  const { switchChainAsync } = useSwitchChain();
  const { chainId: connectedChainId } = useAccount();

  useEffect(() => {
    const shouldConnectCosmosChain =
      isCosmosChain && cosmosWalletKey && !cosmosWalletMap[cosmosWalletKey].isConnected;

    if (shouldConnectCosmosChain) cosmosWalletMap[cosmosWalletKey].connect();
  }, [chain]);

  const switchEvmChain = useCallback(async () => {
    if (!chain || isCosmosChain || !evmWalletKey) return;
    try {
      await switchChainAsync({ chainId: Number(chain.chainID) });
    } catch (error) {
      console.error(error);
      evmWalletMap[evmWalletKey].disconnect();
    }
  }, [chain]);

  useEffect(() => {
    const shouldSwitchChain =
      chain &&
      !isCosmosChain &&
      evmWalletKey &&
      evmWalletMap[evmWalletKey].isConnected &&
      connectedChainId !== Number(chain.chainID) &&
      direction === 'source';

    if (shouldSwitchChain) switchEvmChain();
  }, [chain, evmWalletMap[evmWalletKey ?? 'metamask'].isConnected]);

  useEffect(() => {
    if (isCosmosChain) {
      setAddress(cosmosWalletKey ? cosmosWalletMap[cosmosWalletKey].address : undefined);
      return;
    }
    setAddress(evmWalletKey ? evmWalletMap[evmWalletKey].address : undefined);
  }, [
    isCosmosChain,
    cosmosWalletMap[cosmosWalletKey ?? 'keplr'].address,
    evmWalletMap[evmWalletKey ?? 'metamask'].address
  ]);

  const displayedWallets = allWallets.filter((wallet) => wallet.type === chain?.chainType);
  const connectedWallet = displayedWallets.find(
    (wallet) => wallet.walletKey === (isCosmosChain ? cosmosWalletKey : evmWalletKey)
  );

  const handleConnect = (wallet: WalletState) => () => {
    wallet.connect();
    wallet.type === 'cosmos'
      ? setCosmosWalletKey(wallet.walletKey as CosmosWalletKey)
      : setEvmWalletKey(wallet.walletKey as EvmWalletKey);
  };

  const handleDisconnect = (wallet: WalletState) => () => {
    if (direction === 'source') wallet.disconnect();
    wallet.type === 'cosmos' ? setCosmosWalletKey(null) : setEvmWalletKey(null);
  };

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
          p="12px 16px"
        >
          <Text textAlign="center" attributes={{ mb: '6px' }}>
            {connectedWallet?.isConnected ? 'Connected' : 'Connect'}
          </Text>
          {connectedWallet?.isConnected ? (
            <Button
              key={connectedWallet.walletKey}
              size="sm"
              onClick={handleDisconnect(connectedWallet)}
              isLoading={connectedWallet.isConnecting}
              rightIcon={direction === 'source' ? 'close' : 'pencilLine'}
              iconSize="$lg"
            >
              {WALLET_KEY_TO_PRETTY_NAME[connectedWallet.walletKey]}
            </Button>
          ) : (
            displayedWallets.map((wallet) => (
              <Button
                key={wallet.walletKey}
                size="sm"
                onClick={handleConnect(wallet)}
                isLoading={wallet.isConnecting}
              >
                {WALLET_KEY_TO_PRETTY_NAME[wallet.walletKey]}
              </Button>
            ))
          )}
        </Box>
      </PopoverContent>
    </Popover>
  );
};