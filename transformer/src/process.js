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

const BANK_HANG_SENG = 'hang_seng';
const BANK_HSBC = 'hsbc';
const BANK_JETCO = 'jetco';
const BANKS = [BANK_HANG_SENG, BANK_HSBC, BANK_JETCO];

/**
 * Termination process
 */
function end() {
  process.exit(0);
}

function terminateWithError(err) {
  alert(err);
  process.exit(1);
}

function validateBank(bank) {
  if (BANKS.indexOf(bank) === -1) {
    terminateWithError(`Invalid bank. Allowed options: ${bank.join(',')}`);
  }
}

async function parseAddress(atm) {
  const addressLine = atm.ATMAddress.AddressLine.join(' ');
  const records = await AddressParser.parse(addressLine);

  if (records.length > 0) {
    const { lat, lng } = records[0].coordinate();
    atm.ATMAddress.LatitudeDescription = lat + ''; // eslint-disable-line
    atm.ATMAddress.LongitudeDescription = lng + ''; // eslint-disable-line
  }
}

async function prepareData(bank, outputFile) {
  validateBank(bank);
  if (bank === BANK_HANG_SENG) {
    await PrepareData.prepareHangSengData(outputFile);
    end();
  } else if (bank === BANK_HSBC) {
    await PrepareData.prepareHsbcData(outputFile);
    end();
  }
  terminateWithError('Unknown bank');
}

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

program
  .version('0.1.0');

/**
 * Get the address
 */
program
  .command('process-address <bank> <inputFile> <outputFile>')
  .description('fetch and get the address and save to file')
  .action(processAddress);


program
  .command('prepare <bank> <outputFile>')
  .description('Get the data from the bank')
  .action(prepareData);

program
  .command('process <bank> <inputFile> <outputFile>')
  .description('Process the prepared data and output it')
  .action(processData);

program.parse(process.argv);

// If no arguments we should output the help
if (!program.args.length) program.help();
