import { Button as AriaButton, ButtonProps as AriaButtonProps } from 'react-aria-components';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Box, Text, Skeleton, useTheme } from '@interchain-ui/react';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';

import { buttonReset } from '@/styles/Shared.css';
import { colors } from '@/config';

export interface ConnectWalletButtonProps extends AriaButtonProps {
  size?: 'sm' | 'md';
  walletLogoSrc?: string;
  walletName: string;
  isLoading?: boolean;
  isConnected?: boolean;
}

export function WalletButton(props: ConnectWalletButtonProps) {
  const { theme } = useTheme();

  const {
    size = 'sm',
    walletName,
    walletLogoSrc,
    isLoading,
    isDisabled,
    isConnected,
    ...ariaButtonProps
  } = props;

  return (
    <AriaButton
      {...ariaButtonProps}
      isDisabled={isLoading || isDisabled}
      className={buttonReset}
      style={{
        width: '100%'
      }}
    >
      <Box
        as="div"
        borderRadius={size === 'md' ? '$2xl' : '$md'}
        height={size === 'md' ? '$16' : '$14'}
        paddingY="$2"
        paddingX={size === 'md' ? '$8' : '$4'}
        width="300px"
        display="inline-flex"
        justifyContent="space-between"
        alignItems="center"
        borderWidth="1px"
        borderStyle="solid"
        borderColor="$progressBg"
        backgroundColor={
          props.isConnected
            ? theme === 'light'
              ? '$gray800'
              : colors.blue300
            : {
                base: '$cardBg',
                hover: theme === 'light' ? '$gray800' : colors.blue300
              }
        }
        transition="all 0.2s"
      >
        {props.isLoading ? (
          <Skeleton width="100px" height="$8" flexShrink={0} />
        ) : (
          <Text
            as="div"
            fontWeight="$semibold"
            fontSize={size === 'md' ? '$md' : '$xs'}
            color="$text"
            attributes={{
              display: 'inline-block'
            }}
          >
            {walletName}

            {props.isConnected ? (
              <Text
                as="span"
                color="$textSuccess"
                fontSize="$sm"
                attributes={{
                  marginLeft: '$2',
                  display: 'inline-block',
                  transform: 'translateY(2px)'
                }}
              >
                <CheckCircleIcon height="1em" width="1em" color="currentColor" />
              </Text>
            ) : null}
          </Text>
        )}

        <ImageWithFallback src={walletLogoSrc ?? ''} alt={walletName} width={20} height={20} />
      </Box>
    </AriaButton>
  );
}
