const request = require('request')
const fs = require('fs');

const HSBC_API_ENDPOINT = '<HSBC_API_ENDPOINT>';
const HANG_SENG_API_ENDPOINT = '<HANG_SENG_API_ENDPOINT>';
const HSBC_CLIENT_ID = '<HSBC_CLIENT_ID>';
const HSBC_CLIIENT_SECRET = '<HSBC_CLIIENT_SECRET>';
const HANG_SENG_CLIENT_ID = '<HANG_SENG_CLIENT_ID>';
const HANG_SENG_CLIENT_SECRET = '<HANG_SENG_CLIENT_SECRET>';

/*
    Process Hang Seng Data
*/

const prepare_hang_seng_data = () => {
    request.get({
        url: HSBC_API_ENDPOINT,
        headers: { 
            'Content-Type': 'application/json', 
            'Accept': 'application/json, text/plain', 
            'ClientID': HSBC_CLIENT_ID, 
            'ClientSecret': HSBC_CLIIENT_SECRET
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
    //TODO:
}


/*
    Main
*/
prepare_hang_seng_data();
prepare_hsbc_data();