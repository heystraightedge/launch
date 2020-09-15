# Migrating your STR Tokens to secp keys

All users with a genesis allocation have their STR tokens initially in an account with an sr25519 key.  However, most Cosmos wallets do not yet support sr25519 keys, and so we recommend transferring your tokens to a new account with a secp256k1 key.  We provide instructions CLI commands here that allow you to migrate these tokens into a new secp256k1 key under the same mnemonic you already had.

These instructions are separated by OS. At this time, the cosmwasm library does not compile on windows, and as a consequence nor does straightedge. Windows users will have to wait to migrate their tokens.

You can migrate your tokens at any time, there is no deadline to do this.

## Setting up strcli

You can download the straightedge CLI binary from [here](https://github.com/heystraightedge/straightedge/releases/tag/v0.1.0), rename it "strcli", and mark it as executable by running `chmod +x strcli` from the command line. Place the binary in a location that is in your path, such as `/usr/local/bin`. (Do `echo $PATH` to see a list of such locations)

Or you compile it from source in the launch repository https://github.com/heystraightedge/straightedge (requires Go to be installed).

## Mac OS X

We provide a python script to ease the transition process for mac os users. At the end you will be prompted for your keychain password in order to execute the final transaction.

To run this, execute the following commands:
```
curl https://raw.githubusercontent.com/heystraightedge/launch/master/migrate.py
python migrate.py
```

(If python3 is your default python version, you may have to do `python2 migrate.py`)

Here is a sample execution of this, with a fake mnemonic
```
$ curl https://raw.githubusercontent.com/heystraightedge/launch/master/migrate.py
$ python migrate.py
Please enter your bip39 mnemonic
fake mnemonic fake mnemonic
Claiming 1000000000000000000000astr
Your new key (name in keybase is: new_secp256k1_key ) has address: str1sq089pzsn65wmycrvch3sk25jtfy29vusf0fd2
Please enter your keychain password for the following tx 1000000000000000000000astr
```
At this point you are prompted to enter your keychain password, and at the end you will see a tx hash for your transaction being included in the network.


## Linux

Execute the following commands to claim your funds:

First add the sr25519 key to the keyring as follows. You will be prompted for a password to encrypt the key locally with. Use the mnemonic you used from the fundraiser. Record the address of the srkey output by this command.
`strcli keys add old_sr25519_key --algo sr25519 --recover --output=json`

Find the balance of your sr25519 key, by running the following command but replacing `<sr_address>` with the address above.
`strcli query account <sr_address> --node=http://straightedge.rpc.sikka.tech:26657 --chain-id=straightedge-1`

Add the secp256k1 that you will to transfer funds to, using the same mnemonic as your sr25519 key.
`strcli keys add new_secp256k1_key --algo secp256k1 --recover --output=json`

Transfer the funds with the following command, replacing the `<>` quantities appropriately. The `<sr_balance>` should be formatted as `1000astr` for instance. You will need to sign off using the passphrase from earlier.
`strcli tx send <sr_address> <secp_address> <sr_balance> --node=http://straightedge.rpc.sikka.tech:26657 --chain-id=straightedge-1`

## Example linux exchange

Here is an example linux exchange, but with a fake mnemonic used:
```
$ strcli keys add old_sr25519_key --algo sr25519 --recover --output=json
> Enter your bip39 mnemonic
fake mnemonic fake mnemonic fake mnemonic
Enter keyring passphrase:
{
  "name": "old_sr25519_key",
  "type": "local",
  "address": "str1xgdpwa2jnu5z8v5z0dch9d8yhzu4pudhrv8mkm",
  "pubkey": "strpub1pha3qpfqvclnrvcwwvekwlm867var8tpsdcvh7v7dx0p5tkqhs9asmjaqewqkud0mp"
}
$ strcli query account str1xgdpwa2jnu5z8v5z0dch9d8yhzu4pudhrv8mkm
  address: str1xgdpwa2jnu5z8v5z0dch9d8yhzu4pudhrv8mkm
  coins:
  - denom: astr
    amount: "1000000000000000000000"
  public_key: strpub1pha3qpfqvclnrvcwwvekwlm867var8tpsdcvh7v7dx0p5tkqhs9asmjaqewqkud0mp
  account_number: 2789
  sequence: 0
$ strcli keys add new_secp256k1_key --algo secp256k1 --recover --output=json
> Enter your bip39 mnemonic
fake mnemonic fake mnemonic fake mnemonic
Enter keyring passphrase:
{
  "name": "old_sr25519_key",
  "type": "local",
  "address": "str1sq089pzsn65wmycrvch3sk25jtfy29vusf0fd2",
  "pubkey": "strpub1pha3qpfqvclnrvcwwvekwlm867var8tpsdcvh7v7dx0p5tkqhs9asmjaqewqkud0mp"
}
$ strcli tx send str1xgdpwa2jnu5z8v5z0dch9d8yhzu4pudhrv8mkm str1sq089pzsn65wmycrvch3sk25jtfy29vusf0fd2 1000000000000000000000astr --node=http://straightedge.rpc.sikka.tech:26657 --chain-id=straightedge-1
```
