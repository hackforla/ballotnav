import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import preloadedState from './preloadedState';
import rootReducer from './rootReducer';

const store = createStore(rootReducer, preloadedState, composeWithDevTools(
  applyMiddleware(thunk)
));

export default store;