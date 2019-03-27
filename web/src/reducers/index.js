import { combineReducers } from 'redux';
import atmDataReducer from './atmDataReducer';
import locationReducer from './locationReducer';

export default combineReducers({
    atm: atmDataReducer,
    location: locationReducer
});