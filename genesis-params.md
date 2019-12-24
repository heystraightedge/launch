# Kava Mainnet Genesis Parameters

## Tendermint Params

This genesis time puts global nighttime in the pacific (early-ish for San Francisco and late-ish for Korea: [Timezone chart](https://www.timeanddate.com/worldclock/meetingtime.html?month=11&day=5&year=2019&p1=224&p2=43&p3=136&p4=37&p5=33&p6=235&iv=0)).

```json
    "genesis_time": "TODO",
    "chain_id": "straightedge-1",
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
            "max_age": "1000000"
        },
        "validator": {
            "pub_key_types": [
                "ed25519"
            ]
        }
    },
```

## App State

### Bank

Start with sends enabled.

    "bank": {
        "send_enabled": true
    },

### Genutil

The list of gentxs to be filled in automatically.

    "genutil": {
        "gentxs": [...]
    },

### Crisis

Reference: [https://github.com/cosmos/cosmos-sdk/tree/master/x/crisis/spec](https://github.com/cosmos/cosmos-sdk/tree/master/x/crisis/spec)

    "crisis": {
        "constant_fee": {
            "denom": "astr",
            "amount": "50000000000000000000000"
        }
    },

### Distribution

These parameters are the same as cosmoshub-2, except:

- `withdraw_addr_enabled` is true (we are starting with sends enabled)
- The community pool tax is set to 5%
- The community pool is initiated with 10% of the initial supply (the equivalent of the Founders Reward from Edgeware).  This is intended to be distributed by governance as a reward to the individuals and entities who aided in the launch of the network.

```json
    "distribution": {
        "fee_pool": {
        "community_pool": [
          {
            "amount": "500000000000000000000000000",
            "denom": "astr"
          }
        ]
      },
      "community_tax": "0.050000000000000000",
      "base_proposer_reward": "0.010000000000000000",
      "bonus_proposer_reward": "0.040000000000000000",
      "withdraw_addr_enabled": true,
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

### Mint

These parameters are the same as cosmohub-3, except:

- `block_per_year` is calculated from testnet 3000 block time (365*24*60*60 seconds/year / 6 seconds/block = 5256000 blocks/year) ref: [https://github.com/cosmos/cosmos-sdk/issues/2846](https://github.com/cosmos/cosmos-sdk/issues/2846)

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
    },
```

### Auth

These parameters are the same as cosmoshub-2 and 1.
Note: accounts are now stored under `auth` rather than `genaccounts`

```json
    "auth": {
      "params": {
        "max_memo_characters": "512",
        "tx_sig_limit": "7",
        "tx_size_cost_per_byte": "10",
        "sig_verify_cost_ed25519": "590",
        "sig_verify_cost_secp256k1": "1000"
      },
```

### Params

`params` has no genesis state

```json
    "params": null
```

### Gov

These parameters are the same as cosmoshub-2 and 1, except:

- `max_deposit` Cosmoshub-2's value is 512atom, or $2048 at an average $4/atom. So this is set to 4500kava to keep it comparable.

Notes:

- voting period must be less than unbonding period otherwise people could vote, redelegate, then vote again.
- `max_deposit_period` and `voting_period` are 14 days

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

### Staking

These parameters are the same as cosmoshub-2 and 1.

Notes:

- `unbonding_time` is  21 days

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

These parameters are the same as cosmoshub-2 and 1.

Notes:

- `max_evidence_age` is 21 days, must be the same as unbonding period
- `signed_blocks_window` is 16.67hrs given a 6s block time.
- `downtime_jail_duration` is 10min

```json
    "slashing": {
        "params": {
            "max_evidence_age": "1814400000000000",
            "signed_blocks_window": "10000",
            "min_signed_per_window": "0.050000000000000000",
            "downtime_jail_duration": "600000000000",
            "slash_fraction_double_sign": "0.050000000000000000",
            "slash_fraction_downtime": "0.000100000000000000"
        },
        "signing_infos": {},
        "missed_blocks": {}
    },
```

### Supply

Note: neither `add-genesis-account` or `collect-gentx` modifies the supply. It's set when the chain starts based on the accounts.

```json
    "supply": {
        "supply": {
            "total": []
        }
    }
```

### Validator Vesting

This parameter sets the last block time for determining when vesting periods close after a chain restart. It's set to the zero unix time value for new chains.

```json
    "validatorvesting": {
        "previous_block_time": "1970-01-01T00:00:00Z"
    }
```