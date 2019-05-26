#!/usr/bin/env node

const program = require('commander');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const AddressParser = require('hk-address-parser-lib');
const async = require('async');
// default logger
const { remind, alert, info } = require('./utils');

const PrepareData = require('./prepare_data');
const ProcessData = require('./process_data');
const DataChecksum = require('./generate_checksum');

const BANK_HANG_SENG = 'hang_seng';
const BANK_HSBC = 'hsbc';
const BANK_JETCO = 'jetco';
const BANK_FUBON = 'fubon';
const BANK_BCH = 'bch';
const BANK_WING_LUNK = 'wing_lunk';
const BANK_ICBC = 'icbc';
const BANK_BEA = 'bea';
const BANKS = [BANK_HANG_SENG, BANK_HSBC, BANK_FUBON, BANK_BCH,
  BANK_BEA, BANK_WING_LUNK,
  BANK_ICBC];

/**
 * Terminate process
 */
function end() {
  process.exit(0);
}

/**
 * Terminate process with the specific error message
 * @param {*} err
 */
function terminateWithError(err) {
  alert(err);
  process.exit(1);
}

/**
 * Validate if the specific bank exists
 * @param {*} bank
 */
function validateBank(bank) {
  if (BANKS.indexOf(bank) === -1) {
    terminateWithError(`Invalid bank. Allowed options: ${bank.join(',')}`);
  }
}

/**
 * Validate if the specific file exists
 * @param {*} file
 */
function validateFile(file) {
  if (!fs.existsSync(file)) {
    terminateWithError(`${file} not exists`);
  }
}

/**
 * Enrich latitude and longitude based on Address Line
 * using Address Parser Lib
 * @param {*} bank
 * @param {*} outputFile
 */
async function parseAddress(atm) {
  const addressLine = atm.ATMAddress.AddressLine.join(' ');
  const records = await AddressParser.parse(addressLine);

  if (records.length > 0) {
    const { lat, lng } = records[0].coordinate();
    atm.ATMAddress.LatitudeDescription = lat + ''; // eslint-disable-line
    atm.ATMAddress.LongitudeDescription = lng + ''; // eslint-disable-line
  }
}

/**
 * Get the raw data from API Portal
 * @param {*} bank
 * @param {*} outputFile
 */
async function prepareData(bank, outputFile) {
  validateBank(bank);
  switch (bank) {
    case BANK_HANG_SENG: await PrepareData.prepareHangSengData(outputFile); break;
    case BANK_HSBC: await PrepareData.prepareHsbcData(outputFile); break;
    case BANK_FUBON: await PrepareData.prepareFubonData(outputFile); break;
    case BANK_BCH: await PrepareData.prepareBchData(outputFile); break;
    case BANK_WING_LUNK: await PrepareData.prepareWingLunkData(outputFile); break;
    case BANK_BEA: await PrepareData.prepareBEAData(outputFile); break;
    case BANK_ICBC: await PrepareData.prepareICBCData(outputFile); break;
    default:
      terminateWithError('Unknown bank');
      break;
  }
  end();
}

/**
 * Process data for the specific bank
 * @param {*} bank
 * @param {*} inputFile
 * @param {*} outputFile
 */
async function processData(bank, inputFile, outputFile) {
  validateBank(bank);
  if (bank === BANK_HANG_SENG) {
    await ProcessData.processHangSengData(inputFile, outputFile);
    end();
  } else if (bank === BANK_HSBC) {
    await ProcessData.processHsbcData(inputFile, outputFile);
    end();
  } else if (bank === BANK_JETCO) {
    await ProcessData.processJetcoData(inputFile, outputFile);
    end();
  }
  terminateWithError('Unknown bank');
}

/**
 * Use address-parser to append the addresses to the data
 * Only applicable for hang seng now
 * @param {*} bank
 * @param {*} inputFile
 * @param {*} outputFile
 */
async function processAddress(bank, inputFile, outputFile) {
  validateBank(bank);
  const input = await fs.readFileAsync(inputFile);
  if (bank === BANK_HANG_SENG) {
    const data = JSON.parse(input.toString());
    const atms = data.data[0].Brand[0].ATM;

    info(`Start to append the address to the data. Total: ${atms.length}`);

    async.eachOfLimit(atms, 50, async.asyncify(parseAddress), async (err) => {
      if (err) {
        terminateWithError(err);
      }
      remind('Process finished');
      await fs.writeFileAsync(outputFile, JSON.stringify(data, null, 4));
      remind(`File sucessfully saved at ${outputFile}`);
      end();
    });
  } else {
    info('Start to output the hsbc data');
    const data = JSON.parse(input.toString());
    await fs.writeFileAsync(outputFile, JSON.stringify(data, null, 4));
    remind(`File sucessfully saved at ${outputFile}`);
    end();
  }
}

/**
 * Generate checksum for each processed data
 * Abort copying data to web/src/data if checksum does not change
 * @param {*} bank
 * @param {*} inputFile
 * @param {*} outputFile
 */
async function generateChecksum(bank, inputFile, outputFile) {
  validateBank(bank);
  validateFile(inputFile);
  var data = await fs.readFileAsync(inputFile);
  data = JSON.stringify(JSON.parse(data).data);
  DataChecksum.generate(data, outputFile);
  end();
}

program
  .version('0.1.0');

/**
 * Get the address
 */
program
  .command('process-address <bank> <inputFile> <outputFile>')
  .description('fetch and get the address and save to file')
  .action(processAddress);

/**
 * Get the data from the API Portal
 */
program
  .command('prepare <bank> <outputFile>')
  .description('Get the data from the bank')
  .action(prepareData);

/**
 * Process the raw data
 */
program
  .command('process <bank> <inputFile> <outputFile>')
  .description('Process the prepared data and output it')
  .action(processData);

/**
 * Generate the checksum 
 */
program
  .command('process-checksum <bank> <inputFile> <outputFile>')
  .description('Check and write checksum of the processed data')
  .action(generateChecksum);

program.parse(process.argv);

// If no arguments we should output the help
if (!program.args.length) program.help();
