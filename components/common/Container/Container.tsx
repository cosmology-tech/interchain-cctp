import { Box, useTheme } from '@interchain-ui/react';
import Image from 'next/image';
import * as styles from './Container.css';

const bgMap = {
  light: {
    top: '/background/bg-light-top.svg',
    bottom: '/background/bg-light-bottom.svg'
  },
  dark: {
    top: '/background/bg-dark-top.svg',
    bottom: '/background/bg-dark-bottom.svg'
  }
} as const;

export const Container = ({ children }: { children: React.ReactNode }) => {
  const { theme = 'light' } = useTheme();

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
        position="absolute"
        top="0"
        left="0"
        zIndex={0}
        className={styles.containerBackgroundTop}
        attributes={{
          id: 'bg-top'
        }}
      >
        <Image
          priority={true}
          src={bgMap[theme ?? 'light'].top}
          alt="bg top"
          width="313"
          height="679"
        />
      </Box>

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

      <Box
        position="absolute"
        bottom="0"
        right="0"
        zIndex={0}
        className={styles.containerBackgroundBottom}
        attributes={{
          id: 'bg-bottom'
        }}
      >
        <Image
          priority={true}
          src={bgMap[theme ?? 'light'].bottom}
          alt="bg bottom"
          width="313"
          height="679"
        />
      </Box>
    </Box>
  );
};
