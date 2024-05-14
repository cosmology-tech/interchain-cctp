import { Box, useTheme } from '@interchain-ui/react';
import * as styles from './Container.css';
import {
  BgDarkBottom,
  BgDarkTop,
  BgLightBottom,
  BgLightTop
} from '@/components/common/backgrounds';

const bgMap = {
  light: {
    top: BgLightTop,
    bottom: BgLightBottom
  },
  dark: {
    top: BgDarkTop,
    bottom: BgDarkBottom
  }
} as const;

export const Container = ({ children }: { children: React.ReactNode }) => {
  const { theme = 'light' } = useTheme();

  const TopBgSvg = bgMap[theme ?? 'light'].top;
  const BottomBgSvg = bgMap[theme ?? 'light'].bottom;

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
        <TopBgSvg />
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
        <BottomBgSvg />
      </Box>
    </Box>
  );
};
