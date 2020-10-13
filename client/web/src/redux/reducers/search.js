import dummyData from './dummyData.json'

export default (state = [dummyData], action) => {
  switch (action.type) {
    case 'ADD_SEARCH':
      return [...state, action.search];
    default:
      return state;
  }
};