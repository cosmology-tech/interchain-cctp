import {
  Tooltip as AriaTooltip,
  TooltipTrigger as AriaTooltipTrigger,
  OverlayArrow
} from 'react-aria-components';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useTheme, NobleProvider } from '@interchain-ui/react';
import type { TooltipProps as AriaTooltipProps } from 'react-aria-components';
import * as styles from './Tooltip.css';

interface TooltipProps extends Omit<AriaTooltipProps, 'children'> {
  padding?: number;
  children: React.ReactNode;
}

export function Tooltip({ children, padding = 32, ...props }: TooltipProps) {
  const { theme } = useTheme();

  return (
    <AriaTooltip
      {...props}
      offset={16}
      className={styles.tooltip[theme ?? 'light']}
      style={assignInlineVars({
        [styles.paddingVar]: `${padding}px`
      })}
    >
      <OverlayArrow className={styles.arrow[theme]}>
        <svg width={16} height={16} viewBox="0 0 8 8" fill="none" className={styles.arrowSvg}>
          <path
            d="M1 1 L4 4 L7 1"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </OverlayArrow>

      <NobleProvider>{children}</NobleProvider>
    </AriaTooltip>
  );
}

Tooltip.Trigger = AriaTooltipTrigger;
