import { combineReducers } from 'redux';
import atmDataReducer from './atmDataReducer';
import locationReducer from './locationReducer';
import pageReducer from './pageReducer';

export default combineReducers({
    atm: atmDataReducer,
    location: locationReducer,
    page: pageReducer
});