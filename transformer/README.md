# Transform

The folder contains programs to transform, enrich, and manipulate data from API Portals and produce data in a well-defined yet standardised format

## Setup

```bash
cd transformer
npm i

#
mv .env.default .env

# Edit the .env file with the proper settings
```

## General Flow

Pipe processing the hang seng data

```bash
./src/process.js prepare hang_seng unprocessed/hang_seng.json && \
./src/process.js process hang_seng unprocessed/hang_seng.json processing/hang_seng.json && \
./src/process.js process-address hang_seng processing/hang_seng.json processed/hang_seng.json
```

Pipe processing the hsbc data

```bash
./src/process.js prepare hsbc unprocessed/hsbc.json && \
./src/process.js process hsbc unprocessed/hsbc.json processing/hsbc.json && \
./src/process.js process-address hsbc processing/hsbc.json processed/hsbc.json
```

Pipe processing the jetco data

```bash
./src/process.js process jetco unprocessed/jetco/en/ processed/jetco_en.json && \
./src/process.js process jetco unprocessed/jetco/tc/ processed/jetco_tc.json 
```

Checksum files will be generated after pipe processing each network

```bash
./src/process.js process-checksum hang_seng processed/hang_seng.json checksum/hang_seng.md5 && \
./src/process.js process-checksum hsbc processed/hsbc.json checksum/hsbc.md5 && \
./src/process.js process-checksum jetco processed/jetco_en.json checksum/jetco_en.md5 && \
./src/process.js process-checksum jetco processed/jetco_tc.json checksum/jetco_tc.md5 && \
```

if there is no change in checksum file, the data file will not be copied and committed.
