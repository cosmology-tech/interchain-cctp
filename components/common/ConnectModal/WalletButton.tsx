import { Button as AriaButton, ButtonProps as AriaButtonProps } from 'react-aria-components';
import { Box, Text, Avatar } from '@interchain-ui/react';
import { buttonReset } from '@/styles/Shared.css';

export interface ConnectWalletButtonProps extends AriaButtonProps {
  walletLogoSrc?: string;
  walletName: string;
}

export function WalletButton(props: ConnectWalletButtonProps) {
  const { walletName, walletLogoSrc, ...ariaButtonProps } = props;
  return (
    <AriaButton
      {...ariaButtonProps}
      className={buttonReset}
      style={{
        width: '100%'
      }}
    >
      <Box
        as="span"
        borderRadius="$2xl"
        height="$16"
        paddingY="$2"
        paddingX="$8"
        width="300px"
        display="inline-flex"
        justifyContent="space-between"
        alignItems="center"
        borderWidth="1px"
        borderStyle="solid"
        borderColor={{
          base: '$progressBg',
          hover: '$textSecondary'
        }}
        transition="all 0.2s"
      >
        <Text fontWeight="$semibold" fontSize="$md" color="$text">
          {walletName}
        </Text>

        <Avatar size="sm" name={walletName} src={walletLogoSrc ?? ''} />
      </Box>
    </AriaButton>
  );
}
