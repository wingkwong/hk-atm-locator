
# Inorder to run locally, you must provide the following env variables
# export HSBC_API_ENDPOINT=
# export HANG_SENG_API_ENDPOINT=
# export HSBC_CLIENT_ID=
# export HSBC_CLIIENT_SECRET=
# export HANG_SENG_CLIENT_ID=
# export HANG_SENG_CLIENT_SECRET=


HANG_SENG="hang_seng"
HANG_SENG_UNPROCESSED_JSON="./transformer/unprocessed/hang_seng.json"
HANG_SENG_PROCESSED_JSON="./transformer/processed/hang_seng.json"
HANG_SENG_PROCESSING_JSON="./transformer/processing/hang_seng.json"
HANG_SENG_MD5="./transformer/checksum/hang_seng.md5"

HSBC="hsbc"
HSBC_UNPROCESSED_JSON="./transformer/unprocessed/hsbc.json"
HSBC_PROCESSED_JSON="./transformer/processed/hsbc.json"
HSBC_PROCESSING_JSON="./transformer/processing/hsbc.json"
HSBC_MD5="./transformer/checksum/hsbc.md5"

JETCO="jetco"
JETCO_RAW_DATA="scrapers/output/jetco/"
JETCO_UNPROCESSED="./transformer/unprocessed/jetco/"
JETCO_UNPROCESSED_EN="./transformer/unprocessed/jetco/en/"
JETCO_UNPROCESSED_TC="./transformer/unprocessed/jetco/tc/"
JETCO_PROCESSED_EN_JSON="./transformer/processed/jetco_en.json"
JETCO_PROCESSED_TC_JSON="./transformer/processed/jetco_tc.json"
JETCO_CHECKSUM_EN_MD5="./transformer/checksum/jetco_en.md5"
JETCO_CHECKSUM_TC_MD5="./transformer/checksum/jetco_tc.md5"

./transformer/src/process.js prepare $HANG_SENG $HANG_SENG_UNPROCESSED_JSON && \
./transformer/src/process.js process $HANG_SENG $HANG_SENG_UNPROCESSED_JSON $HANG_SENG_PROCESSING_JSON && \
./transformer/src/process.js process-address $HANG_SENG $HANG_SENG_PROCESSING_JSON $HANG_SENG_PROCESSED_JSON && \
./transformer/src/process.js process-checksum $HANG_SENG $HANG_SENG_PROCESSED_JSON $HANG_SENG_MD5

./transformer/src/process.js prepare $HSBC $HSBC_UNPROCESSED_JSON && \
./transformer/src/process.js process $HSBC $HSBC_UNPROCESSED_JSON $HSBC_PROCESSING_JSON && \
./transformer/src/process.js process-address $HSBC $HSBC_PROCESSING_JSON $HSBC_PROCESSED_JSON && \
./transformer/src/process.js process-checksum $HSBC $HSBC_PROCESSED_JSON $HSBC_MD5

cp -r $JETCO_RAW_DATA $JETCO_UNPROCESSED && \
./transformer/src/process.js process $JETCO $JETCO_UNPROCESSED_EN $JETCO_PROCESSED_EN_JSON && \
./transformer/src/process.js process $JETCO $JETCO_UNPROCESSED_TC $JETCO_PROCESSED_TC_JSON && \
./transformer/src/process.js process-checksum $JETCO $JETCO_PROCESSED_EN_JSON $JETCO_CHECKSUM_EN_MD5 && \
./transformer/src/process.js process-checksum $JETCO $JETCO_PROCESSED_TC_JSON $JETCO_CHECKSUM_TC_MD5


if [ ! -f $HANG_SENG_PROCESSED_JSON ] || [ ! -f $HSBC_PROCESSED_JSON ] || [ ! -f $JETCO_PROCESSED_EN_JSON ] || [ ! -f $JETCO_PROCESSED_TC_JSON ] ;
then 
    echo "Failed to gernerate files. Aborting..."
    exit 1
fi
