import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import { reducer as auth } from './actions/auth'
import { reducer as toaster } from './actions/toaster'
import { reducer as volunteer } from './actions/volunteer'
import { reducer as assignment } from './actions/assignment'

const rootReducer = combineReducers({
  auth,
  toaster,
  volunteer,
  assignment,
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
