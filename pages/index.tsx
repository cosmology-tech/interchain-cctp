import { FaqList, HomeHeader, Layout, WalletList } from '@/components';

export default function Home() {
  return (
    <Layout>
      <HomeHeader />
      <WalletList />
      <FaqList isDefaultExpanded />
    </Layout>
  );
}
