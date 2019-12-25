# Straightedge GenTxs

This document includes instructions for validators who intend to participate in the launch of the Straightedge mainnet. Please note:

1. This process is intended for technically inclined people who have participated in other `cosmos-sdk` based blockchain launches. Experience running production IT systems is strongly recommended.
2. STR staked during genesis will be at risk of 5% slashing if your validator double signs. If you accidentally misconfigure your validator setup, this can easily happen, and slashed STR are not expected to be recoverable by any means. Additionally, if you double-sign, your validator will be tombstoned and you will be required to change operator and signing keys.
3. You will be creating public key accounts that are restored via their mnemonic. It is vital that you securely backup and store your mnemonic for any accounts that are created during this process. **Failure to do so can result in the irrecoverable loss of all STR tokens**.

#### Prepare Software

1. Install `strd` version v0.0.1

##### Requires Go 1.13+

```sh
git clone https://github.com/heystraightedge/straightedge
cd straightedge
git checkout v0.0.1
make install
strd init <your-validator-moniker> --chain-id straightedge-1
```

2. Recover your lockdrop account key into the Straightedge CLI Wallet

```sh
strcli keys add <your-key-name> --algo sr25519 --recover
<insert-mnemonic-here>
```

3. Sign a genesis transaction

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

**NOTE:**  If you would like to override the memo field use the `--ip` and `--node-id` flags for the `strd gentx` command above. `pubkey` can be obtained using `strd tendermint show-validator`

This will produce a file in the `~/.strd/config/gentx/` folder that has a name with the format `gentx-<node_id>.json`.

4. Rename the gentx file to `<validator-moniker>-gentx.json`
5. Fork and clone this repo and copy you gentx file into the gentx folder
   
```sh
git clone https://github.com/<your-github-handle>/mainnet
cp ~/.strd/config/gentx/<validator-moniker>-gentx.json mainet/gentxs
git add ./gentxs
git commit -m "added <validator-moniker> gentx"
git push
```

6. Open a PR to this repo with your gentx
7. Prepare to run a validating node at genesis time