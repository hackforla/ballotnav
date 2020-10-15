import { combineReducers } from 'redux';
import searches from './reducers/search';
import data from './reducers/data';
import ui from './reducers/ui';

export default combineReducers({
  searches,
  data,
  ui,
});