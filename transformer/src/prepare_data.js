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

  remind(`Successfully fetched the hang seng data. Size: ${res.body.length}`);

  fs.writeFileSync(outputFile, res.body, 'utf8');
  remind(`Successfully store the data to ${outputFile}`);
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
  remind(`Successfully fetched the hsbc data. Size: ${res.body.length}`);

  fs.writeFileSync(outputFile, res.body, 'utf8');
  remind(`Successfully store the data to ${outputFile}`);
};


module.exports = {
  prepareHangSengData,
  prepareHsbcData,
};
