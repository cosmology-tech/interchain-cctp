import { useQuery } from '@tanstack/react-query';

export const useUsdcPrice = () => {
  return useQuery({
    queryKey: ['usdc-price'],
    queryFn: async () => {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=usd-coin&vs_currencies=usd'
      );
      const data = await response.json();
      return (data['usd-coin'].usd ?? 1) as number;
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  });
};
