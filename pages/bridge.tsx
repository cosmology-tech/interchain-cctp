import { Layout, SelectAmountDest, SelectToken, SignTx, ViewStatus } from '@/components';
import { SkipChain } from '@/hooks';
import { Asset } from '@skip-router/core';
import { useMemo, useState } from 'react';

export type BridgeStep = 'select-token' | 'select-amount-dest' | 'sign-tx' | 'view-status';

export type SelectedToken = {
  chain: SkipChain;
  asset: Asset;
  balance: string;
};

const Bridge = () => {
  const [bridgeStep, setBridgeStep] = useState<BridgeStep>('select-token');
  const [sourceChainId, setSourceChainId] = useState<string>('');
  const [selectedToken, setSelectedToken] = useState<SelectedToken>();

  const currentStep = useMemo(() => {
    const bridgeStepsMap: Record<BridgeStep, React.ReactNode> = {
      'select-token': (
        <SelectToken setBridgeStep={setBridgeStep} setSelectedToken={setSelectedToken} />
      ),
      'select-amount-dest': selectedToken && (
        <SelectAmountDest setBridgeStep={setBridgeStep} selectedToken={selectedToken} />
      ),
      'sign-tx': <SignTx />,
      'view-status': <ViewStatus />
    };
    return bridgeStepsMap[bridgeStep];
  }, [bridgeStep, sourceChainId]);

  return <Layout>{currentStep}</Layout>;
};

export default Bridge;
