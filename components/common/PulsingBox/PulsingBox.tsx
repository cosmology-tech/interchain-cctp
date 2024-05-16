import { assignInlineVars } from '@vanilla-extract/dynamic';
import { Box, useTheme } from '@interchain-ui/react';
import * as styles from './PulsingBox.css';
import { colors } from '@/config/theme';

export interface PulsingBoxProps {
  width: string;
  height: string;
  children?: React.ReactNode;
}

export const PulsingBox = (props: PulsingBoxProps) => {
  const { theme } = useTheme();

  return (
    <div
      className="pulsing-box-container"
      style={assignInlineVars({
        [styles.pulseColorVar]: theme === 'light' ? colors.blue700 : '#7310ff',
        [styles.boxWidthVar]: props.width,
        [styles.boxHeightVar]: props.height
      })}
    >
      <Box
        className="pulsing-box-inner"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width={props.width}
        height={props.height}
      >
        <div className={styles.pulsingBoxGlow} />
        <div className={styles.pulsingBox}>{props.children}</div>
      </Box>
    </div>
  );
};
