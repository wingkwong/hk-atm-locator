import { isArray } from "util";

class ATM {
  ATMName = "";
  HotlineNumber = "";
  ATMAddress = {
    CountryCode: "HK",
    TerritoryName: "",
    DistrictName: "",
    AddressLine: []
  };
  ATMServices = {
    CoinSortIndicator: false,
    ForeignCurrencyIndicator: false,
    DisabledAccessIndicator: false,
    BillPaymentIndicator: false,
    CashWithdrawalIndicator: false,
    CashDepositIndicator: false,
    ChequeDepositIndicator: false
  };
  OpeningHours = [];

  constructor(record) {
    copyFields(this, record);
  }

  isATMOpen() {

  }
}

function copyFields(copyTo, copyFrom) {
  for (const field of Object.keys(copyTo)) {
    if (copyFrom && copyFrom.hasOwnProperty(field)) {
      if (typeof (copyFrom[field]) !== 'object' || isArray(copyFrom[field])) {
        copyTo[field] = copyFrom[field];
      } else {
        copyFields(copyTo[field], copyFrom[field]);
      }
    }
  }
}

export class HangSengATM extends ATM {
  constructor(record) {
    super(record);
    if (record.ATMServices.AutomatedTellerMachineOperatingHour === '24-hours') {
      this.OpeningHours = get247OpeningHours();
    }

    this.ATMServices.CashDepositIndicator = record.ATMServices.CashDepositMachineIndicator;
    this.ATMServices.ChequeDepositIndicator = record.ATMServices.ChequeDepositMachineIndicator;
    this.ATMServices.ForeignCurrencyIndicator =
        record.ATMServices.RMBandForeignCurrencyATMIndicator
        && !record.ATMServices.RMBATMwithoutForeignCurrencyIndicator;

  }
}

export class HsbcATM extends ATM {
}

function get247OpeningHours() {
  return [
    {
      "OpenDayDescription": "Monday",
      "OpenTime": "0:00",
      "CloseTime": "23:59"
    },
    {
      "OpenDayDescription": "Tuesday",
      "OpenTime": "0:00",
      "CloseTime": "23:59"
    },
    {
      "OpenDayDescription": "Wednesday",
      "OpenTime": "0:00",
      "CloseTime": "23:59"
    },
    {
      "OpenDayDescription": "Thursday",
      "OpenTime": "0:00",
      "CloseTime": "23:59"
    },
    {
      "OpenDayDescription": "Friday",
      "OpenTime": "0:00",
      "CloseTime": "23:59"
    },
    {
      "OpenDayDescription": "Saturday",
      "OpenTime": "0:00",
      "CloseTime": "23:59"
    },
    {
      "OpenDayDescription": "Sunday",
      "OpenTime": "0:00",
      "CloseTime": "23:59"
    }
  ];
}