import api from 'services/api'

export function getJurisdiction(jurisdictionId) {
  return (dispatch) => {
    return api.getJurisdiction(jurisdictionId).then((data) =>
      dispatch({
        type: 'GET_JURISDICTION_SUCCESS',
        data,
      })
    )
  }
}
