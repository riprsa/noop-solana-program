#!/bin/bash
set -e
source .env

cd ./program

# temp file
KEYPAIR_TEMP=$(mktemp)

echo "$DEPLOYER_PRIVATE_KEY" > "$KEYPAIR_TEMP"

solana program deploy ./target/deploy/test.so --keypair "$KEYPAIR_TEMP" -u mainnet-beta

rm "$KEYPAIR_TEMP"