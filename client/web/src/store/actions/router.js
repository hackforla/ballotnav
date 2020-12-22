import * as router from 'connected-react-router'
import history from 'services/history'
import queryString from 'query-string'
import mixpanel from 'services/mixpanel'

export const types = {
  LOCATION_CHANGE: router.LOCATION_CHANGE,
}

export const push = router.push

export const updateQuery = (newQuery={}) => {
  return (dispatch, getState) => {
    const { pathname, location: { query } } = getState().router
    return dispatch(push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      })
    }))
  }
}

export const selectLocation = (locationId) => {
  return (dispatch, getState) => {
    mixpanel.track('SELECT_LOCATION', { locationId })
    return dispatch(push({
      pathname: '/map',
      search: queryString.stringify({
        ...queryString.parse(getState().router.location.search),
        lid: locationId || undefined,
      })
    }))
  }
}

export default router.connectRouter(history)
