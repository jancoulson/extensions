import { combineReducers } from 'redux';
import { preventStateRehydration } from 'shoutem.redux';
import {
  ACTIVE_PRODUCTS_LOADED_ACTION,
  PRODUCTS_LOADED_ACTION,
} from './actions';

const availableProducts = (state = [], action) => {
  if (action.type === PRODUCTS_LOADED_ACTION) {
    return action.payload;
  }

  return state;
};

const activeProducts = (state = [], action) => {
  if (action.type === ACTIVE_PRODUCTS_LOADED_ACTION) {
    return action.payload;
  }

  return state;
};

const reducer = combineReducers({
  availableProducts,
  activeProducts,
});

export default preventStateRehydration(reducer);
