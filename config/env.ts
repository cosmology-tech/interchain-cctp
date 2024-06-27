export const envConfig = {
  appName: process.env.NEXT_PUBLIC_APP_NAME,
  isTestnet: process.env.NEXT_PUBLIC_IS_TESTNET,
  skipApiKey: process.env.NEXT_PUBLIC_SKIP_API_CLIENT_ID,
  capsuleApiKey: process.env.NEXT_PUBLIC_CAPSULE_API_KEY,
  capsuleEnv: process.env.NEXT_PUBLIC_CAPSULE_ENV
} as const;
