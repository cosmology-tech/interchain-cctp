import { useRouter } from 'next/router';
import { RefreshIcon } from '@/components/common/icons';
import { BaseButton } from '@/components/common';
import { Text, Stack } from '@interchain-ui/react';
import { useIsMounted } from '@/hooks';

export const HistoryLink: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/history');
  };

  if (!useIsMounted()) {
    return null;
  }

  return (
    <BaseButton onPress={handleClick}>
      <Stack
        as="span"
        space="$2"
        attributes={{
          alignItems: 'center',
          paddingRight: '$10'
        }}
      >
        <Text
          as="span"
          color="$textSecondary"
          fontSize="$xs"
          attributes={{
            flexShrink: 0
          }}
        >
          <RefreshIcon />
        </Text>

        <Text as="span" color="$textSecondary" fontSize="$sm" fontWeight="$normal">
          History
        </Text>
      </Stack>
    </BaseButton>
  );
};
