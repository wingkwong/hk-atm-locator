import {
    SET_CURRENT_LOCATION
} from '../actions/types';

const locationReducer = (state={}, action) => {
    switch (action.type) {
        case SET_CURRENT_LOCATION:
            return {...state, lat: action.lat, lng: action.lng};
        default:
            return state;
    }
}

export default locationReducer;