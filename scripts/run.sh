
# Inorder to run locally, you must provide the following env variables
# export HSBC_API_ENDPOINT=
# export HANG_SENG_API_ENDPOINT=
# export HSBC_CLIENT_ID=
# export HSBC_CLIIENT_SECRET=
# export HANG_SENG_CLIENT_ID=
# export HANG_SENG_CLIENT_SECRET=


HANG_SENG_UNPROCESSED_JSON="./transformer/unprocessed/hang_seng.json"
HANG_SENG_PROCESSED_JSON="./transformer/processed/hang_seng.json"
HANG_SENG_PROCESSING_JSON="./transformer/processing/hang_seng.json"

HSBC_UNPROCESSED_JSON="./transformer/unprocessed/hsbc.json"
HSBC_PROCESSED_JSON="./transformer/processed/hsbc.json"
HSBC_PROCESSING_JSON="./transformer/processing/hsbc.json"

JETCO_UNPROCESSED="transformer/unprocessed/jetco/"
JETCO_UNPROCESSED_EN="transformer/unprocessed/jetco/en/"
JETCO_UNPROCESSED_TC="transformer/unprocessed/jetco/tc/"
JETCO_PROCESSED_EN_JSON="./transformer/processed/jetco_en.json"
JETCO_PROCESSED_TC_JSON="./transformer/processed/jetco_tc.json"

./transformer/src/process.js prepare hang_seng $HANG_SENG_UNPROCESSED_JSON && \
./transformer/src/process.js process hang_seng $HANG_SENG_UNPROCESSED_JSON $HANG_SENG_PROCESSING_JSON && \
./transformer/src/process.js process-address hang_seng $HANG_SENG_PROCESSING_JSON $HANG_SENG_PROCESSED_JSON

./transformer/src/process.js prepare hsbc $HSBC_UNPROCESSED_JSON && \
./transformer/src/process.js process hsbc $HSBC_UNPROCESSED_JSON $HSBC_PROCESSING_JSON && \
./transformer/src/process.js process-address hsbc $HSBC_PROCESSING_JSON $HSBC_PROCESSED_JSON

cp -r scrapers/output/jetco/ $JETCO_UNPROCESSED && \
./transformer/src/process.js process jetco $JETCO_UNPROCESSED_EN $JETCO_PROCESSED_EN_JSON && \
./transformer/src/process.js process jetco $JETCO_UNPROCESSED_TC $JETCO_PROCESSED_TC_JSON

if [ ! -f $HANG_SENG_PROCESSED_JSON ] || [ ! -f $HSBC_PROCESSED_JSON ] || [ ! -f $JETCO_PROCESSED_EN_JSON ] || [ ! -f $JETCO_PROCESSED_TC_JSON ] ;
then 
    echo "Failed to gernerate files. Aborting..."
    exit 1
fi