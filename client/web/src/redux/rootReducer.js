import { combineReducers } from 'redux';
import searches from './reducers/search';
import data from './reducers/data';

export default combineReducers({
  searches,
  data,
});