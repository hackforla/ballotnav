import axios from 'axios'
import * as user from './user'
import * as assignment from './assignment'
import * as wip from './wip'
import * as dashboard from './dashboard'

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

const api = {
  user,
  assignment,
  wip,
  dashboard,
}

export default api
