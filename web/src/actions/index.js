import {
    SET_ATM_DATA,
    SET_SELECTED_LOCATION,
    SET_CURRENT_LOCATION,
    TOGGLE_ATM_DETAIL_DIALOG,
    TOGGLE_FILTER_OPTION,
} from './types';

const dispatchSetATMData = (data) => {
    return {type: SET_ATM_DATA, data: data};
}

const dispatchSetSelectedLocation = (lat, lng, idx, zoomLvl) => {
    return {type: SET_SELECTED_LOCATION, lat: lat, lng: lng, idx: idx, zoomLvl:zoomLvl}
}

const dispatchSetCurrentLocation = (lat, lng) => {
    return {type: SET_CURRENT_LOCATION, lat: lat, lng: lng}
}

const dispatchToggleATMDetailDialog = (open) => {
    return {type: TOGGLE_ATM_DETAIL_DIALOG, open: open}
}

const dispatchToggleFilterOption = (key, value) => {
  return {type: TOGGLE_FILTER_OPTION, key, value}
}

export const setATMData = (data) => {
    return dispatch => {
        dispatch(dispatchSetATMData(data));
    }
}

export const setSelectedLocation = (lat, lng, idx, zoomLvl=-1) => {
    return dispatch => {
        dispatch(dispatchSetSelectedLocation(lat, lng, idx, zoomLvl));
    }
}

export const setCurrentLocation = (lat, lng) => {
    return dispatch => {
        dispatch(dispatchSetCurrentLocation(lat, lng));
    }
}

export const toggleATMDetailDialog = (open) => {
    return dispatch => {
        dispatch(dispatchToggleATMDetailDialog(open))
    }
}

export const toggleFilterOption = (key, value) => {
  return dispatch => {
    dispatch(dispatchToggleFilterOption(key, value));
  }
}