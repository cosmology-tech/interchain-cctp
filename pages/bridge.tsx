import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import type { RouteResponse } from '@skip-router/core';

import { useTheme, toast } from '@interchain-ui/react';
import { BroadcastedTx } from '@/hooks';
import { Layout, SelectAmountDest, ViewStatus } from '@/components';

import { useCapsuleClient, useCosmosWallet } from '@/hooks';

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

const CustomCapsuleModalView = dynamic(
  () =>
    import('@leapwallet/cosmos-social-login-capsule-provider-ui').then(
      (m) => m.CustomCapsuleModalView
    ),
  { ssr: false }
);

const Bridge = () => {
  const { theme } = useTheme();

  const [bridgeStep, setBridgeStep] = useState<BridgeStep>('select-amount-dest');
  const [broadcastedTxs, setBroadcastedTxs] = useState<BroadcastedTx[]>([]);
  const [route, setRoute] = useState<RouteResponse>();
  const [transferInfo, setTransferInfo] = useState<TransferInfo>();

  const { connectAsync: connectCapsuleAsync, isConnected: isCapsuleConnected } =
    useCosmosWallet('capsule');

  console.log('isCapsuleConnected', isCapsuleConnected);
  const { capsuleClient } = useCapsuleClient();
  const [showCapsuleModal, setShowCapsuleModal] = useState(false);

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

  return (
    <Layout>
      <CustomCapsuleModalView
        capsule={capsuleClient}
        showCapsuleModal={showCapsuleModal}
        setShowCapsuleModal={setShowCapsuleModal}
        theme={theme}
        onAfterLoginSuccessful={() => {
          const toastId = toast.success('Login successful. Hang tight...');
          connectCapsuleAsync().then((isSuccess) => {
            if (isSuccess) {
              toast.dismiss(toastId);
            }
          });
        }}
        onLoginFailure={() => {
          toast.error('Login failed. Please try again.');
        }}
      />
      {currentStep}
    </Layout>
  );
};

export default Bridge;
