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
      if (typeof(copyFrom[field]) !== 'object' || isArray(copyFrom[field])) {
        copyTo[field] = copyFrom[field];
      } else {
        copyFields(copyTo[field], copyFrom[field]);
      }
    }
  }
}

export class HangSengATM extends ATM {
}

export class HsbcATM extends ATM {
}