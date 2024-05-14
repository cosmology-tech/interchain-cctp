import { FaqList, HomeHeader, Layout, WalletList } from '@/components';
import { useStargateClients } from '@/hooks';

export default function Home() {
  // prefetch stargate clients to increase fetching cosmos balances speed
  useStargateClients();

  return (
    <Layout>
      <HomeHeader />
      <WalletList />
      <FaqList isDefaultExpanded />
    </Layout>
  );
}
