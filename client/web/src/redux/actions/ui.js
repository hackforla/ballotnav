export function addSelectedLocation(location) {
  return dispatch => dispatch({ type: 'ADD_SELECTED_LOCATION', location: location });
};

export function toggleResultDetail() {
  return dispatch => dispatch({ type: 'TOGGLE_RESULT_DETAIL' });
};