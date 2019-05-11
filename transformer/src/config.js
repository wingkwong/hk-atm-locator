const dotenv = require('dotenv');
dotenv.config({path: '../.env'});

module.exports = {
    HSBC_API_ENDPOINT: process.env.HSBC_API_ENDPOINT,
    HANG_SENG_API_ENDPOINT: process.env.HANG_SENG_API_ENDPOINT,
    HSBC_CLIENT_ID: process.env.HSBC_CLIENT_ID,
    HSBC_CLIIENT_SECRET: process.env.HSBC_CLIIENT_SECRET,
    HANG_SENG_CLIENT_ID: process.env.HANG_SENG_CLIENT_ID,
    HANG_SENG_CLIENT_SECRET: process.env.HANG_SENG_CLIENT_SECRET,
};