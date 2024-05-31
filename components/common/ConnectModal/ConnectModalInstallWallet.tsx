import { Box, Text, Divider, NobleButton, Avatar } from '@interchain-ui/react';

export interface ConnectModalInstallWalletProps {
  walletName: string;
  walletLogoSrc?: string;
  walletQRCode: string;
}
export function ConnectModalInstallWallet(props: ConnectModalInstallWalletProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="$8"
      width="300px"
      py="$10"
    >
      <Avatar name={props.walletName} size="lg" src={props.walletLogoSrc} />

      <Text
        color="$textSecondary"
        fontWeight="$semibold"
        textAlign="center"
        attributes={{
          maxWidth: '2800px'
        }}
      >
        To connect with {props.walletName}, please install the wallet extension first.
      </Text>

      <a
        href={props.walletQRCode}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: 'none'
        }}
      >
        <NobleButton size="sm">
          <Box as="span" display="flex" gap="$6" justifyContent="center" alignItems="center">
            <Text color="inherit" fontSize="$sm">
              Install {props.walletName}
            </Text>
            <Avatar name={props.walletName} size="xs" src={props.walletLogoSrc} />
          </Box>
        </NobleButton>
      </a>
    </Box>
  );
}
