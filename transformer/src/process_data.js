const fs = require('fs');
const moment = require('moment');
const MTR_OPERATING_HOURS = require('../reference/mtr_operating_hours');
const HANG_SENG_DATA = require('../unprocessed/hang_seng');
const HSBC_DATA = require('../unprocessed/hsbc');

const enrichBankAndNetwork = (bank, network) => {
    if (network == 'hang_seng' || network == 'hsbc' || network == 'jetco') {
        return {
            'Bank': bank, //TODO: handle JETCO case when the data is ready
            'Network': network
        }
    } else {
        throw('Invalid network');
    }
}

const enrichOpeningHours = (record) => {
    let OpeningHours = [];
    if (record.ATMServices.AutomatedTellerMachineOperatingHour === '24-hours') {
      OpeningHours = createGenericOpeningHours("00:00", "23:59");
    } else if (record.ATMServices.AutomatedTellerMachineOperatingHour === 'Around 06:00 - midnight 01:00 (Follows Station First/Last Trains Service Hours)') {
      const operatingHoursFromMTRLookup = getOperatingHoursByStation(record.ATMName); 
      if(operatingHoursFromMTRLookup != null) {
        const { open_time, close_time } = operatingHoursFromMTRLookup;
        OpeningHours = createGenericOpeningHours(open_time, close_time);
      } 
    } else if (record.ATMServices.AutomatedTellerMachineOperatingHour === 'Subject to Mall Opening Hours') {
      // Just give a generic mall open/close time
      OpeningHours = createGenericOpeningHours("10:00", "20:00");
    }
    return { OpeningHours };
}

const convertOpeningHourToHHmmFormat = (openingHours) => {
    const OpeningHours =  openingHours.map((oh, idx) => {
       const ohOpenTime = moment(oh.OpenTime,"h:mm").format("HH:mm");
       const ohCloseTime = moment(oh.CloseTime,"h:mm").format("HH:mm");
       return {
           ...oh,
           OpenTime: ohOpenTime,
           CloseTime: ohCloseTime
       };
    })

    return { OpeningHours };
}

const createGenericOpeningHours = (openTime, closeTime) => {
    const WEEK_DAYS = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ];
    return WEEK_DAYS.map(weekday => ({
        OpenDayDescription: weekday,
        OpenTime: openTime,
        CloseTime: closeTime
    }));
}


const getOperatingHoursByStation = (station) => {
    // Expected Input: "MTR Tin Shui Wai Station"
    const isMatch = station.match('(MTR (.*?) Station)');
    if(isMatch != null) {
        station = isMatch[2] 
    }
    
    var d = MTR_OPERATING_HOURS.filter( (data) => {
        return data.english_name == station
    });

    if(d.length > 0) {
        d = d[0];
        return {
            'open_time': d.open_time,
            'close_time': d.close_time
        };
    } 

    return null;
}

/*
    Process Hang Seng Data
*/
const process_hang_seng_data = (data) => {
    atm = data.data[0].Brand[0].ATM;
    atm = atm.map(record => ({
        ...record, 
        ...enrichBankAndNetwork('hang_seng', 'hang_seng'),
        ...enrichOpeningHours(record)
    }));
    
    data.data[0].Brand[0].ATM = atm;
    return JSON.stringify(data);
}

/*
    Process HSBC Data
*/

const process_hsbc_data = (data) => {
    atm = data.data[0].Brand[0].ATM;
    atm = atm.map(record => ({
        ...record, 
        ...convertOpeningHourToHHmmFormat(record.OpeningHours)
    }));

    data.data[0].Brand[0].ATM = atm;
    return JSON.stringify(data);
}


/*
    Main
*/

processed_hang_seng_data = process_hang_seng_data(HANG_SENG_DATA);
processed_hsbc_data = process_hsbc_data(HSBC_DATA);

// Move to processing folder
fs.writeFileSync('../processing/hang_seng.json', processed_hang_seng_data);
fs.writeFileSync('../processing/hsbc.json', processed_hsbc_data);
