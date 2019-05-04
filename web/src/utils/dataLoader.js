import HANG_SENG_DATA from '../data/processed/hang_seng.json';
import HANG_SENG_LATLNG_DATA from '../data/processed/hang_seng_latlng.json';
import HSBC_DATA from '../data/processed/hsbc.json';

import { HangSengATM, HsbcATM } from './../models/atm';

export const loadAllData = () => {

  return [...loadHangSengData(), ...loadHSBCData()]


}

function loadHSBCData() {
  const hsbcATMs = HSBC_DATA.data[0].Brand[0].ATM;
  return hsbcATMs.map(atm => new HsbcATM(atm));
}

function loadHangSengData() {
  const atms = [];

  const rawData = HANG_SENG_DATA.data[0].Brand[0].ATM;
  let hangSengLatLngLUT = {};
  for (let i = 0; i < HANG_SENG_LATLNG_DATA.length; i++) {
    let rec = HANG_SENG_LATLNG_DATA[i];
    hangSengLatLngLUT[rec.address] = { 'lat': rec.lat, 'lng': rec.lng };
  }
  for (let i = 0; i < rawData.length; i++) {
    let rec = rawData[i];
    let latlng = hangSengLatLngLUT[rec.ATMAddress.AddressLine[0]];
    if (latlng) {
      rec.ATMAddress.LatitudeDescription = latlng.lat;
      rec.ATMAddress.LongitudeDescription = latlng.lng;
    }

    atms.push(new HangSengATM(rec));

  }

  return atms;
}