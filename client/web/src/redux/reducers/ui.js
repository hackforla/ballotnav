export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_SELECTED_LOCATION':
      return {
        ...state,
        selectedLocation: action.location,
      };
    case 'TOGGLE_RESULT_DETAIL':
      return {
        ...state, 
        resultDetailIsOpen: !state.resultDetailIsOpen,
      };
    default:
      return state;
  }
};