const fs = require('fs');
const path = require('path');
const moment = require('moment');
const MTR_OPERATING_HOURS = require('../reference/mtr_operating_hours');
const { jetco } = require('../reference/jetco_banks');
const { remind, info } = require('./utils');
const jetcoIdx = [];
const baseIdx = {
  hangSeng: 1000,
  hsbc: 2000,
  jetco: 3000
}

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
  } else if (record.ATMServices.AutomatedTellerMachineOperatingHour === 'Subject to Mall Opening Hours') {
    // TODO
  } else {
    // TODO
  }
  return { OpeningHours };
}


const enrichATMId = (base, id) => {
  return {
    ATMId: base + id
  }
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

const transformJetcoData = (data, idx) => {
  const { 
    region,
    area,
    district,
    ob_name,
    addr,
    supp_tran: {
      tran_name
    },
    currencies: {
      currency
    },
    latitude,
    longitude
  } = data;
  return {
    "ATMName": district + ' ATM',
    "HotlineNumber": "",
    "ATMAddress": {
      "CountryCode": "HK",
      "TerritoryName": area,
      "DistrictName": district,
      "LatitudeDescription": latitude,
      "LongitudeDescription": longitude,
      "AddressLine": [
          addr
      ]
    },
    "ATMServices": {}, //TODO
    "OpeningHours": [], //TODO
    "Bank": convertBankName(ob_name),
    ...enrichATMId(baseIdx.jetco, idx)
  }
}

const transformJetcoDataFromAPIX = (data) => {
  const { 
    name,
    address,
    countryCode,
    city,
    hkDistrict,
    openingHours,
    accessibilities,
    phoneNo,
    latitude,
    longitude,
    services: {
      withCnyWithdrawal, withFcyWithdrawal, withCashDesposit, withChequeDesposit, others
    },
    atmProvidernetwork,
    // others,
    remark,
    lastUpdateDate
   } = data;
  return {
    "ATMName": name,
    "HotlineNumber": phoneNo,
    "ATMAddress": {
      "CountryCode": countryCode,
      "TerritoryName": "", //TODO
      "DistrictName": hkDistrict,
      "LatitudeDescription": latitude,
      "LongitudeDescription": longitude,
      "AddressLine": [
        address
      ]
    },
    "ATMServices": services,  //TODO: standardise format
    "OpeningHours": openingHours, //TODO: standardise format
    "Bank": "" //TODO: Enrich
  }
}

const convertBankName = (bank) => {
  const o = jetco.filter(b => {
    return b.en === bank
  });
  return o[0] ? o[0].idx : '';
}

/*
  Process Hang Seng Data
*/
const process_hang_seng_data = (data) => {
  var atm = data.data[0].Brand[0].ATM;
  atm = atm.map((record, idx) => ({
    ...record,
    ...enrichBankAndNetwork('hang_seng', 'hang_seng'),
    ...enrichOpeningHours(record),
    ...enrichATMId(baseIdx.hangSeng, idx)
  }));

  data.data[0].Brand[0].ATM = atm;
  return JSON.stringify(data);
}

/*
  Process HSBC Data
*/
const process_hsbc_data = (data) => {
  var atm = data.data[0].Brand[0].ATM;
  atm = atm.map((record, idx) => ({
    ...record,
    ...convertOpeningHourToHHmmFormat(record.OpeningHours),
    ...enrichATMId(baseIdx.hsbc, idx)
  }));

  data.data[0].Brand[0].ATM = atm;
  return JSON.stringify(data);
}

/*
  Process JETCO Data (Scraped from JETCO site)
*/
const process_jetco_data = (inputPath) => {
  const jetco_atm_arr = [];
  const files = fs.readdirSync(inputPath);
    for (var i=0; i<files.length; i++) {
      if(path.extname(files[i]).substr(1) == 'json') {
          var data = fs.readFileSync(path.join(inputPath, files[i]));
          data = JSON.parse(data);
          if(data.xml_msg.atms != null) {
              var atms = data.xml_msg.atms.atm;
              for(var j=0; j<atms.length; j++) {
                var idx = atms[j]['@id'];
                if(jetcoIdx.indexOf(idx) == -1) {
                  const transformedData = transformJetcoData(atms[j], i+j);
                  jetco_atm_arr.push(transformedData);
                  jetcoIdx.push(idx);
                }
              }
          }
      }
    }

    return JSON.stringify({
      "meta": {
        "LastUpdated": new Date(),
        "TotalResults": jetcoIdx.length,
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

/*
  Process JETCO Data (From APIX Portal)
*/
const process_jecto_data_from_apix = (data) => {
  data = data.atms;
  data = transformJetcoDataFromAPIX(data);
  return JSON.stringify(data);
}

module.exports = {
  processHangSengData: async (inputPath, outputPath) => {
    info(`Preparing to process hang seng file from ${inputPath}`);
    const data = fs.readFileSync(inputPath);
    const processedData = process_hang_seng_data(JSON.parse(data));
    fs.writeFileSync(outputPath, processedData);
    remind(`Finished processing hang seng file and saved at ${outputPath}`);
  },
  processHsbcData: async (inputPath, outputPath) => {
    info(`Preparing to process hsbc files from ${inputPath}`);
    const data = fs.readFileSync(inputPath);
    const processedData = process_hsbc_data(JSON.parse(data));
    fs.writeFileSync(outputPath, processedData);
    remind(`Finished processing hsbc file and saved at ${outputPath}`);
  },
  processJetcoData: async (inputPath, outputPath) => {
    info(`Preparing to process jetco files from ${inputPath}`);
    const processedData = process_jetco_data(inputPath);
    fs.writeFileSync(outputPath, processedData);
    remind(`Finished processing jetco file and saved at ${outputPath}`);
  },
  processJetcoDataFromAPIX: async (inputPath, outputPath) => {
    info(`Preparing to process jetco files (APIX) from ${inputPath}`);
    const processedData = process_jecto_data_from_apix(inputPath);
    fs.writeFileSync(outputPath, processedData);
    remind(`Finished processing jetco file (APIX) and saved at ${outputPath}`);
  }
};
