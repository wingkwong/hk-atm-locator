const request = require('request');
const fs = require('fs');
const configs = require('./config');
const header = {
    'Content-Type': 'application/json', 
    'Accept': 'application/json, text/plain',
};

/*
    Process Hang Seng Data
*/

const prepare_hang_seng_data = () => {
    request.get({
        url: configs.HANG_SENG_API_ENDPOINT,
        headers: { 
            ...header,
            'ClientID': configs.HANG_SENG_CLIENT_ID, 
            'ClientSecret': configs.HANG_SENG_CLIENT_SECRET
        }
    }, (err, req, body) => {
        if(err) {
            throw err;
        }
        fs.writeFileSync('../unprocessed/hang_seng.json', body, 'utf8');
    }); 
}

/*
    Prepare HSBC Data
*/
const prepare_hsbc_data = () => {
    request.get({
        url: configs.HSBC_API_ENDPOINT,
        headers: { 
            ...header,
            'ClientID': configs.HSBC_CLIENT_ID, 
            'ClientSecret': configs.HSBC_CLIIENT_SECRET
        }
    }, (err, req, body) => {
        if(err) {
            throw err;
        }
        fs.writeFileSync('../unprocessed/hsbc.json', body, 'utf8');
    }); 
}


/*
    Main
*/
prepare_hang_seng_data();
prepare_hsbc_data();
