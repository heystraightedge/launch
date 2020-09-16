# Straightedge GenTxs

This document includes instructions for validators who intend to participate in the launch of the Straightedge testnet. Please note:

1. You must have a genesis allocation in the Straightedge mainnet, meaning you must have participated in the Edgeware Lockdrop according to the [modified Straightedge rules](https://straighted.ge/faq/).
2. This process is intended for technically inclined people who have participated in other `cosmos-sdk` based blockchain launches. Experience running production IT systems is strongly recommended.
3. It is recommended you follow this process on the machine that will run the validator, so that the consensus public key and the seed node information included in your gentx is correct.

Please join the #validators channel on the [Straightedge Discord](https://discord.gg/rbamhbC) for any questions or help!

### Disclaimer:

STR staked during genesis will be at risk of 5% slashing if your validator double signs. If you accidentally misconfigure your validator setup, this can easily happen, and slashed STR are not expected to be recoverable by any means. Additionally, if you double-sign, your validator will be tombstoned and you will be required to change operator and signing keys.

You will be creating public key accounts that are restored via their mnemonic. It is vital that you securely backup and store your mnemonic for any accounts that are created during this process. **Failure to do so can result in the irrecoverable loss of all STR tokens**.

## Instructions

#### Prepare Software

1. Install `strd` tag `v0.1.0`

##### Requires Go 1.14+ ([instructions](https://golang.org/doc/install)) and gcc

```sh
git clone https://github.com/heystraightedge/straightedge
cd straightedge
git checkout v0.1.0
make install
strd init <your-validator-moniker>
```

2. Replace generated genesis file with pregenesis.json

```sh
cd ~/.strd/config
rm genesis.json
curl https://raw.githubusercontent.com/heystraightedge/mainnet/master/pregenesis.json -o genesis.json
```

3. Recover your lockdrop account key into the Straightedge CLI Wallet

```sh
strcli keys add <your-key-name> --algo sr25519 --recover
<insert-mnemonic-here>
```

4. Check your [astr](../README.md#str-token) balance in the genesis allocation using the address created in the previous command.

```sh
grep -A 6 <your-address> genesis.json
```

5. Get your consensus pubkey

```sh
strd tendermint show-validator
```

6. Sign a genesis transaction.  Fill in the consensus pubkey, an initial stake less than your balance, commission rate info, and the key's name in the CLI wallet.

```sh
strd gentx \
  --amount <amount>astr \
  --min-self-delegation <min_self_delegation> \
  --commission-rate <commission_rate> \
  --commission-max-rate <commission_max_rate> \
  --commission-max-change-rate <commission_max_change_rate> \
  --pubkey <consensus_pubkey> \
  --name <key_name>
```

**NOTE:**  If you would like to override the memo field, use the `--ip` and `--node-id` flags for the `strd gentx` command above.

This will produce a file in the `~/.strd/config/gentx/` folder that has a name with the format `gentx-<node_id>.json`.

7. Rename the gentx file to `gentx-<validator-moniker>.json`
8. Fork and clone this repo and copy you gentx file into the gentx folder
  
```sh
git clone https://github.com/<your-github-handle>/mainnet
cd mainnet
cp ~/.strd/config/gentx/<validator-moniker>-gentx.json gentxs
git add ./gentxs
git commit -m "added <validator-moniker> gentx"
git push
```

9. Open a PR to this repo with your gentx
10. Submit by September 8, 2020 at 12:00pm UTC.
11. Join the #validators channel of the [Straightedge Discord](https://discord.gg/rbamhbC) for directions on next steps to launch network.
