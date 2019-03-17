import { combineReducers } from 'redux';
import atmDataReducer from './atmDataReducer';

export default combineReducers({
    atm: atmDataReducer
});