import { colors } from '@/config';
import { TxHistoryItem, txHistory } from '@/contexts';
import { useTxsStatus, useFinalityTimeEstimate } from '@/hooks';
import { calcEstimatedRemainingTime, getSkipChainPrettyName } from '@/utils';
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
import { useSkipChains, useUsdcAssets } from '@/hooks';
import { makeActions, Action } from '../bridge/utils/make-actions';
import { makeStepState } from '../bridge/utils/make-step-state';

interface HistoryItemProps {
  id: string;
  data: TxHistoryItem;
}

export const HistoryItem = ({ id, data }: HistoryItemProps) => {
  const { route, status, transferInfo, broadcastedTxs } = data;
  const { data: skipChains = [] } = useSkipChains();
  const { data: usdcAssets = {} } = useUsdcAssets();

  // Filter out the source chain from the destination chains
  // and chains that supports USDC
  const chainsWithUSDC = useMemo(() => {
    const usdcAssetChainIds = Object.keys(usdcAssets);

    return skipChains.filter((chain) => usdcAssetChainIds.includes(chain.chainID));
  }, [skipChains, usdcAssets]);

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

  const steps = useMemo(
    () => makeActions({ route, chains: chainsWithUSDC }),
    [chainsWithUSDC, route]
  );
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
          customStatus={status === 'failed' ? { text: 'Failed', color: colors.red300 } : undefined}
        />
      }
      renderContent={
        <>
          <Stack space="$18" attributes={{ mt: '$9', pb: '$8' }}>
            <NobleTxDirectionCard
              direction="From"
              chainName={getSkipChainPrettyName(transferInfo.fromChainID, skipChains)}
              address={transferInfo.fromChainAddress}
              logoUrl={transferInfo.fromChainLogo}
            />
            <NobleTxDirectionCard
              direction="To"
              chainName={getSkipChainPrettyName(transferInfo.toChainID, skipChains)}
              address={transferInfo.toChainAddress}
              logoUrl={transferInfo.toChainLogo}
            />
          </Stack>
          {status === 'pending' && (
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
