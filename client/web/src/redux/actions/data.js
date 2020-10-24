import dummyData from '../dummyData';

export function getJurisdiction(jurisdictionId) {
  return dispatch => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(dispatch({
          type: 'GET_JURISDICTION_SUCCESS',
          data: dummyData,
        }))
      }, 0);
    });
  }
}
