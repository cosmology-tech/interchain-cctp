# Interchain CCTP
This App is all about USDC.
1. Transfer USDC from EVM chains to Cosmos chains
2. Transfer USDC from Cosmos chains to EVM chains

## Install
```sh
$ yarn
$ yarn dev
```

## Skip API and Client
The work is done by Skip API and it client.

We need to do two things to create a tranfer.
1. Get a route from Skip API
2. Execute the route with Skip client.

## Deployment

1. Config Env Variables
There are 4 env variables, copy the .env.example file into .env and replace it with valid values. If you're using Vercel, make sure to add the variables in their dashboard.
```bash
NEXT_PUBLIC_IS_TESTNET=
NEXT_PUBLIC_SKIP_API_CLIENT_ID=
NEXT_PUBLIC_CAPSULE_API_KEY=
NEXT_PUBLIC_CAPSULE_ENV=
```

2. Make sure you have `yarn && yarn build` as build script.
3. Note: currently we are using SSG only, if you want to use Vercel's SSR features, edit `next.config.js` to remove this line:

```ts
{
    output: 'export'
}
```
