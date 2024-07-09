import { useQuery } from '@tanstack/react-query';
import { useSkipClient } from '@/contexts';
import BigNumber from 'bignumber.js';

interface Args {
  amount: string;
  sourceAssetDenom: string;
  sourceAssetChainID: string;
  destAssetDenom: string;
  destAssetChainID: string;
  enabled?: boolean;
}

export const useRoute = ({
  amount,
  sourceAssetDenom,
  sourceAssetChainID,
  destAssetDenom,
  destAssetChainID,
  enabled
}: Args) => {
  const skipClient = useSkipClient();

  const isEnabled =
    !!sourceAssetDenom &&
    !!sourceAssetChainID &&
    !!destAssetDenom &&
    !!destAssetChainID &&
    BigNumber(amount).gt(0) &&
    enabled;

  return useQuery({
    queryKey: [
      'route',
      amount,
      sourceAssetDenom,
      sourceAssetChainID,
      destAssetDenom,
      destAssetChainID,
      skipClient ? 'skip-ready' : 'skip-pending'
    ],
    queryFn: async () => {
      if (!isEnabled || !skipClient) return;

      try {
        const route = await skipClient.route({
          amountIn: amount,
          sourceAssetChainID,
          sourceAssetDenom,
          destAssetChainID,
          destAssetDenom,
          allowMultiTx: true,
          allowUnsafe: true,
          smartRelay: true,
          bridges: ['IBC', 'CCTP', 'HYPERLANE'],
          experimentalFeatures: ['cctp', 'hyperlane']
        });

        if (!route.operations) {
          throw new Error('no route found');
        }

        return route;
      } catch (error) {
        throw error;
      }
    },
    retry: false,
    enabled: isEnabled
  });
};
