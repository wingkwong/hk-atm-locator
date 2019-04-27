import {
    SET_ATM_DATA, TOGGLE_FILTER_OPTION
} from '../actions/types';
import {
  SERVICES
} from '../constants/services';

const atmDataReducer = (state={
  filters: {},
  data: [],
}, action) => {
    switch (action.type) {
        case SET_ATM_DATA:
            return {...state, data: action.data, raw_data: action.data};
        case TOGGLE_FILTER_OPTION:
            const filters = {...state.filters, [action.key]: action.value };
            return {...state, filters, data: filterData(state.raw_data, filters)};
        default:
            return state;
    }
}


const filterData = (atms, filter) => {
  return atms.filter( atm => {
    const shouldFilter = true;
    for (const key of Object.keys(filter)) {
      const value = filter[key];
      if (
        (SERVICES.includes(key) && value === true && !atm.isServiceAvaliable(key))
        || (key === 'bank' && value !== 'all' && value !== atm.Bank)
        || (key === 'network' && value !== 'all' && value !== atm.Network)
        || (key === 'Opening' && value === true && atm.isOpenNow() === false) // DISCUSSION: this will show also the unknown atm as well
        || (key === 'Closed' && value === true && atm.isOpenNow() === true)) {
          return false
        }
    }
    return shouldFilter;
  })
}
export default atmDataReducer;