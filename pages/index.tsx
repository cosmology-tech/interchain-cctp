import { useRouter } from 'next/router';
import { NobleButton } from '@interchain-ui/react';
import { FaqList, HomeHeader, Layout } from '@/components';

export default function Home() {
  const router = useRouter();

  return (
    <Layout>
      <HomeHeader />
      <NobleButton
        width="360px"
        onClick={() => {
          router.push('/bridge');
        }}
        attributes={{
          mt: '42px',
          mb: '80px',
          mx: '$auto'
        }}
      >
        Bridge Tokens
      </NobleButton>
      <FaqList isDefaultExpanded />
    </Layout>
  );
}
