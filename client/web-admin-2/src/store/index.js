import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import { reducer as auth, types as authTypes } from './actions/auth'
import { reducer as toaster } from './actions/toaster'
import { reducer as volunteer } from './actions/volunteer'
import { reducer as assignment } from './actions/assignment'

const appReducer = combineReducers({
  auth,
  toaster,
  volunteer,
  assignment,
})

// wipe store on logout
const rootReducer = (state, action) => {
  if (action.type === authTypes.LOGOUT)
    state = undefined

  return appReducer(state, action)
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
