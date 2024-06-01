declare namespace NodeJS {
  type CapsuleEnvironment = 'DEV' | 'SANDBOX' | 'BETA' | 'PROD';

  interface ProcessEnv {
    NEXT_PUBLIC_IS_TESTNET: 'true' | 'false';
    NEXT_PUBLIC_SKIP_API_CLIENT_ID: string;
    NEXT_PUBLIC_CAPSULE_API_KEY: string;
    NEXT_PUBLIC_CAPSULE_ENV: CapsuleEnvironment;
  }
}
