import {
  TOGGLE_FILTER_OPTION
} from '../actions/types';

const pageReducer = (state = {
  options: {}, // default filterOptions
}, action) => {
  switch (action.type) {
    case TOGGLE_FILTER_OPTION:
      state.options = Object.assign({ [action.key]: action.value }, state.options);
      return { ...state, options: state.options };
    default:
      return state;
  }
}

export default pageReducer;