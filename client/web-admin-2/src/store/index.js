import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import { reducer as auth, types as authTypes } from './actions/auth'
import { reducer as wip } from './actions/wip'
import { reducer as assignment } from './actions/assignment'
import { reducer as toaster } from './actions/toaster'
import { reducer as modals } from './actions/modals'
import { reducer as dashboard } from './actions/dashboard'

const appReducer = combineReducers({
  auth,
  wip,
  assignment,
  toaster,
  modals,
  dashboard,
})

// wipe store on logout
const rootReducer = (state, action) => {
  if (action.type === authTypes.LOGOUT) state = undefined

  return appReducer(state, action)
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
