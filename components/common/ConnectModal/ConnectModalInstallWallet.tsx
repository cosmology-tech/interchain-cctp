import { Box, QRCode, Text, Divider } from '@interchain-ui/react';

export interface ConnectModalInstallWalletProps {
  walletName: string;
  walletLogoSrc?: string;
  walletQRCode: string;
}
export function ConnectModalInstallWallet(props: ConnectModalInstallWalletProps) {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="$8">
      <QRCode value={props.walletQRCode} />

      <Divider />

      <Text>To connect with {props.walletName}, please install the wallet extension.</Text>
    </Box>
  );
}
