import {
    SET_SELECTED_LOCATION,
    SET_CURRENT_LOCATION
} from '../actions/types';

const locationReducer = (state={}, action) => {
    switch (action.type) {
        case SET_SELECTED_LOCATION:
            return { ...state, selectedLocation : { lat: action.lat, lng: action.lng, idx: action.idx }, selectedZoomLvl : (action.zoomLvl === -1? state.selectedZoomLvl : action.zoomLvl) };
        case SET_CURRENT_LOCATION:
            return { ...state, currentLocation: { lat: action.lat, lng: action.lng } };
        default:
            return state;
    }
}

export default locationReducer;