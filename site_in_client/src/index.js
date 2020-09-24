'use strict';
import { 
  mnemonicGenerate, 
  mnemonicToEntropy, 
  mnemonicValidate, 
  mnemonicToMiniSecret, 
  schnorrkelKeypairFromSeed,
  schnorrkelSign } from '@polkadot/util-crypto';
import { sha256 } from 'js-sha256';
import {fromHex, Bech32, toUtf8, toBase64 } from '@cosmjs/encoding';
import { Uint53 } from "@cosmjs/math";

import {
  Bip39,
  EnglishMnemonic,
  HdPath,
  Random,
  Secp256k1,
  Sha256,
  Slip10,
  Slip10Curve,
} from "@cosmjs/crypto";


import {
  LcdClient,
  CosmosClient,
  setupAuthExtension,
  setupBankExtension,
  makeCosmoshubPath,
  rawSecp256k1PubkeyToAddress,
  makeStdTx,
  Msg,
  Coin,
  isMsgSend,
  StdFee,
  makeSignDoc,
  serializeSignDoc, 
  StdSignDoc,
} from "@cosmjs/launchpad";

const lcd_client = LcdClient.withExtensions(
  { apiUrl : "http://straightedge.rpc.sikka.tech:1317/" },
  setupAuthExtension,
  setupBankExtension,
);

const cosmos_client = new CosmosClient(
  { apiUrl : "http://straightedge.rpc.sikka.tech:1317/" }
);


function sortJson(json) {
  if (typeof json !== "object" || json === null) {
    return json;
  }
  if (Array.isArray(json)) {
    return json.map(sortJson);
  }
  const sortedKeys = Object.keys(json).sort();
  const result = sortedKeys.reduce(
    (accumulator, key) => ({
      ...accumulator,
      [key]: sortJson(json[key]),
    }),
    {},
  );
  return result;
}

function encodeSrPubkey(pubkey) {
  return {
    type: "tendermint/PubKeySr25519",
    value: toBase64(pubkey),
  };
}

function encodeStdSignature(pubkey, raw_sig) {
  return {
    pub_key: encodeSrPubkey(pubkey),
    signature: toBase64(raw_sig),
  };
}

window.foo = async function foo() {
  // var mnem = mnemonicGenerate(12);
  var mnem = window.document.getElementById("mnemonic_input").value;

  if (!mnemonicValidate(mnem)) {
    alert("Invalid mnemonic, please paste it into textbox.");
  }
  var password = "";
  var entropy = mnemonicToMiniSecret(mnem, password);
  var sr_keypair = schnorrkelKeypairFromSeed(entropy);

  // Get sr25519 address
  var hash = sha256.create();
  hash.update(sr_keypair.publicKey);
  var sr_addr_hex = hash.hex();
  var sr_addr_bz = fromHex(sr_addr_hex).slice(0, 20);
  const sr_addr = Bech32.encode("str", sr_addr_bz);
  console.log(sr_addr);

  // make secp256k1 address
  const mnemonicChecked = new EnglishMnemonic(mnem);
  const seed = await Bip39.mnemonicToSeed(mnemonicChecked);
  const { privkey } = Slip10.derivePath(Slip10Curve.Secp256k1, seed, makeCosmoshubPath(0));
  const pubkey_raw = (await Secp256k1.makeKeypair(privkey)).pubkey;
  const secp_addr = rawSecp256k1PubkeyToAddress(Secp256k1.compressPubkey(pubkey_raw), "str");
  console.log(secp_addr);

  // Now we have the two correct addresses, we just need to get the balances.

  // Get sr25519 balance by RPC querying
  // We hit cors issue from the rpc server, TODO: Resolve this. 
  // const balances = await lcd_client.bank.balances(sr_addr);
  // console.log(balances);

  // Doing this instead for now.
  var coin = {
    denom: "astr",
    amount: "100",
  };

  // Now craft the send tx
  // First we get the message
  const sendMsg = {
    type: "cosmos-sdk/MsgSend",
    value: {
      from_address: sr_addr,
      to_address: secp_addr,
      amount: [coin],
    },
  };

  console.assert(isMsgSend(sendMsg));

  // set memo / fees
  const memo = "sr25519 to secp key migration";
  // amount required is per what the RPC accepts
  const fee_coins = {denom: "astr", amount: "125000000000000000"}
  const fee = {
    amount: [fee_coins],
    gas: "5000000",
  };

  // get account / seqnum
  // This errors?
  // console.log("got here");
  // const { accountNumber, sequence } = await cosmos_client.getSequence(sr_addr);
  const accountNumber = 2792;
  const sequence = 27;
  const chainId = "straightedge-2";

  // Build the message to sign over
  const msgs = [sendMsg];
  //  const signDoc = makeSignDoc(msgs, fee, chainId, memo, accountNumber, sequence);
  const signDoc = {
    chain_id: chainId,
    account_number: Uint53.fromString(accountNumber.toString()).toString(),
    sequence: Uint53.fromString(sequence.toString()).toString(),
    fee: fee,
    msgs: msgs,
    memo: memo,
  };
  console.log(signDoc);
  const sortedSignDoc = sortJson(signDoc);
  console.log(JSON.stringify(sortedSignDoc));
  const serializedDoc = toUtf8(JSON.stringify(sortedSignDoc));

  const sr_raw_sig = schnorrkelSign(serializedDoc, sr_keypair);
  console.log(sr_raw_sig);
  // Now we need to convert sr_raw_sig into a standard signature.
  const std_sig = encodeStdSignature(sr_keypair.publicKey, sr_raw_sig)
  console.log(std_sig);

  // const tx = makeStdTx(signDoc, sr_sig);
  const tx = {
    msg: signDoc.msgs,
    fee: signDoc.fee,
    memo: signDoc.memo,
    signatures: [std_sig],
  };
  console.log(tx);
  console.log(JSON.stringify(tx));

  // var result = await cosmos_client.broadcastTx(tx);
  // alert(result);

  // Just for testing broadcast gainst full node, since cosmos_client isn't working.
  const wrappedTx = {type: "cosmos-sdk/StdTx", value: tx};
  console.log(JSON.stringify(wrappedTx));
}