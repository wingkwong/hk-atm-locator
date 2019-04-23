import {
    SET_ATM_DATA,
    SET_SELECTED_LOCATION,
    SET_CURRENT_LOCATION,
    TOGGLE_ATM_DETAIL_DIALOG
} from './types';

const dispatchSetATMData = (data) => {
    return {type: SET_ATM_DATA, data: data};
}

const dispatchSetSelectedLocation = (lat, lng, zoomLvl) => {
    return {type: SET_SELECTED_LOCATION, lat: lat, lng: lng, zoomLvl:zoomLvl}
}

const dispatchSetCurrentLocation = (lat, lng) => {
    return {type: SET_CURRENT_LOCATION, lat: lat, lng: lng}
}

const dispatchToggleATMDetailDialog = (open) => {
    return {type: TOGGLE_ATM_DETAIL_DIALOG, open: open}
}

export const setATMData = (data) => {
    return dispatch => {
        dispatch(dispatchSetATMData(data));
    }
}

export const setSelectedLocation = (lat, lng, zoomLvl=-1) => {
    return dispatch => {
        dispatch(dispatchSetSelectedLocation(lat, lng, zoomLvl));
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