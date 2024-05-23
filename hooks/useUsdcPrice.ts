import { useQuery } from '@tanstack/react-query';

export const useUsdcPrice = () => {
  return useQuery({
    queryKey: ['usdc-price'],
    queryFn: async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=usd-coin&vs_currencies=usd'
        );
        const data = await response.json();
        return data['usd-coin'].usd;
      } catch (error) {
        return 1;
      }
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  });
};
