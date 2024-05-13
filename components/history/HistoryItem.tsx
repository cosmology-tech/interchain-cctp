import { CHAIN_ID_TO_PRETTY_NAME } from '@/config';
import { TxHistoryItem, txHistory } from '@/contexts';
import { useTxsStatus, useFinalityTimeEstimate } from '@/hooks';
import { calcEstimatedRemainingTime } from '@/utils';
import {
  Accordion,
  Box,
  Text,
  NobleTxDirectionCard,
  NobleTxHistoryOverviewItem,
  NobleTxProgressBar,
  NobleTxStepItem,
  NobleTxStepItemProps,
  Stack
} from '@interchain-ui/react';
import { useEffect, useMemo } from 'react';
import { makeActions, Action } from '../bridge/utils/make-actions';
import { makeStepState } from '../bridge/utils/make-step-state';

interface HistoryItemProps {
  id: string;
  data: TxHistoryItem;
}

export const HistoryItem = ({ id, data }: HistoryItemProps) => {
  const { route, status, transferInfo, broadcastedTxs } = data;

  const { data: txsStatus, errorUpdateCount } = useTxsStatus({
    txs: broadcastedTxs,
    txsRequired: route?.txsRequired,
    enabled: !(data.status === 'success' || data.status === 'failed')
  });

  useEffect(() => {
    if (errorUpdateCount > 4) {
      txHistory.removeItem(id);
    }
    if (txsStatus?.isSettled) {
      if (txsStatus.isSuccess) {
        txHistory.updateStatus(id, 'success');
      }
      if (!txsStatus.isSuccess) {
        txHistory.updateStatus(id, 'failed');
      }
    }
  }, [errorUpdateCount, id, txsStatus]);

  const estimatedFinalityTime = useFinalityTimeEstimate(route);

  const steps = useMemo(() => makeActions({ route }), [route]);

  const progressPercentage = useMemo(() => {
    const successfulStates = steps
      .map((step) => makeStepState({ action: step, statusData: txsStatus }).state)
      .filter((state) => state === 'TRANSFER_SUCCESS');

    return successfulStates.length / steps.length;
  }, [steps, txsStatus]);

  const estimatedRemainingTime = useMemo(
    () => calcEstimatedRemainingTime(estimatedFinalityTime, progressPercentage),
    [estimatedFinalityTime, progressPercentage]
  );

  const getStepStatus = (step: Action): NobleTxStepItemProps['status'] => {
    const state = makeStepState({ action: step, statusData: txsStatus }).state;
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

  return (
    <Accordion
      renderTrigger={
        <NobleTxHistoryOverviewItem
          amount={transferInfo.amount}
          status={status === 'success' ? 'successful' : 'processing'}
          sourceChainLogoSrc={transferInfo.fromChainLogo}
          destinationChainLogoSrc={transferInfo.toChainLogo}
        />
      }
      renderContent={
        <>
          <Stack space="$18" attributes={{ mt: '$9', pb: '$8' }}>
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
          {!(status === 'success') && (
            <Box
              bg="$cardBg"
              px="$14"
              py="$12"
              mt="$9"
              borderRadius="$2xl"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Text color="$text" fontSize="$sm" fontWeight="$semibold" attributes={{ mb: '$8' }}>
                ~{estimatedRemainingTime} remaining
              </Text>
              <NobleTxProgressBar progress={100 * progressPercentage} mb="$12" />
              <Stack
                direction="vertical"
                space="14px"
                attributes={{ alignSelf: 'flex-start', mb: '$9' }}
              >
                {steps.map((step) => (
                  <NobleTxStepItem key={step.text} step={step.text} status={getStepStatus(step)} />
                ))}
              </Stack>
            </Box>
          )}
        </>
      }
    />
  );
};
