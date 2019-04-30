import { isArray } from "util";
import {
  SERVICE_BILL_PAYMENT, SERVICE_CASH_DEPOSIT, SERVICE_CASH_WITHDRAWAL, SERVICE_CHEQUE_DEPOSIT, SERVICE_COIN_SORT,
  SERVICE_DISABLED_ACCESS, SERVICE_FOREIGN_CURRENCY,
  WEEK_DAYS
} from '../constants/services';

import * as banks from '../constants/banks';
import * as networks from '../constants/networks';
import * as moment from 'moment';

class ATM {
  Bank = "";
  Network = "";
  ATMName = "";
  HotlineNumber = "";
  ATMAddress = {
    CountryCode: "HK",
    TerritoryName: "",
    DistrictName: "",
    AddressLine: [],
    LatitudeDescription: 0,
    LongitudeDescription: 0,
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

  isServiceAvaliable(serviceKey) {
    if (serviceKey === SERVICE_COIN_SORT) {
       return this.isServiceIndicatorReturnTrue('CoinSortIndicator');
    } else if (serviceKey === SERVICE_FOREIGN_CURRENCY) {
      return this.isServiceIndicatorReturnTrue('ForeignCurrencyIndicator');
    } else if (serviceKey === SERVICE_DISABLED_ACCESS) {
      return this.isServiceIndicatorReturnTrue('DisabledAccessIndicator');
    } else if (serviceKey === SERVICE_BILL_PAYMENT) {
      return this.isServiceIndicatorReturnTrue('BillPaymentIndicator');
    } else if (serviceKey === SERVICE_CASH_WITHDRAWAL) {
      return this.isServiceIndicatorReturnTrue('CashWithdrawalIndicator');
    } else if (serviceKey === SERVICE_CASH_DEPOSIT) {
      return this.isServiceIndicatorReturnTrue('CashDepositIndicator');
    } else if (serviceKey === SERVICE_CHEQUE_DEPOSIT) {
      return this.isServiceIndicatorReturnTrue('ChequeDepositIndicator');
    }
  }

  isServiceIndicatorReturnTrue(field) {
    return this.ATMServices
      && this.ATMServices[field] !== undefined
      && this.ATMServices[field] === true;
  }

  isOpenNow() {
    const dayOfWeek = moment().format('dddd');
    const openingHour = this.OpeningHours.find(oh => oh.OpenDayDescription === dayOfWeek);
    if (!openingHour) {
      return null;
    }
    const openTime = moment(openingHour.OpenTime, 'HH:mm');
    const closeTime = moment(openingHour.CloseTime, 'HH:mm');
    return moment().isBetween(openTime, closeTime);
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
    this.Bank = banks.hangSeng.idx;
    this.Network = networks.hangseng.idx;

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
  constructor(record) {
    super(record);
    this.Bank = banks.hsbc.idx;
    this.Network = networks.HSBC.idx;
  }
}


function createGenericOpeningHours(openTime, closeTime) {
  return WEEK_DAYS.map(weekday => ({
    OpenDayDescription: weekday,
    OpenTime: openTime,
    CloseTime: closeTime
  }));
}