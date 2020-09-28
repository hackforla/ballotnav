import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  // boards: boardsReducer,
});

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
));

export default store;