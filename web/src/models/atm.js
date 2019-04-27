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
      this.OpeningHours = createGenericOpeningHours("00:00", "23:59");
    } else if (record.ATMServices.AutomatedTellerMachineOperatingHour === 'Around 06:00 - midnight 01:00 (Follows Station First/Last Trains Service Hours)') {
      // TODO: fix this
      this.OpeningHours = createGenericOpeningHours("06:00", "23:59");
    } else if (record.ATMServices.AutomatedTellerMachineOperatingHour === 'Subject to Mall Opening Hours') {
      // Just give a generic mall open/close time
      this.OpeningHours = createGenericOpeningHours("10:00", "20:00");
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

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday' ,'Thursday' ,'Friday' ,'Saturday' ,'Sunday']
function createGenericOpeningHours(openTime, closeTime) {
  return WEEK_DAYS.map(weekday => ({
    OpenDayDescription: weekday,
    OpenTime: openTime,
    CloseTime: closeTime
  }));
}