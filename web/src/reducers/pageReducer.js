import {
    TOGGLE_ATM_DETAIL_DIALOG,
    TOGGLE_ATM_FILTER_DIALOG,
    TOGGLE_ABOUT_DIALOG,
    TOGGLE_MAP_VIEW
} from '../actions/types';

const pageReducer = (state={toggle_map_view: false}, action) => {
    switch (action.type) {
        case TOGGLE_ATM_DETAIL_DIALOG:
            return {...state, detail_dialog_open: action.open};
        case TOGGLE_ATM_FILTER_DIALOG:
            return {...state, filter_dialog_open: action.open};
        case TOGGLE_MAP_VIEW:
            return {...state, toggle_map_view: action.open};
        case TOGGLE_ABOUT_DIALOG:
            return {...state, about_dialog_open: action.open};
        default:
            return state;

    }
}

export default pageReducer;