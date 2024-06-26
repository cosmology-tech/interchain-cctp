import { useMemo } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { EVM_WALLET_KEY_TO_ID, WALLET_KEY_TO_PRETTY_NAME, EvmWalletKey, ChainType } from '@/config';

type WagmiAccount = ReturnType<typeof useAccount>;

export type UseEvmWalletReturnType = {
  type: ChainType;
  walletName: string;
  isConnected: boolean;
  isDisconnected: boolean;
  isConnecting: boolean;
  isInstalled: boolean;
  connect: () => void;
  connectAsync: () => Promise<boolean>;
  disconnect: () => void;
  username?: string;
  chainId: WagmiAccount['chainId'];
  address: WagmiAccount['address'];
};

export const useEvmWallet = (walletKey: EvmWalletKey) => {
  const { address, chainId, isConnected } = useAccount();
  const { connect: _connect, connectAsync: _connectAsync, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const connector = useMemo(() => {
    const connectorId = EVM_WALLET_KEY_TO_ID[walletKey];
    return connectors.find(({ id }) => id === connectorId);
  }, [connectors, walletKey]);

  const connectAsync = async () => {
    if (!connector) return false;
    return _connectAsync({ connector }).then((connectData) => !!connectData);
  };

  const connect = () => {
    if (!connector) return;
    return _connect({ connector });
  };

  const isInstalled = Boolean(connector);

  return {
    type: 'evm',
    walletName: WALLET_KEY_TO_PRETTY_NAME[walletKey],
    connect,
    connectAsync,
    address,
    chainId,
    disconnect,
    isInstalled,
    isConnected,
    isDisconnected: !isConnected,
    isConnecting: isPending
  } satisfies UseEvmWalletReturnType;
};
