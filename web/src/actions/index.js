import {
    SET_ATM_DATA,
    SET_CURRENT_LOCATION
} from './types';

const dispatchSetATMData = (data) => {
    return {type: SET_ATM_DATA, data: data};
}

const dispatchSetSelectedLocation = (lat, lng) => {
    return {type: SET_CURRENT_LOCATION, lat: lat, lng: lng}
}

export const setATMData = (data) => {
    return dispatch => {
        dispatch(dispatchSetATMData(data));
    }
}

export const setSelectedLocation = (lat, lng) => {
    return dispatch => {
        dispatch(dispatchSetSelectedLocation(lat, lng));
    }
}