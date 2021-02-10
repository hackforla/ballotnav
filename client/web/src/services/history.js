import {
  // createBrowserHistory as createHistory, // for regular deploy
  createHashHistory as createHistory, // for gh-pages deploy
} from 'history'

const history = createHistory()

export default history
