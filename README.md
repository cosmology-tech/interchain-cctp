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

## Sponsors

Kudos to our sponsors:

* [Noble](https://nobleassets.xyz/) funded the creation of this Interchain CCTP boilerplate

## Related

Checkout these related projects:

* [@cosmology/telescope](https://github.com/cosmology-tech/telescope) Your Frontend Companion for Building with TypeScript with Cosmos SDK Modules.
* [@cosmwasm/ts-codegen](https://github.com/CosmWasm/ts-codegen) Convert your CosmWasm smart contracts into dev-friendly TypeScript classes.
* [chain-registry](https://github.com/cosmology-tech/chain-registry) Everything from token symbols, logos, and IBC denominations for all assets you want to support in your application.
* [cosmos-kit](https://github.com/cosmology-tech/cosmos-kit) Experience the convenience of connecting with a variety of web3 wallets through a single, streamlined interface.
* [create-cosmos-app](https://github.com/cosmology-tech/create-cosmos-app) Set up a modern Cosmos app by running one command.
* [interchain-ui](https://github.com/cosmology-tech/interchain-ui) The Interchain Design System, empowering developers with a flexible, easy-to-use UI kit.
* [starship](https://github.com/cosmology-tech/starship) Unified Testing and Development for the Interchain.

## Credits

🛠 Built by Cosmology — if you like our tools, please consider delegating to [our validator ⚛️](https://cosmology.zone/validator)

## Disclaimer

AS DESCRIBED IN THE LICENSES, THE SOFTWARE IS PROVIDED “AS IS”, AT YOUR OWN RISK, AND WITHOUT WARRANTIES OF ANY KIND.

No developer or entity involved in creating this software will be liable for any claims or damages whatsoever associated with your use, inability to use, or your interaction with other users of the code or CLI, including any direct, indirect, incidental, special, exemplary, punitive or consequential damages, or loss of profits, cryptocurrencies, tokens, or anything else of value.
