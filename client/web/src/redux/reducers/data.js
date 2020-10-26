export default (state = [], action) => {
  switch (action.type) {
    case 'GET_JURISDICTION_SUCCESS':
      return action.data
    default:
      return state
  }
}
