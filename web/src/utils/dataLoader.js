import HANG_SENG_DATA from '../data/hang_seng.json';
import HSBC_DATA from '../data/hsbc.json';

import { HangSengATM, HsbcATM } from './../models/atm';

export const loadAllData = () => {
  return [...loadHangSengData(), ...loadHSBCData()]
}

export const loadHSBCData = () => {
  const hsbcATMs = HSBC_DATA.data[0].Brand[0].ATM;
  return hsbcATMs.map(atm => new HsbcATM(atm));
}

export const loadHangSengData = () => {
  const hangSengATMs = HANG_SENG_DATA.data[0].Brand[0].ATM;
  return hangSengATMs.map(atm => new HangSengATM(atm));
}