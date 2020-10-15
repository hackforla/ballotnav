export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_SELECTED_LOCATION':
      return [...state, action.location];
    default:
      return state;
  }
};