import {
    TOGGLE_ATM_DETAIL_DIALOG
} from '../actions/types';

const pageReducer = (state={}, action) => {
    switch (action.type) {
        case TOGGLE_ATM_DETAIL_DIALOG:
            return {...state, open: action.open};
        default:
            return state;
    }
}

export default pageReducer;