import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import auth from './actions/auth'
import toaster from './actions/toaster'
import volunteer from './actions/volunteer'

const rootReducer = combineReducers({
  auth,
  toaster,
  volunteer,
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
