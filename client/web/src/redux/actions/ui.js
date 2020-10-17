export function addSelectedLocation(location) {
  return dispatch => dispatch({ type: 'ADD_SELECTED_LOCATION', location: location });
};