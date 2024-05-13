import { Layout, SelectAmountDest, SelectToken, ViewStatus } from '@/components';
import { BroadcastedTx, SkipChain } from '@/hooks';
import type { Asset, RouteResponse } from '@skip-router/core';
import { useMemo, useState } from 'react';

export type BridgeStep = 'select-token' | 'select-amount-dest' | 'view-status';

export type SelectedToken = {
  chain: SkipChain;
  asset: Asset;
  balance: string;
};

export type TransferInfo = {
  amount: string;
  fromChainID: string;
  fromChainAddress: string;
  fromChainLogo: string;
  toChainID: string;
  toChainAddress: string;
  toChainLogo: string;
};

const Bridge = () => {
  const [bridgeStep, setBridgeStep] = useState<BridgeStep>('select-token');
  const [selectedToken, setSelectedToken] = useState<SelectedToken | null>(null);
  const [broadcastedTxs, setBroadcastedTxs] = useState<BroadcastedTx[]>([]);
  const [route, setRoute] = useState<RouteResponse | null>(null);
  const [transferInfo, setTransferInfo] = useState<TransferInfo | null>(null);

  const currentStep = useMemo(() => {
    const bridgeStepsMap: Record<BridgeStep, React.ReactNode> = {
      'select-token': (
        <SelectToken setBridgeStep={setBridgeStep} setSelectedToken={setSelectedToken} />
      ),
      'select-amount-dest': selectedToken && (
        <SelectAmountDest
          selectedToken={selectedToken}
          setRoute={setRoute}
          setBridgeStep={setBridgeStep}
          setBroadcastedTxs={setBroadcastedTxs}
          setTransferInfo={setTransferInfo}
        />
      ),
      'view-status': route && transferInfo && (
        <ViewStatus
          route={route}
          broadcastedTxs={broadcastedTxs}
          transferInfo={transferInfo}
          setBridgeStep={setBridgeStep}
        />
      )
    };
    return bridgeStepsMap[bridgeStep];
  }, [bridgeStep]);

  return <Layout>{currentStep}</Layout>;
};

export default Bridge;
