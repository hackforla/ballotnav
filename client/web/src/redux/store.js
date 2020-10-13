import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import dummyData from './dummyData.json';
import rootReducer from './rootReducer';

const store = createStore(rootReducer, dummyData, composeWithDevTools(
  applyMiddleware(thunk)
));

export default store;