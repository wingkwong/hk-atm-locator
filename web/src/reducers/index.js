import { combineReducers } from 'redux';
import atmDataReducer from './atmDataReducer';
import locationReducer from './locationReducer';
import pageReducer from './pageReducer';
import filterOptionReducer from './filterOptionReducer';

export default combineReducers({
    atm: atmDataReducer,
    location: locationReducer,
    page: pageReducer,
    filter: filterOptionReducer,
});