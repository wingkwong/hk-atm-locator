const fs = require('fs');
const path = require('path');
const moment = require('moment');
const MTR_OPERATING_HOURS = require('../reference/mtr_operating_hours');
const { remind, info } = require('./utils');

const enrichBankAndNetwork = (bank, network) => {
  if (network === 'hang_seng' || network === 'hsbc' || network === 'jetco') {
    return {
      Bank: bank, // TODO: handle JETCO case when the data is ready
      Network: network,
    };
  }
  throw new Error('Invalid network');
}

const enrichOpeningHours = (record) => {
  let OpeningHours = [];
  if (record.ATMServices.AutomatedTellerMachineOperatingHour === '24-hours') {
    OpeningHours = createGenericOpeningHours("00:00", "23:59");
  } else if (record.ATMServices.AutomatedTellerMachineOperatingHour === 'Around 06:00 - midnight 01:00 (Follows Station First/Last Trains Service Hours)') {
    const operatingHoursFromMTRLookup = getOperatingHoursByStation(record.ATMName);
    if (operatingHoursFromMTRLookup != null) {
      const { open_time, close_time } = operatingHoursFromMTRLookup;
      OpeningHours = createGenericOpeningHours(open_time, close_time);
    }
  }
  return { OpeningHours };
}


const convertOpeningHourToHHmmFormat = (openingHours) => {
  const OpeningHours = openingHours.map((oh, idx) => {
    const ohOpenTime = moment(oh.OpenTime, "h:mm").format("HH:mm");
    var ohCloseTime = moment(oh.CloseTime, "h:mm").format("HH:mm");
    if(ohCloseTime == '00:00') {
      ohCloseTime = '24:00';
    }
    return {
      ...oh,
      OpenTime: ohOpenTime,
      CloseTime: ohCloseTime
    };
  });
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
  if (isMatch != null) {
    station = isMatch[2]
  }

  var d = MTR_OPERATING_HOURS.filter((data) => {
    return data.english_name == station
  });

  if (d.length > 0) {
    d = d[0];
    return {
      'open_time': d.open_time,
      'close_time': d.close_time
    };
  }

  return null;
}

const transformJetcoData = (data) => {
  return {
    "ATMName": data.district + ' ATM',
    "HotlineNumber": "",
    "ATMAddress": {
      "CountryCode": "HK",
      "TerritoryName": data.area,
      "DistrictName": data.district,
      "LatitudeDescription": data.latitude,
      "LongitudeDescription": data.longitude,
      "AddressLine": [
          data.addr
      ]
    },
    "ATMServices": {}, //TODO
    "OpeningHours": [], //TODO
    "Bank": data.ob_name
  }
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

const process_jetco_data = (inputPath) => {
  const jetco_atm_arr = [];
  const files = fs.readdirSync(inputPath);
    for (var i=0; i<files.length; i++) {
      if(path.extname(files[i]).substr(1) == 'json') {
        console.log("path.join(inputPath, files[i])=" + path.join(inputPath, files[i]));
          var data = fs.readFileSync(path.join(inputPath, files[i]));
          data = JSON.parse(data);
          if(data.xml_msg.atms != null) {
            var atms = data.xml_msg.atms.atm;
            for(var j=0; j<atms.length; j++) {
              const transformedData = transformJetcoData(atms[j]);
              jetco_atm_arr.push(transformedData);
            }
          }
      }
    }

    return JSON.stringify({
      "meta": {
        "LastUpdated": new Date(),
        "TotalResults": atms.length,
        "Agreement": "Use of the APIs and any related data will be subject to terms and conditions."
      },
      "data": [
        {
          "Brand": [
            {
              "BrandName": "Jetco",
              "ATM": jetco_atm_arr
            }
          ]
        }
      ]
    });
}


module.exports = {
  processHangSengData: async (inputPath, outputPath) => {
    info(`Prepare to process hang seng file from ${inputPath}`);
    const data = fs.readFileSync(inputPath);
    const processedData = process_hang_seng_data(JSON.parse(data));
    fs.writeFileSync(outputPath, processedData);
    remind(`Finsihed processing hang seng file and saved at ${outputPath}`);
  },
  processHsbcData: async (inputPath, outputPath) => {
    info(`Prepare to process hsbc file from ${inputPath}`);
    const data = fs.readFileSync(inputPath);
    const processedData = process_hsbc_data(JSON.parse(data));
    fs.writeFileSync(outputPath, processedData);
    remind(`Finsihed processing hsbc file and saved at ${outputPath}`);
  },
  processJetcoData: async (inputPath, outputPath) => {
    info(`Prepare to process jetco file from ${inputPath}`);
    const processedData = process_jetco_data(inputPath);
    fs.writeFileSync(outputPath, processedData);
    remind(`Finsihed processing jetco file and saved at ${outputPath}`);
  },
};
