import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import query from './actions/query'
import data from './actions/data'
import modals from './actions/modals'

const rootReducer = combineReducers({
  query,
  data,
  modals,
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
