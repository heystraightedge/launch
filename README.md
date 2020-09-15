# Straightedge Mainnet Launch

This repository is to coordinate the launch of the Straightedge mainnet, rebuilt on the Cosmos SDK.  Straightedge is a general-purpose smart contracting platform governed by the holders of the STR token.

The codebase can be found [here](https://github.com/heystraightedge/straightedge).

## Community

To join the community and stay up to date on the latest information on the Straightedge launch, please join the [Discord](https://discord.gg/rbamhbC).  If you're interested in running a validator, please join the #validators channel!

## Recreating Pre-Genesis

If you wish to verify the generation of [pregenesis.json](pregenesis.json) yourself, follow the steps [here](building-pregenesis/README.md).

## STR Token

The native token of the Straightedge network is known as STR.

The initial supply of the STR token is 5 billion STR.  Of this, 90% is distributed based on the participation from the Edgeware lockdrop, modified to ignore signals from deployers of contracts.  Further details about this matter can be found in [this FAQ](https://straighted.ge/faq/).

In Edgeware, 10% of the initial distribution was distributed as a founder's reward to Commonwealth Labs, Parity Technologies, and a community fund managed by Commonwealth Labs.  In the initial Straightedge distribution, this 10% (500 million tokens) is deposited directly into the on-chain governed community pool.  It is encouraged that this be distributed by governance as a founder's reward to entities that were instrumental in the creation of the Straightedge network.

Just like the smallest unit of Bitcoin and Ether are satoshis and wei respectively, the smallest unit of STR is an `astr` (atto-STR).  There are 10^18 `astr` in 1 STR.

## Claiming tokens

If you have tokens in the genesis file, and you wish to convert them into a key type that works with wallets, see [this page](./migrate.md)

## Delegation

To delegate your STR token to a validator, use the `strcli tx staking delegate` command. 
Validator addresses to delegate to can be found on any explorer, such as http://explorer.straighted.ge/

## Functionality

Similar to the [Cosmos Hub codebase (Gaia)](https://github.com/cosmos/gaia), the Straightedge blockchain inherits much of its functionality from the [core modules of the cosmos sdk](https://github.com/cosmos/cosmos-sdk/tree/master/x).  It uses the standard bank, staking, slashing, governance, upgrade, and crisis modules of the Cosmos SDK.

It also includes the [CosmWasm module](https://github.com/cosmwasm/wasmd/tree/master/x/wasm), a project built to allow WebAssembly-based smart contracting in the Cosmos SDK.  For more information of CosmWasm and tutorials on how to get started with using it, please check out the [CosmWasm website](https://www.cosmwasm.com/).

In the future, it is possible for the Straightedge to upgrade to support more smart contracting systems, such as the Cosmos SDK's [EVM module](https://github.com/chainsafe/ethermint).

In order to support the hard spoon of Edgeware lockdrop balances, we needed to add support of the SR25519 keys into the Cosmos SDK.  We would like to give special thanks to ChainSafe team for their help on some of this work.

For instructions on how to add your lockdrop keys to the Straightedge CLI wallet, please follow the instructions [here](https://github.com/heystraightedge/straightedge#importing-lockdrop-keys).

## Disclaimer

Please note that the Straightedge blockchain is highly experimental software. In these early days, we can expect to have issues, updates, and bugs. The existing tools require advanced technical skills and involve risks which are outside of the control of the developers. Any use of this open source Apache 2.0 licensed software is done at your own risk and on a “AS IS” basis, without warranties or conditions of any kind, and any and all liability of the developers for damages arising in connection to the software is excluded. Please exercise extreme caution!
