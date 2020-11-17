export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_SEARCH':
      return [...state, action.search]
    default:
      return state
  }
}
