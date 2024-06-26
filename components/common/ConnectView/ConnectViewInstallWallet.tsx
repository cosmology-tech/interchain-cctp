import { Box, Text, NobleButton, Avatar } from '@interchain-ui/react';

export interface ConnectViewInstallWalletProps {
  walletName: string;
  walletLogoSrc?: string;
  walletQRCode: string;
}

export function ConnectViewInstallWallet(props: ConnectViewInstallWalletProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="$8"
      px="$7"
    >
      <Text as="p" color="$text" fontSize="$xs" fontWeight="$semibold">
        {props.walletName}
      </Text>

      <Text
        color="$textSecondary"
        fontSize="$xs"
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
