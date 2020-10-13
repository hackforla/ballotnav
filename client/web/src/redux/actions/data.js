import jurisdictionData from '../../dummy-data/jurisdictionData.json';
import stateData from '../../dummy-data/stateData.json';

export function loadData() {
  return dispatch => dispatch({ 
    type: 'ADD_DATA',
    jurisdictionData: jurisdictionData,
    stateData: stateData,
  });
};