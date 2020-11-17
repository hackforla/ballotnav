export function addSearch(search) {
  return (dispatch) => dispatch({ type: 'ADD_SEARCH', search: search })
}
