require('dotenv').config();

const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const fs = require('fs');
const configs = require('./config');
const { remind, info } = require('./utils');

const header = {
  'Content-Type': 'application/json',
  Accept: 'application/json, text/plain',
};

function bufferFromKeyEnv(envVar) {

  const tokens = envVar.split('-----');
  const body = tokens[2];
  let output = "";
  output += `-----${tokens[1]}-----\n`;
  for (let i = 0; i < body.length; i += 64) {
    output += `${body.slice(i, i + 64)}\n`;
  }
  output += `-----${tokens[3]}-----`;
  return Buffer.from(output);
}

/*
    Process Hang Seng Data
*/

const prepareHangSengData = async (outputFile) => {
  info('Start to prepare the hang seng data');
  const res = await request.getAsync({
    url: configs.HANG_SENG_API_ENDPOINT,
    headers: {
      ...header,
      ClientID: configs.HANG_SENG_CLIENT_ID,
      ClientSecret: configs.HANG_SENG_CLIENT_SECRET,
    },
  });

  remind(`Successfully fetched the hang seng data.Size: ${res.body.length} `);

  fs.writeFileSync(outputFile, res.body, 'utf8');
  remind(`Successfully store the data to ${outputFile} `);
};

/*
    Prepare HSBC Data
*/
const prepareHsbcData = async (outputFile) => {
  info('Start to prepare the hsbc data');
  const res = await request.getAsync({
    url: configs.HSBC_API_ENDPOINT,
    headers: {
      ...header,
      ClientID: configs.HSBC_CLIENT_ID,
      ClientSecret: configs.HSBC_CLIIENT_SECRET,
    },
  });
  remind(`Successfully fetched the hsbc data.Size: ${res.body.length} `);

  fs.writeFileSync(outputFile, res.body, 'utf8');
  remind(`Successfully store the data to ${outputFile} `);
};

const prepareFubonData = async (outputFile) => {
  info('Start to prepare the fubon data');
  const res = await request.getAsync({
    url: configs.FUBON_API_ENDPOINT,
    headers: {
      ...header,
      'X-IBM-Client-Id': configs.FUBON_CLIENT_ID,
      'X-IBM-Client-Secret': configs.FUBON_CLIENT_SECRET,
      Accept: 'application/json',
    },
    cert: bufferFromKeyEnv(configs.SSL_CERT),
    key: bufferFromKeyEnv(configs.SSL_KEY),
    strictSSL: false,
  });
  remind(`Successfully fetched the fubon data.Size: ${res.body.length} `);

  fs.writeFileSync(outputFile, res.body, 'utf8');
  remind(`Successfully store the data to ${outputFile} `);
}


module.exports = {
  prepareHangSengData,
  prepareHsbcData,
  prepareFubonData,
};
