import { useMemo } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { EVM_WALLET_KEY_TO_ID, EvmWalletKey } from '@/config';

export const useEvmWallet = (walletKey: EvmWalletKey) => {
  const { address, chainId, isConnected } = useAccount();
  const { connect: _connect, connectAsync: _connectAsync, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const connector = useMemo(() => {
    const connectorId = EVM_WALLET_KEY_TO_ID[walletKey];
    return connectors.find(({ id }) => id === connectorId);
  }, [connectors]);

  const connectAsync = async () => {
    if (!connector) return false;
    return _connectAsync({ connector }).then((connectData) => !!connectData);
  };

  const connect = () => {
    if (!connector) return;
    return _connect({ connector });
  };

  const isInstalled = Boolean(connector);

  return { connect, connectAsync, address, chainId, disconnect, isInstalled, isConnected };
};
