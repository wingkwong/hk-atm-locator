const fs = require('fs');
const path = require('path');
const moment = require('moment');
const crypto = require('crypto');
const MTR_OPERATING_HOURS = require('../reference/mtr_operating_hours');
const { jetco } = require('../reference/jetco_banks');
const { remind, info } = require('./utils');
const jetcoIdx = [];

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
    "Bank": convertBankName(data.ob_name)
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
          var data = fs.readFileSync(path.join(inputPath, files[i]));
          data = JSON.parse(data);
          if(data.xml_msg.atms != null) {
              var atms = data.xml_msg.atms.atm;
              for(var j=0; j<atms.length; j++) {
                var idx = atms[j]['@id'];
                if(jetcoIdx.indexOf(idx) == -1) {
                  const transformedData = transformJetcoData(atms[j]);
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

const processChecksum = (data, md5Path) => {
  const checksum = generateChecksum(data);
  if(shouldWriteChecksum(md5Path, checksum)) {
    fs.writeFileSync(md5Path, checksum);
    remind(`Finished generating checksum file at ${md5Path}`);
  } else {
    fs.unlinkSync(md5Path);
  }
}

const generateChecksum = (data) => {
  return crypto
  .createHash('md5')
  .update(data, 'utf8')
  .digest('hex');
}

const shouldWriteChecksum = (md5Path, checksum) => {
  if(!fs.existsSync(md5Path)) {
    return true;
  }
  const checksumInmd5 = fs.readFileSync(md5Path);
  return checksum === checksumInmd5 ? false : true;
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
  processDataChecksum: async (data, md5Path) => {
    info(`Processing checksum at ${md5Path}`);
    processChecksum(data, md5Path);
    remind(`Finished processing checksum file and saved at ${md5Path}`);
  }
};
