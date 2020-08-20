# Straightedge Testnet Genesis Parameters

## Tendermint Params

Set genesis time to February 23, 2020 at 12:00pm UTC time.
Set chain id to `straightedge-testnet-1`.

```json
    "genesis_time": "2020-01-12T12:00:00.00000Z",
    "chain_id": "straightedge-testnet-1",
```

These parameters are the same as cosmoshub-3.

```json
  "consensus_params": {
    "block": {
      "max_bytes": "200000",
      "max_gas": "2000000",
      "time_iota_ms": "1000"
    },
    "evidence": {
      "max_age_num_blocks": "1000000",
      "max_age_duration": "1814400000000000"
    },
    "validator": {
      "pub_key_types": [
        "ed25519"
      ]
    }
  },
```

## App State

### Router

For the testnet, we will start with the `wasm` routes disabled.
```json
    "router": {
      "disabled_routes": ["wasm"]
    },
```

### Wasm

The wasm module will be permissionless.
```json
    "wasm": {
      "params": {
        "code_upload_access": {
          "permission": "Everybody"
        },
        "instantiate_default_permission": "Everybody"
      }
    },
```

### Gov

These parameters are the same as cosmoshub-3, except:

- `min_deposit` is set to 5000 STR.

```json
    "gov": {
      "starting_proposal_id": "1",
      "deposits": null,
      "votes": null,
      "proposals": null,
      "deposit_params": {
        "min_deposit": [
          {
            "denom": "astr",
            "amount": "5000000000000000000000"
          }
        ],
        "max_deposit_period": "172800000000000"
      },
      "voting_params": {
        "voting_period": "172800000000000"
      },
      "tally_params": {
        "quorum": "0.334000000000000000",
        "threshold": "0.500000000000000000",
        "veto": "0.334000000000000000"
      }
    },
```

### Crisis

Reference: [https://github.com/cosmos/cosmos-sdk/tree/master/x/crisis/spec](https://github.com/cosmos/cosmos-sdk/tree/master/x/crisis/spec)
Crisis fee is 50000 STR.

```json
    "crisis": {
      "constant_fee": {
          "denom": "astr",
          "amount": "50000000000000000000000"
      }
    },
```

### Auth

These parameters are the same as cosmoshub-3.  Accounts will be filled in automatically later.
**Note: Instead of adding a `sig_verify_cost_sr25519` param, we just reuse `sig_verify_cost_ed25519` as the gas cost for SR25519 signature verification.**

```json
    "auth": {
      "params": {
        "max_memo_characters": "256",
        "tx_sig_limit": "7",
        "tx_size_cost_per_byte": "10",
        "sig_verify_cost_ed25519": "590",
        "sig_verify_cost_secp256k1": "1000"
      },
      "accounts": []
    },
```

### Bank

Start with sends enabled.
```json
  "bank": {
    "send_enabled": true
  },
```

### Distribution

These parameters are the same as cosmoshub-3, except:

- The community pool tax is set to 10%
- The community pool is initiated with 10% of the initial supply - 500000000 STR (the equivalent of the Founders Reward from Edgeware).  This is intended to be distributed by governance as a reward to the individuals and entities who aided in the launch of the network.

```json
    "distribution": {
      "params": {
        "community_tax": "0.100000000000000000",
        "base_proposer_reward": "0.010000000000000000",
        "bonus_proposer_reward": "0.040000000000000000",
        "withdraw_addr_enabled": true
      },
      "fee_pool": {
        "community_pool": [
          {
            "amount": "500000000000000000000000000",
            "denom": "astr"
          }
        ]
      },
      "delegator_withdraw_infos": [],
      "previous_proposer": "",
      "outstanding_rewards": [],
      "validator_accumulated_commissions": [],
      "validator_historical_rewards": [],
      "validator_current_rewards": [],
      "delegator_starting_infos": [],
      "validator_slash_events": []
    },
```

### Upgrade

Upgrade module's genesis state is empty.
```json
    "upgrade": {},
```

### Evidence

Max evidence age should be set to the same as the unbonding period.

```json
    "evidence": {
      "params": {
        "max_evidence_age": "1814400000000000"
      },
      "evidence": []
    },
```

### Genutil

The list of gentxs to be filled in automatically later.

```json
    "genutil": {
        "gentxs": [...]
    },
```

### Staking

These parameters are the same as cosmoshub-3 except `bond_denom` is `astr`.

```json
    "staking": {
      "params": {
        "unbonding_time": "1814400000000000",
        "max_validators": 100,
        "max_entries": 7,
        "historical_entries": 0,
        "bond_denom": "astr"
      },
      "last_total_power": "0",
      "last_validator_powers": null,
      "validators": null,
      "delegations": null,
      "unbonding_delegations": null,
      "redelegations": null,
      "exported": false
    },
```

### Slashing

These parameters are the same as cosmoshub-3.

```json
    "slashing": {
      "params": {
        "signed_blocks_window": "10000",
        "min_signed_per_window": "0.500000000000000000",
        "downtime_jail_duration": "600000000000",
        "slash_fraction_double_sign": "0.050000000000000000",
        "slash_fraction_downtime": "0.010000000000000000"
      },
      "signing_infos": {},
      "missed_blocks": {}
    },
```

### Supply

Supply starts off empty.  It will automatically be updated later once chain starts.

```json
    "supply": {
      "supply": []
    },
```



### Mint

These parameters are the same as cosmohub-3, except:

- `block_per_year` is calculated from testnet 3000 block time (365*24*60*60 seconds/year / 6 seconds/block = 5256000 blocks/year) ref: [https://github.com/cosmos/cosmos-sdk/issues/2846](https://github.com/cosmos/cosmos-sdk/issues/2846)
- `mint_denom` is `astr`

```json
    "mint": {
      "minter": {
        "inflation": "0.130000000000000000",
        "annual_provisions": "0.000000000000000000"
      },
      "params": {
        "mint_denom": "astr",
        "inflation_rate_change": "0.130000000000000000",
        "inflation_max": "0.200000000000000000",
        "inflation_min": "0.070000000000000000",
        "goal_bonded": "0.670000000000000000",
        "blocks_per_year": "5256000"
      }
    }
```