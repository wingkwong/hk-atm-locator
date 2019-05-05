import {
    TOGGLE_ATM_DETAIL_DIALOG,
    TOGGLE_ATM_FILTER_DIALOG
} from '../actions/types';

const pageReducer = (state={}, action) => {
    switch (action.type) {
        case TOGGLE_ATM_DETAIL_DIALOG:
            return {...state, detail_dialog_open: action.open};
        case TOGGLE_ATM_FILTER_DIALOG:
            return {...state, filter_dialog_open: action.open};
        default:
            return state;

    }
}

export default pageReducer;