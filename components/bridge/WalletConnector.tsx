import { useEffect, useMemo, useCallback, useState, use } from 'react';
import { useAccount, useSwitchChain } from 'wagmi';

import {
  useEvmWallet,
  useCosmosWallet,
  SkipChain,
  WalletDirection,
  useSelectedWalletKeys,
  useDisclosure,
  UseEvmWalletReturnType,
  UseCosmosWalletReturnType
} from '@/hooks';
import {
  ConnectDropdown,
  ConnectDropdownWallet,
  ConnectViewStatus,
  ConnectionStatus
} from '@/components/common/ConnectView';
import {
  ChainType,
  CosmosWalletKey,
  EvmWalletKey,
  CHAIN_TYPE,
  WALLET_KEY_TO_PRETTY_NAME,
  WALLET_KEY_TO_LOGO_URL,
  WALLET_KEY_TO_DOWNLOAD_URL
} from '@/config';
import { isCosmosChain } from '@/utils';
import { useCurrentWallets } from '@/contexts';

function useWalletConnectionMap(chainId: SkipChain['chainID']) {
  const metamaskConn = useEvmWallet('metamask');
  const keplrConn = useCosmosWallet('keplr', chainId);
  const leapConn = useCosmosWallet('leap', chainId);
  const capsuleConn = useCosmosWallet('capsule', chainId);
  const cosmostationConn = useCosmosWallet('cosmostation', chainId);

  return useMemo(() => {
    return {
      evmWalletMap: {
        metamask: metamaskConn
      },
      cosmosWalletMap: {
        keplr: keplrConn,
        leap: leapConn,
        capsule: capsuleConn,
        cosmostation: cosmostationConn
      }
    } as const;
  }, [capsuleConn, cosmostationConn, keplrConn, leapConn, metamaskConn]);
}

type WalletConnectorProps = {
  label: string;
  chain: SkipChain | null | undefined;
  direction: WalletDirection;
};

export const WalletConnector = ({ label, chain, direction }: WalletConnectorProps) => {
  const [address, setAddress] = useState<string>();

  const {
    selectedEvmWalletKey,
    selectedCosmosWalletKey,
    setSelectedEvmWalletKey,
    setSelectedCosmosWalletKey
  } = useSelectedWalletKeys({ direction });

  const { setSrcWallet, setDestWallet } = useCurrentWallets();

  const { isOpen, onToggle } = useDisclosure(
    direction === 'source' ? 'source_wallet_popover' : 'dest_wallet_popover'
  );

  const selectedChainId = chain?.chainID ?? '';
  const { cosmosWalletMap, evmWalletMap } = useWalletConnectionMap(selectedChainId);

  const { switchChainAsync } = useSwitchChain();
  const { chainId: connectedChainId } = useAccount();

  const [viewStatus, setViewStatus] = useState<ConnectViewStatus>('wallets');
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('requesting');

  useEffect(() => {
    const shouldConnectCosmosChain =
      chain &&
      isCosmosChain(chain) &&
      selectedCosmosWalletKey &&
      !cosmosWalletMap[selectedCosmosWalletKey].isConnected;

    if (shouldConnectCosmosChain) cosmosWalletMap[selectedCosmosWalletKey].connect();
  }, [chain, cosmosWalletMap, selectedCosmosWalletKey]);

  const switchEvmChain = useCallback(async () => {
    if (!chain || isCosmosChain(chain) || !selectedEvmWalletKey) return;
    try {
      await switchChainAsync({ chainId: Number(chain.chainID) });
    } catch (error) {
      console.error(error);
      const wallet = evmWalletMap[selectedEvmWalletKey];
      wallet.disconnect();
      setSelectedEvmWalletKey(null);
      setViewStatus('wallets');
      setConnectionStatus('requesting');
      setSelectedWalletKey(null);
    }
  }, [chain]);

  useEffect(() => {
    const isEvmChain = chain && !isCosmosChain(chain);
    const isEvmWalletConnected =
      selectedEvmWalletKey && evmWalletMap[selectedEvmWalletKey].isConnected;
    const isChainNotSwitched = connectedChainId !== Number(chain?.chainID);

    const shouldSwitchChain =
      isEvmChain && isEvmWalletConnected && isChainNotSwitched && direction === 'source';

    if (shouldSwitchChain) switchEvmChain();
  }, [chain, selectedEvmWalletKey, evmWalletMap[selectedEvmWalletKey ?? 'metamask'].isConnected]);

  useEffect(() => {
    if (!chain) {
      setAddress(undefined);
      return;
    }
    if (isCosmosChain(chain)) {
      setAddress(
        selectedCosmosWalletKey ? cosmosWalletMap[selectedCosmosWalletKey].address : undefined
      );
      return;
    }
    setAddress(selectedEvmWalletKey ? evmWalletMap[selectedEvmWalletKey].address : undefined);
  }, [
    chain,
    selectedEvmWalletKey,
    selectedCosmosWalletKey,
    cosmosWalletMap[selectedCosmosWalletKey ?? 'keplr'].address,
    evmWalletMap[selectedEvmWalletKey ?? 'metamask'].address
  ]);

  useEffect(() => {
    const walletKey = chain
      ? isCosmosChain(chain)
        ? selectedCosmosWalletKey
        : selectedEvmWalletKey
      : null;
    const chainId = chain?.chainID;
    direction === 'source'
      ? setSrcWallet({ chainId, walletKey, address })
      : setDestWallet({ chainId, walletKey, address });
  }, [address, chain, selectedEvmWalletKey, selectedCosmosWalletKey]);

  const [selectedWalletKey, setSelectedWalletKey] = useState<CosmosWalletKey | EvmWalletKey | null>(
    null
  );

  const displayWallets: Array<ConnectDropdownWallet> = useMemo(() => {
    const setWalletKey = (walletType: ChainType, walletKey: CosmosWalletKey | EvmWalletKey) => {
      walletType === 'cosmos'
        ? setSelectedCosmosWalletKey(walletKey as CosmosWalletKey)
        : setSelectedEvmWalletKey(walletKey as EvmWalletKey);
    };

    const handleConnect =
      ({
        wallet,
        walletKey
      }: {
        wallet: UseEvmWalletReturnType | UseCosmosWalletReturnType;
        walletKey: CosmosWalletKey | EvmWalletKey;
      }) =>
      () => {
        // Internal use for transition state in ConnectDropdown
        setSelectedWalletKey(walletKey);

        if (wallet.isConnected) {
          setWalletKey(wallet.type, walletKey);
          setViewStatus('request');
          setConnectionStatus('connected');
          return;
        }

        if (viewStatus !== 'request') {
          if (wallet.isInstalled) {
            setViewStatus('request');
          } else {
            return setViewStatus('install');
          }
        }

        wallet
          .connectAsync()
          .then((isSuccessful) => {
            if (!isSuccessful) {
              setConnectionStatus('error');
              return;
            }

            setWalletKey(wallet.type, walletKey);
            setConnectionStatus('connected');
          })
          .catch((err) => {
            console.error(err);
            setConnectionStatus('error');
          });
      };

    const handleDisconnect = (wallet: UseEvmWalletReturnType | UseCosmosWalletReturnType) => () => {
      if (direction === 'source') {
        wallet.disconnect();
      }

      if (wallet.type === 'cosmos') {
        setSelectedCosmosWalletKey(null);
      } else {
        setSelectedEvmWalletKey(null);
      }

      setViewStatus('wallets');
      setConnectionStatus('requesting');
      setSelectedWalletKey(null);
    };

    const cosmosWallets = Object.entries(cosmosWalletMap).map(
      ([walletKey, wallet]) =>
        ({
          type: CHAIN_TYPE.COSMOS,
          triggerLabel: WALLET_KEY_TO_PRETTY_NAME[walletKey as unknown as CosmosWalletKey],
          name: wallet.walletName,
          walletKey: walletKey as CosmosWalletKey,
          address: address,
          isConnected: wallet.isConnected,
          isLoading: false,
          downloadUrl: wallet.chain.walletInfo.downloads![0]!.link as string,
          logoSrc: wallet.chain.walletInfo.logo as string,
          onConnect: handleConnect({ wallet, walletKey: walletKey as CosmosWalletKey }),
          onReconnect: handleConnect({ wallet, walletKey: walletKey as CosmosWalletKey }),
          onDisconnect: handleDisconnect(wallet)
        } satisfies ConnectDropdownWallet)
    );

    const evmWallets = Object.entries(evmWalletMap).map(
      ([walletKey, wallet]) =>
        ({
          type: CHAIN_TYPE.COSMOS,
          walletKey: walletKey as EvmWalletKey,
          triggerLabel: WALLET_KEY_TO_PRETTY_NAME[walletKey as unknown as EvmWalletKey],
          name: wallet.walletName,
          isConnected: wallet.isConnected,
          isLoading: false,
          downloadUrl: WALLET_KEY_TO_DOWNLOAD_URL[walletKey as unknown as EvmWalletKey],
          logoSrc: WALLET_KEY_TO_LOGO_URL[walletKey as unknown as EvmWalletKey],
          address: address,
          onConnect: handleConnect({ wallet, walletKey: walletKey as EvmWalletKey }),
          onReconnect: handleConnect({ wallet, walletKey: walletKey as EvmWalletKey }),
          onDisconnect: handleDisconnect(wallet)
        } satisfies ConnectDropdownWallet)
    );

    return chain?.chainType === CHAIN_TYPE.COSMOS ? cosmosWallets : evmWallets;
  }, [
    address,
    cosmosWalletMap,
    evmWalletMap,
    chain,
    direction,
    setSelectedCosmosWalletKey,
    setSelectedEvmWalletKey,
    viewStatus
  ]);

  const connectedWallet = chain
    ? displayWallets.find(
        ({ walletKey }) =>
          walletKey === (isCosmosChain(chain) ? selectedCosmosWalletKey : selectedEvmWalletKey)
      )
    : null;

  // Transition wallet connection state to ConnectDropdown
  // when chain or wallet connection status changes
  useEffect(() => {
    if (!chain || !connectedWallet) {
      setViewStatus('wallets');
      setConnectionStatus('requesting');
      setSelectedWalletKey(null);
      return;
    }

    if (connectedWallet.isConnected) {
      setViewStatus('request');
      setConnectionStatus('connected');
      setSelectedWalletKey(connectedWallet.walletKey as CosmosWalletKey | EvmWalletKey);
    } else {
      setViewStatus('wallets');
      setConnectionStatus('requesting');
      setSelectedWalletKey(null);
    }
  }, [chain, direction, connectedWallet]);

  const handleBack = useCallback(() => {
    if (connectedWallet?.type === CHAIN_TYPE.COSMOS) {
      setSelectedCosmosWalletKey(null);
    } else {
      setSelectedEvmWalletKey(null);
    }

    setViewStatus('wallets');
    setConnectionStatus('requesting');
    setSelectedWalletKey(null);
  }, [connectedWallet, setSelectedCosmosWalletKey, setSelectedEvmWalletKey]);

  const refreshWalletState = useCallback(() => {
    if (connectedWallet && connectedWallet.isConnected) {
      setViewStatus('request');
      setConnectionStatus('connected');
    } else {
      setViewStatus('wallets');
      setConnectionStatus('requesting');
    }
  }, [connectedWallet]);

  return (
    <ConnectDropdown
      viewStatus={viewStatus}
      connectionStatus={connectionStatus}
      triggerLabel={label}
      selectedWalletKey={selectedWalletKey}
      wallets={displayWallets}
      onBack={handleBack}
      isOpen={isOpen}
      setIsOpen={(_isOpen) => {
        if (!_isOpen) {
          refreshWalletState();
        }
        onToggle();
      }}
    />
  );
};
