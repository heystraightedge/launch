# Verifying Pregenesis

If you wish to verify the generation of [pregenesis.json](../pregenesis.json) yourself, the following steps can be take:

1. Creating new genesis file using `strd init [name]`
2. Modify the genesis parameters using the instructions [here](./building-genesis/genesis-params.md)
3. Install the [straightedge-lockdrop](https://github.com/heystraightedge/straightedge-lockdrop) software and follow setup instructions.
4. Generate [balances.json](building-genesis/balances.json) by running `node ./scripts/lockdrop.js --allocation`.  This constructs the file using on-chain data from Ethereum.  Note that an Ethereum archival node is neccesary for this step.
5. Use `strd import-lockdrop-balances balances.json` to populate genesis with lockdrop balances.
6. Change chain-id in genesis file to `straightedge-1`
7. TODO: Genesis Time