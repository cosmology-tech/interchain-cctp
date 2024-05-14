import { CHAIN_ID_TO_PRETTY_NAME, DEFAULT_USDC_LOGO, sizes } from '@/config';
import {
  Box,
  Text,
  Stack,
  NobleProvider,
  NobleTxDirectionCard,
  NobleTxProgressBar,
  NobleTxStepItem,
  NobleButton,
  type NobleTxStepItemProps,
  Skeleton
} from '@interchain-ui/react';
import { FaqList, FadeIn } from '@/components/common';
import { BroadcastedTx, useFinalityTimeEstimate, useTxsStatus } from '@/hooks';
import type { RouteResponse } from '@skip-router/core';
import { Action, makeActions } from './utils/make-actions';
import { makeStepState } from './utils/make-step-state';
import { BridgeStep, TransferInfo } from '@/pages/bridge';
import { useMemo } from 'react';
import { calcEstimatedRemainingTime } from '@/utils';
import { useRouter } from 'next/router';
import { TxStatusIcon } from './TxStatusIcon';
import Link from 'next/link';

interface ViewStatusProps {
  route: RouteResponse;
  transferInfo: TransferInfo;
  broadcastedTxs: BroadcastedTx[];
  setBridgeStep: (step: BridgeStep) => void;
}

export const ViewStatus = ({
  route,
  broadcastedTxs,
  transferInfo,
  setBridgeStep
}: ViewStatusProps) => {
  const { data: txStatus } = useTxsStatus({
    txs: broadcastedTxs,
    txsRequired: route?.txsRequired
  });
  const estimatedFinalityTime = useFinalityTimeEstimate(route);
  const router = useRouter();

  const steps = useMemo(() => makeActions({ route }), [route]);

  const progressPercentage = useMemo(() => {
    const successfulStates = steps
      .map((step) => makeStepState({ action: step, statusData: txStatus }).state)
      .filter((state) => state === 'TRANSFER_SUCCESS');

    return successfulStates.length / steps.length;
  }, [steps, txStatus]);

  const estimatedRemainingTime = useMemo(
    () => calcEstimatedRemainingTime(estimatedFinalityTime, progressPercentage),
    [estimatedFinalityTime, progressPercentage]
  );

  const getStepStatus = (step: Action): NobleTxStepItemProps['status'] => {
    const state = makeStepState({ action: step, statusData: txStatus }).state;
    switch (state) {
      case 'TRANSFER_SUCCESS':
        return 'completed';
      case 'TRANSFER_PENDING':
        return 'processing';
      case 'TRANSFER_UNKNOWN':
        return 'pending';
      default:
        return 'pending';
    }
  };

  if (!txStatus) {
    return (
      <Box maxWidth={sizes.main.maxWidth} mx="auto" paddingTop="84px" paddingBottom="120px">
        <Skeleton height="$25" borderRadius="$lg" />
      </Box>
    );
  }

  const txSettled = (
    <>
      <Box mt="$7" mb="$16">
        {txStatus.isSuccess ? <TxStatusIcon.Success /> : <TxStatusIcon.Failed />}
      </Box>
      <Link href="https://usdc.range.org/" target="_blank" style={{ textDecoration: 'none' }}>
        <NobleButton variant="text" fontWeight="$semibold" rightIcon="arrowRightLine">
          View transaction on Range
        </NobleButton>
      </Link>
    </>
  );

  const txInProgress = (
    <>
      <Text color="$text" fontSize="$sm" fontWeight="$semibold" attributes={{ mb: '$8' }}>
        ~{estimatedRemainingTime} remaining
      </Text>
      <NobleTxProgressBar progress={100 * progressPercentage} mb="$12" />
      <Stack direction="vertical" space="14px" attributes={{ alignSelf: 'flex-start', mb: '$9' }}>
        {steps.map((step) => (
          <NobleTxStepItem key={step.text} step={step.text} status={getStepStatus(step)} />
        ))}
      </Stack>
    </>
  );

  const titleText = txStatus.isSuccess
    ? 'Transaction successful'
    : txStatus.isSettled
    ? 'Transaction failed'
    : 'Transaction in progress';

  return (
    <FadeIn>
      <Box mx="auto" paddingBottom="120px">
        <NobleProvider>
          <Box bg="$body" py="$20">
            <Box width="552px" mx="$auto">
              <Box display="flex" flexDirection="column" alignItems="center">
                <Text
                  color="$text"
                  fontSize="$xl"
                  fontWeight="$semibold"
                  attributes={{ mb: '$14' }}
                >
                  {titleText}
                </Text>

                <Stack space="18px" attributes={{ alignItems: 'center', mb: '$16' }}>
                  <Box
                    as="img"
                    width="$15"
                    height="$15"
                    attributes={{ src: DEFAULT_USDC_LOGO, alt: 'USDC' }}
                  />
                  <Text color="$text" fontSize="$3xl" fontWeight="$semibold" letterSpacing="-2%">
                    {transferInfo.amount} USDC
                  </Text>
                </Stack>

                <Stack space="$18" attributes={{ mx: '$auto', mb: '$13' }}>
                  <NobleTxDirectionCard
                    direction="From"
                    chainName={CHAIN_ID_TO_PRETTY_NAME[transferInfo.fromChainID]}
                    address={transferInfo.fromChainAddress}
                    logoUrl={transferInfo.fromChainLogo}
                  />
                  <NobleTxDirectionCard
                    direction="To"
                    chainName={CHAIN_ID_TO_PRETTY_NAME[transferInfo.toChainID]}
                    address={transferInfo.toChainAddress}
                    logoUrl={transferInfo.toChainLogo}
                  />
                </Stack>
              </Box>

              <Box
                bg="$cardBg"
                px="$14"
                py="$12"
                borderRadius="$2xl"
                mb="$14"
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                {txStatus.isSettled ? txSettled : txInProgress}
              </Box>

              <Box display="flex" flexDirection="column" alignItems="center">
                <NobleButton
                  attributes={{ mb: '18px' }}
                  onClick={() => setBridgeStep('select-token')}
                >
                  Start another transaction
                </NobleButton>
                <NobleButton variant="text" onClick={() => router.push('/')}>
                  You can close this window now
                </NobleButton>
              </Box>
            </Box>
          </Box>
        </NobleProvider>
      </Box>

      <FaqList />
    </FadeIn>
  );
};
