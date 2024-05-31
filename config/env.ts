export const envConfig = {
  isTestnet: process.env.NEXT_PUBLIC_IS_TESTNET,
  skipApiKey: process.env.NEXT_PUBLIC_SKIP_API_CLIENT_ID
} as const;
