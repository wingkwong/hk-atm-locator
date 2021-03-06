import HANG_SENG_DATA from '../data/hang_seng.json';
import HSBC_DATA from '../data/hsbc.json';
import JETCO_DATA from '../data/jetco_en.json';
import { hsbc, hangseng, jetco } from '../constants/networks';

import { HangSengATM, HsbcATM, JetcoATM } from './../models/atm';

export const loadAllData = () => {
  return [...loadHangSengData(), ...loadHSBCData(), ...loadJetcoData()]
}

export const loadHSBCData = () => {
  const hsbcATMs = HSBC_DATA.data[0].Brand[0].ATM;
  return hsbcATMs.map(atm => new HsbcATM(atm));
}

export const loadHangSengData = () => {
  const hangSengATMs = HANG_SENG_DATA.data[0].Brand[0].ATM;
  return hangSengATMs.map(atm => new HangSengATM(atm));
}

export const loadJetcoData = () => {
  const JetcoATMs = JETCO_DATA.data[0].Brand[0].ATM;
  return JetcoATMs.map(atm => new JetcoATM(atm));
}

export const loadAllDataStats = () => {
  return [...loadHSBCDataStat(), ...loadHangSengDataStat(), ...loadJetcoDataStat()] 
}

export const loadHSBCDataStat = () => {
  const { meta: { LastUpdated, TotalResults} } = HSBC_DATA;
  return {
    idx: hsbc.idx,
    LastUpdated,
    TotalResults
  }
}

export const loadHangSengDataStat = () => {
  const { meta: { LastUpdated, TotalResults} } = HANG_SENG_DATA;
  return {
    idx: hangseng.idx,
    LastUpdated,
    TotalResults
  }
}

export const loadJetcoDataStat = () => {
  const { meta: { LastUpdated, TotalResults} } = JETCO_DATA;
  return {
    idx: jetco.idx,
    LastUpdated,
    TotalResults
  }
}
