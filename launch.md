# Genesis Validators Launch Instructions

This document includes instructions for genesis validators who have their gentxs included in the genesis file.

Please join the #validators channel on the [Straightedge Discord](https://discord.gg/rbamhbC) to coordinate launch details, especially on day of launch.

## Instructions

1. Replace pregenesis file with final genesis (including gentxs).

```sh
rm ~/.strd/config/genesis.json
curl https://raw.githubusercontent.com/heystraightedge/mainnet/master/genesis.json -o ~/.strd/config/genesis.json
```

2. Add seed nodes and persistent peers to `config.yaml`

```sh
sed -i 's/persistent_peers = ""/persistent_peers = "346ec9481a0602ccf8d9b53138478302d0b771e9@54.36.124.100:26656,7539c53eb9893a72f2e6452ffbff4a67b9cfbec2@192.168.1.4:26656,ef29383c769d4ff7332d4c819807bb515c601067@134.122.32.31:26656,fab01981f7224665808585603dc3d68053b901cb@192.168.178.31:26656"/g' ~/.strd/config/config.toml

sed -i 's/seeds = ""/seeds = "8ad635f89a1595fad6b7b0236252b89f57d62efe@45.55.55.244:26656"/g' ~/.strd/config/config.toml
```

3. Set minimum gas prices in `app.toml`

```sh
sed -i 's/minimum-gas-prices = ""/minimum-gas-prices = "25000000000.0astr"/g' ~/.strd/config/app.toml 
```

4. Create log files for strd

```sh
sudo mkdir -p /var/log/strd && sudo touch /var/log/strd/strd.log && sudo touch /var/log/strd/strd_error.log
```

5. Create a systemd file to run the strd daemon. **Replace <your_user> where necessary.**

```sh
sudo tee /etc/systemd/system/strd.service > /dev/null <<'EOF'
[Unit]
Description=Straightedge daemon
After=network-online.target

[Service]
User=<your_user>
ExecStart=/home/<your_user>/go/bin/strd start
StandardOutput=file:/var/log/strd/strd.log
StandardError=file:/var/log/strd/strd_error.log
Restart=always
RestartSec=3
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
EOF
```

6. Start the node.

```sh
sudo systemctl enable strd
sudo systemctl start strd
```

---

The Network will start at 6pm UTC on Sept 15.  If a quorum is not reached promptly, we will coordinate further communication through the #validator channel on the [Straightedge Discord](https://discord.gg/rbamhbC).
