# Straightedge 2 Bug Fix

This document provides instructions for restarting your node to upgrade to straightedge-2 after the network halt in straightedge-1 due to a bug.

straightedge-2 

1. Shut down your current node.
2. Download the straightedge software v0.2.0

```
cd ~/straightedge
git pull
git checkout v0.2.0
make install
```

Verify you are currently running the correct version (v0.2.0) of Straightedge:

$ strd version --long
name: straightedge
server_name: strd
client_name: strcli
version: 0.2.0
commit: c6815c2ef96dca3407579365e4ece7adad57e83c
build_tags: netgo
go: go version go1.14.6 linux/amd64


3. Reset your node's state

```sh
strd unsafe-reset-all
```

4. Delete the straightedge-1 genesis file and replace it with the new genesis file for straightedge-2.

```sh
rm ~/.strd/config/genesis.json
curl https://raw.githubusercontent.com/heystraightedge/mainnet/master/genesis.json -o ~/.strd/config/genesis.json
```

Verify your genesis hash is correct.  Running

```sh
jq -S -c -M '' ~/.strd/config/genesis.json | shasum -a 256
```

should return you `d2674a19c83e01d575ebbd92a35ff7d0eab72117332dd6e70f72d3b9cfd83140`.

5. Restart your node.  The network will restart once enough validators come back online.