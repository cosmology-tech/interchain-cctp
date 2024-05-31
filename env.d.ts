declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_IS_TESTNET: 'true' | 'false';
    NEXT_PUBLIC_SKIP_API_CLIENT_ID: string;
  }
}
