import { useQuery } from "@tanstack/react-query";

export function usePrice() {
  const query = useQuery({
    queryKey: ["usdc-price"],
    queryFn: async () => {
      const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=usd-coin&vs_currencies=usd");
      const data = await response.json();
      return data["usd-coin"].usd;
    },
    refetchInterval: 1000 * 60 * 5,
    refetchOnWindowFocus: true
  });
  return {
    query,
    price: query.data
  };
}