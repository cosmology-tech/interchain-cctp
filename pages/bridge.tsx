import { Layout, SelectAmountDest, SelectToken, SignTx, ViewStatus } from '@/components';
import { useMemo, useState } from 'react';

export type BridgeStep = 'select-token' | 'select-amount-dest' | 'sign-tx' | 'view-status';

const Bridge = () => {
  const [bridgeStep, setBridgeStep] = useState<BridgeStep>('select-token');
  const [sourceChainId, setSourceChainId] = useState<string>('');

  const currentStep = useMemo(() => {
    const bridgeStepsMap: Record<BridgeStep, React.ReactNode> = {
      'select-token': (
        <SelectToken setBridgeStep={setBridgeStep} setSourceChainId={setSourceChainId} />
      ),
      'select-amount-dest': (
        <SelectAmountDest setBridgeStep={setBridgeStep} sourceChainId={sourceChainId} />
      ),
      'sign-tx': <SignTx />,
      'view-status': <ViewStatus />
    };
    return bridgeStepsMap[bridgeStep];
  }, [bridgeStep, sourceChainId]);

  return <Layout>{currentStep}</Layout>;
};

export default Bridge;
