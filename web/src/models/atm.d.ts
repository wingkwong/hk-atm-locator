import { string } from "prop-types";


declare interface ATMOpeningHour {
  OpenDayDescription: string;
  OpenTime: string;
  CloseTime: string;
}

declare interface ATMAddress {
  CountryCode: string;
  TerritoryName: string;
  DistrictName: string;
  AddressLine: string[];
}

declare interface ATMServices {
  CoinSortIndicator: boolean;
  ForeignCurrencyIndicator: boolean;
  DisabledAccessIndicator: boolean;
  BillPaymentIndicator: boolean;
  CashWithdrawalIndicator: boolean;
  CashDepositIndicator: boolean;
  ChequeDepositIndicator: boolean;
}

declare interface ATM {
  Bank: string;
  Network: string;
  ATMName: string;
  HotlineNumber: string;
  ATMAddress: ATMAddress;
  ATMServices: ATMServices;
  OpeningHours: ATMOpeningHour[];
}