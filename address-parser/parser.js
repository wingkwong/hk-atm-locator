#!/usr/bin/env node

const program = require('commander');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const AddressParser = require('hk-address-parser-lib');

// default logger
const { log } = console;

/**
 * Termination process
 */
function end() {
  process.exit(1);
}

async function processFile(inputFile, outputFile, options) {
  const input = await fs.readFileAsync(inputFile);
  const data = JSON.parse(input.toString());
  const atms = data.data[0].Brand[0].ATM;
  for (const atm of atms) {
    const address = `${atm.ATMName}`;
    const addressLine = atm.ATMAddress.AddressLine.join(' ');
    const records = await AddressParser.parse(addressLine);
    if (records.length > 0) {
      atm.Location = records[0].coordinate();
    }
  }

  await fs.writeFileAsync(outputFile, JSON.stringify(data, null, 4));
  end();
}


program
  .version('0.1.0');

/**
 * Simple mathematic calcuation
 */
program
  .command('process <inputFile> <outputFile>')
  .description('try to fetch and get the address and save to file')
  .action(processFile);

program.parse(process.argv);

// If no arguments we should output the help
if (!program.args.length) program.help();
