#!/bin/python2
# Executes the following commands
# strcli keys add old_sr25519_key --algo sr25519 --recover --output=json
# strcli keys add new_secp_key --algo secp256k1 --recover --output=json
# strcli query account <sr_address> --output=json
# strcli tx send old_sr25519_key <secp_address> <sr balance>

chain_id = "straightedge-1"
node_url = "http://straightedge.rpc.sikka.tech:26657"

import json
import subprocess
import time
import random
import sys

secp_key_name = "new_secp_key"
if len(sys.argv) == 2:
    secp_key_name = sys.argv[1]

r = random.randint(0, 1000)
# Make script python2 compatible
try:
    input = raw_input
except NameError:
    pass

def run_add_srkey(mnemonic):
    cmd = "strcli keys add old_sr25519_key_" + str(r) + " --algo sr25519 --recover --output=json"
    proc = subprocess.Popen(cmd.split(" "), stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    out,err = proc.communicate(input=mnemonic + "\n")
    err = err.strip()
    return err

def run_add_secpkey(mnemonic):
    cmd = "strcli keys add " + secp_key_name + " --algo secp256k1 --recover --output=json"
    proc = subprocess.Popen(cmd.split(" "), stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    out,err = proc.communicate(input=mnemonic + "\n")
    err = err.strip()
    return err

def run_querycmd(sr_address):
    cmd = "strcli query account " + sr_address + " --output=json"
    proc = subprocess.Popen(cmd.split(" "), stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    out,err = proc.communicate()
    # print(out, err)
    out = out.strip()
    return out

def run_sendcmd(sr_addr, secp_addr, amt):
    cmd = ("strcli tx send " + sr_addr + " " + secp_addr + " " + amt + 
        " --chain-id=" + chain_id + " --node=" + node_url)
    proc = subprocess.Popen(cmd.split(" "), stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    out,err = proc.communicate(input="y\n")    
    print(out, err)

mnemonic = input("Please enter your bip39 mnemonic\n")
raw_sr_keydata = run_add_srkey(mnemonic)
js = json.loads(raw_sr_keydata)
sr_address = js["address"]

raw_secp_keydata = run_add_secpkey(mnemonic)
js = json.loads(raw_secp_keydata)
secp_address = js["address"]

balance = run_querycmd(sr_address)
js = json.loads(balance)
js = js["value"]["coins"][0]
coins = js["amount"] + js["denom"]
print("Claiming " + coins)
print("Please enter your keychain password for the following tx " + coins)
print("Your new key (name in keybase is: " + secp_key_name + " ) has address: " + secp_address)

run_sendcmd(sr_address, secp_address, coins)