export default (state = [], action) => {
  switch(action.type) {
    case 'ADD_DATA':
      return {
        ...state, 
        jurisdictionData: action.jurisdictionData, 
        stateData: action.stateData,
      };
    default:
      return state;
  }
};