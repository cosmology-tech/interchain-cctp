import { useMemo, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { RouteResponse } from '@skip-router/core';
import '@leapwallet/cosmos-social-login-capsule-provider-ui/styles.css';
import '@leapwallet/react-ui/styles.css';

import { Box, useTheme, useColorModeValue, toast } from '@interchain-ui/react';
import { Layout, SelectAmountDest, ViewStatus } from '@/components';
import { envConfig } from '@/config';

import { useCapsuleClient, useCosmosWallet, BroadcastedTx } from '@/hooks';
import { CapsuleContext } from '@/contexts/capsule.context';

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

const TransactionSigningModal = dynamic(
  () =>
    import('@leapwallet/cosmos-social-login-capsule-provider-ui').then(
      (m) => m.TransactionSigningModal
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
          setBroadcastedTxs={setBroadcastedTxs}
          transferInfo={transferInfo}
          setBridgeStep={setBridgeStep}
        />
      )
    };
    return bridgeStepsMap[bridgeStep];
  }, [bridgeStep]);

  const [oAuthMethods, setOAuthMethods] = useState<Array<any>>([]);

  useEffect(() => {
    import('@leapwallet/cosmos-social-login-capsule-provider').then((capsuleProvider) => {
      setOAuthMethods([
        capsuleProvider.OAuthMethod.GOOGLE,
        capsuleProvider.OAuthMethod.FACEBOOK,
        capsuleProvider.OAuthMethod.TWITTER
      ]);
    });
  }, []);

  return (
    <Layout>
      <CapsuleContext.Provider
        value={{ isCapsuleModalOpen: showCapsuleModal, setCapsuleModalOpen: setShowCapsuleModal }}
      >
        {currentStep}

        <Box className={`leap-ui ${theme === 'dark' ? 'dark' : ''}`}>
          <CustomCapsuleModalView
            capsule={capsuleClient}
            showCapsuleModal={showCapsuleModal}
            setShowCapsuleModal={setShowCapsuleModal}
            theme={theme}
            logoUrl={useColorModeValue(
              '/logos/interweb-logo-light.svg',
              '/logos/interweb-logo-dark.svg'
            )}
            appName={envConfig.appName}
            oAuthMethods={oAuthMethods}
            onAfterLoginSuccessful={() => {
              const toastId = toast.success('Login successful. Hang tight...');
              window.successFromCapsuleModal?.();

              connectCapsuleAsync().then((isSuccess) => {
                if (isSuccess) {
                  toast.dismiss(toastId);
                }
              });
            }}
            onLoginFailure={() => {
              window.failureFromCapsuleModal?.();
              toast.error('Login failed. Please try again.');
            }}
          />

          <TransactionSigningModal dAppInfo={{ name: 'Noble Express' }} />
        </Box>
      </CapsuleContext.Provider>
    </Layout>
  );
};

export default Bridge;
