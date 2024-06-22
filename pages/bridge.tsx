import { useMemo, useState } from 'react';
import type { RouteResponse } from '@skip-router/core';

import { BroadcastedTx } from '@/hooks';
import { Layout, SelectAmountDest, ViewStatus } from '@/components';

export type BridgeStep = 'select-amount-dest' | 'view-status';

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
  const [bridgeStep, setBridgeStep] = useState<BridgeStep>('select-amount-dest');
  const [broadcastedTxs, setBroadcastedTxs] = useState<BroadcastedTx[]>([]);
  const [route, setRoute] = useState<RouteResponse>();
  const [transferInfo, setTransferInfo] = useState<TransferInfo>();

  const currentStep = useMemo(() => {
    const bridgeStepsMap: Record<BridgeStep, React.ReactNode> = {
      'select-amount-dest': (
        <SelectAmountDest
          setRoute={setRoute}
          setBridgeStep={setBridgeStep}
          setTransferInfo={setTransferInfo}
          setBroadcastedTxs={setBroadcastedTxs}
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
