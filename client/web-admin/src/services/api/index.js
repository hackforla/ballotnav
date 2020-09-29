import axios from 'axios'
import * as user from './user'
import * as states from './states'
import * as jurisdictions from './jurisdictions'
import * as models from './models'

axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null

    if (status === 401) {
      // TODO: handle 401's after token expiration
    }

    return Promise.reject(error)
  }
)

export default {
  user,
  states,
  jurisdictions,
  models,
}
