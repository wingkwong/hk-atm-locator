import {
    SET_ATM_DATA
} from '../actions/types';

const atmDataReducer = (state={}, action) => {
    switch (action.type) {
        case SET_ATM_DATA:
            return {...state, data: action.data};
        default:
            return state;
    }
}

export default atmDataReducer;