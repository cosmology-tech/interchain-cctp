import { Box, useTheme } from '@interchain-ui/react';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      flex={1}
      attributes={{
        id: 'main-container'
      }}
    >
      <Box
        as="main"
        flex={1}
        position="relative"
        maxWidth="936px"
        height="$full"
        width="$full"
        mx="auto"
        zIndex={1}
        paddingBottom={{
          mobile: 0,
          tablet: 'calc(102px + 118px)'
        }}
        px={{
          mobile: '$6',
          tablet: '$12'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
