import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { routerMiddleware } from 'connected-react-router'
import history from 'services/history'

import router from './actions/router'
import data from './actions/data'
import modals from './actions/modals'

const rootReducer = combineReducers({
  router,
  data,
  modals,
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk))
)

export default store
