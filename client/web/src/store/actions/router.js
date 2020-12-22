import { connectRouter, push } from 'connected-react-router'
import history from 'services/history'
import queryString from 'query-string'
import mixpanel from 'services/mixpanel'

const mergeQueryParams = (newParams = {}) => {
  return (dispatch, getState) => {
    const {
      pathname,
      location: { search },
    } = getState().router
    const oldParams = queryString.parse(search)
    return dispatch(
      push({
        pathname,
        search: queryString.stringify({
          ...oldParams,
          ...newParams,
        }),
      })
    )
  }
}

export const selectLocation = (locationId) => {
  return (dispatch) => {
    mixpanel.track('SELECT_LOCATION', { locationId })
    return dispatch(
      mergeQueryParams({
        lid: locationId || undefined,
      })
    )
  }
}

export default connectRouter(history)
