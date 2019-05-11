
# Inorder to run locally, you must provide the following env variables
# export HSBC_API_ENDPOINT=
# export HANG_SENG_API_ENDPOINT=
# export HSBC_CLIENT_ID=
# export HSBC_CLIIENT_SECRET=
# export HANG_SENG_CLIENT_ID=
# export HANG_SENG_CLIENT_SECRET=

./transformer/src/process.js prepare hang_seng ./transformer/unprocessed/hang_seng.json && \
./transformer/src/process.js process hang_seng ./transformer/unprocessed/hang_seng.json ./transformer/processing/hang_seng.json && \
./transformer/src/process.js process-address hang_seng ./transformer/processing/hang_seng.json ./transformer/processed/hang_seng.json

./transformer/src/process.js prepare hsbc ./transformer/unprocessed/hsbc.json && \
./transformer/src/process.js process hsbc ./transformer/unprocessed/hsbc.json ./transformer/processing/hsbc.json && \
./transformer/src/process.js process-address hsbc ./transformer/processing/hsbc.json ./transformer/processed/hsbc.json


