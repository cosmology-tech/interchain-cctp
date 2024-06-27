import * as React from 'react';
import { HistoryItem, Layout } from '@/components';
import { sizes } from '@/config';
import { Box, NoblePageTitleBar, NobleButton, Divider, Text } from '@interchain-ui/react';
import { FaqList } from '@/components/common/FaqList/FaqList';
import { useTxHistory, txHistory } from '@/contexts';
import { useRouter } from 'next/router';

const TxHistoryPage = () => {
  const history = useTxHistory();
  const router = useRouter();

  const entries = React.useMemo(() => {
    return Object.entries(history).reverse();
  }, [history]);

  return (
    <Layout>
      <Box maxWidth={sizes.main.maxWidth} mx="auto" paddingTop="84px" paddingBottom="120px">
        <Box position="relative">
          <NoblePageTitleBar title="History" onBackButtonClick={() => router.back()} mb="$14" />

          {entries.length > 0 ? null : (
            // <Box position="absolute" right={0} top="50%" transform="translateY(-50%)">
            //   <NobleButton
            //     size="xs"
            //     variant="text"
            //     onClick={() => {
            //       txHistory.clearAll();
            //     }}
            //   >
            //     Clear history
            //   </NobleButton>
            // </Box>
            <Box textAlign="center" py="$10" color="$textSecondary">
              <Text>No transactions</Text>
            </Box>
          )}
        </Box>

        {entries.map(([id, data], index) => (
          <React.Fragment key={id}>
            <HistoryItem id={id} data={data} />
            {index < entries.length - 1 && <Divider my="$8" />}
          </React.Fragment>
        ))}
      </Box>

      <FaqList />
    </Layout>
  );
};

export default TxHistoryPage;
